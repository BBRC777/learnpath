import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@/lib/supabase/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const MODEL = 'claude-sonnet-4-5-20251001'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { stream, ...params } = body

    if (stream) {
      const streamResponse = await client.messages.create({
        model: MODEL,
        max_tokens: params.max_tokens || 8000,
        stream: true,
        messages: params.messages,
        system: params.system,
      })
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          for await (const event of streamResponse) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
            }
            if (event.type === "message_stop") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"))
              controller.close()
            }
          }
        },
      })
      return new Response(readable, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" },
      })
    }

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: params.max_tokens || 600,
      messages: params.messages,
      system: params.system,
    })
    return Response.json(response)

  } catch (error: unknown) {
    const err = error as Error & { status?: number }
    console.error("Claude API error:", err.message)
    return Response.json({ error: err.message || "Claude API error" }, { status: err.status || 500 })
  }
}
