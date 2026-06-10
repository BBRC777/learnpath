import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@/lib/supabase/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const MODEL = "claude-sonnet-4-6"
const CHEAP_MODEL = "claude-haiku-4-5"
function pickModel(body: any): string {
  if (body?.model) return body.model
  if (body?.tier === 'cheap') return CHEAP_MODEL
  return MODEL
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { stream, ...params } = body

    // Server-side safety net: enforce free-tier path limit for curriculum generation.
    // The client already blocks at FREE_MAX_PATHS=2; this prevents API-level bypasses.
    if (body.type === 'curriculum') {
      const { data: profile } = await (supabase as any).from('profiles').select('is_pro').eq('id', user.id).single()
      if (!profile?.is_pro) {
        const { data: paths } = await (supabase as any).from('curricula').select('id').eq('user_id', user.id)
        if ((paths?.length ?? 0) >= 2) {
          return Response.json({ error: 'free_limit_reached' }, { status: 403 })
        }
      }
    }

    if (stream) {
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          try {
            const streamResponse = client.messages.stream({
              model: pickModel(body),
              max_tokens: params.max_tokens || 8000,
              messages: params.messages,
              ...(params.system ? { system: params.system } : {}),
            })
            for await (const event of streamResponse) {
              if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
              }
              if (event.type === "message_stop") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"))
              }
            }
          } catch(e) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(e) })}\n\n`))
          } finally {
            controller.close()
          }
        },
      })
      return new Response(readable, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" },
      })
    }

    const response = await client.messages.create({
      model: pickModel(body),
      max_tokens: params.max_tokens || 2000,
      messages: params.messages,
      ...(params.system ? { system: params.system } : {}),
    })
    return Response.json(response)

  } catch (error: unknown) {
    const err = error as Error & { status?: number }
    console.error("Claude API error:", err.message)
    return Response.json({ error: err.message || "Claude API error" }, { status: err.status || 500 })
  }
}