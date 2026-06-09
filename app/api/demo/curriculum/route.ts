import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@supabase/supabase-js"
import { normalizeTopic } from "@/lib/normalize-topic"
import { logTopicDemand } from "@/lib/topic-popularity"

export const maxDuration = 30

const MODEL = "claude-sonnet-4-6"
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// Service-role client — server-only, bypasses RLS. Same pattern as the RevenueCat webhook.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

// The demo always builds the same short sample plan, so cached trees stay uniform and reusable.
const DEMO_WEEKS = 2
const DEMO_DAYS = 5
const DEMO_TIME = "20 min"
const DEMO_LEVEL = "Beginner"
const MAX_INPUT_CHARS = 200
const DAILY_IP_LIMIT = 20

const encoder = new TextEncoder()
const sse = (obj: unknown) => encoder.encode(`data: ${JSON.stringify(obj)}\n\n`)
const DONE = encoder.encode("data: [DONE]\n\n")

// Topic normalization lives in lib/normalize-topic.ts so the suggestions endpoint
// computes the exact same cache key (otherwise "instant" suggestions could miss).

function getIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

function buildPrompt(topic: string): string {
  return `Create a personalised learning curriculum as a single valid JSON object. No markdown. No explanation.

Topic: "${topic}"
Level: ${DEMO_LEVEL}
Duration: ${DEMO_WEEKS} weeks
Days per week: ${DEMO_DAYS}
Session length: ${DEMO_TIME}
Learning style: mixed

Return ONLY valid JSON:
{
  "title": "Engaging curriculum title",
  "subtitle": "One-line subtitle",
  "overview": "2-3 sentence overview.",
  "totalWeeks": ${DEMO_WEEKS},
  "daysPerWeek": ${DEMO_DAYS},
  "sessionTime": "${DEMO_TIME}",
  "level": "${DEMO_LEVEL}",
  "weeks": [{ "week": 1, "theme": "Week theme title", "milestone": "By end of this week you can...", "days": [{ "day": 1, "title": "Day activity title", "description": "One sentence.", "type": "lesson", "duration": "${DEMO_TIME}" }], "quizCount": 3 }]
}

Rules: Exactly ${DEMO_WEEKS} weeks, exactly ${DEMO_DAYS} days each. Vary types: lesson, flashcards, exercise, review, practice.`
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as any))
    const raw = typeof body?.topic === "string" ? body.topic : ""

    if (!raw.trim()) return Response.json({ error: "Tell me what you'd like to learn." }, { status: 400 })
    if (raw.length > MAX_INPUT_CHARS) return Response.json({ error: "That's a bit long — try just a few words." }, { status: 400 })

    const topicKey = normalizeTopic(raw)
    if (!topicKey) return Response.json({ error: "Tell me what you'd like to learn." }, { status: 400 })

    // Record demand (fire-and-forget) so cache-aware suggestions can rank by real
    // popularity. Bounded by the per-IP daily limit below; never blocks the response.
    logTopicDemand(topicKey)

    // 1) Cache hit -> serve instantly, no Claude call, no rate-limit consumption.
    //    Cache failures are non-fatal: fall through to generation.
    try {
      const { data: cached } = await (supabase.from("demo_cache") as any)
        .select("curriculum").eq("topic_key", topicKey).maybeSingle()
      if (cached?.curriculum) {
        const hit = new ReadableStream({
          start(controller) {
            controller.enqueue(sse({ text: JSON.stringify({ ...cached.curriculum, topicKey }) }))
            controller.enqueue(DONE)
            controller.close()
          },
        })
        return new Response(hit, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" } })
      }
    } catch (e) {
      console.error("demo_cache read failed (continuing):", e)
    }

    // 2) Rate limit by IP, per UTC day.
    const ip = getIp(request)
    const today = new Date().toISOString().slice(0, 10)
    const { data: usage } = await (supabase.from("demo_usage") as any)
      .select("count").eq("ip", ip).eq("day", today).maybeSingle()
    const used = usage?.count ?? 0
    if (used >= DAILY_IP_LIMIT) {
      return Response.json({ error: "You've hit today's demo limit. Sign up free to keep generating." }, { status: 429 })
    }
    await (supabase.from("demo_usage") as any).upsert({ ip, day: today, count: used + 1 }, { onConflict: "ip,day" })

    // 3) Generate, stream to the client, then cache the parsed tree for next time.
    const prompt = buildPrompt(topicKey)
    const stream = new ReadableStream({
      async start(controller) {
        let full = ""
        try {
          const s = client.messages.stream({ model: MODEL, max_tokens: 3000, messages: [{ role: "user", content: prompt }] })
          for await (const event of s) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              full += event.delta.text
              controller.enqueue(sse({ text: event.delta.text }))
            }
          }
          // Persist before signalling done so the write completes within the request.
          const match = full.match(/\{[\s\S]*\}/)
          if (match) {
            try {
              const parsed = JSON.parse(match[0])
              parsed.topicKey = topicKey
              await (supabase.from("demo_cache") as any).upsert({ topic_key: topicKey, curriculum: parsed }, { onConflict: "topic_key" })
            } catch { /* don't cache malformed output */ }
          }
          controller.enqueue(DONE)
        } catch (e) {
          controller.enqueue(sse({ error: String(e) }))
        } finally {
          controller.close()
        }
      },
    })
    return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" } })
  } catch (error: unknown) {
    const err = error as Error
    console.error("Demo curriculum error:", err.message)
    return Response.json({ error: err.message || "Demo generation error" }, { status: 500 })
  }
}