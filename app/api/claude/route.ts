import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const MODEL = 'claude-sonnet-4-5'

type ProfileRow = { voice_settings: Record<string, unknown> } | null

async function checkRateLimit(userId: string, isPro: boolean): Promise<boolean> {
  if (isPro) return true
  const supabase = createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase.from('profiles').select('voice_settings').eq('id', userId).single() as { data: ProfileRow }
  const settings = data?.voice_settings || {}
  const todayCount = (settings[`gen_${today}`] as number) || 0
  return todayCount < 3
}

async function incrementGenerationCount(userId: string) {
  const supabase = createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase.from('profiles').select('voice_settings').eq('id', userId).single() as { data: ProfileRow }
  const settings: Record<string, unknown> = data?.voice_settings || {}
  const key = `gen_${today}`
  settings[key] = ((settings[key] as number) || 0) + 1
  await supabase.from('profiles').update({ voice_settings: settings, updated_at: new Date().toISOString() }).eq('id', userId)
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase.from('profiles').select('is_pro').eq('id', user.id).single()
    const isPro = profile?.is_pro ?? false
    const body = await request.json()
    const { type, stream, ...params } = body

    if (type === 'curriculum' && !isPro) {
      const allowed = await checkRateLimit(user.id, isPro)
      if (!allowed) return Response.json({ error: 'Free plan limit reached. Upgrade to Pro.' }, { status: 429 })
    }

    if (stream) {
      const streamResponse = await client.messages.create({
        model: MODEL,
        max_tokens: type === 'curriculum' ? 6000 : 4000,
        stream: true,
        messages: params.messages,
        system: params.system,
      })
      if (type === 'curriculum') incrementGenerationCount(user.id).catch(console.error)
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          for await (const event of streamResponse) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
            }
            if (event.type === 'message_stop') {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
            }
          }
        },
      })
      return new Response(readable, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' } })
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
    console.error('Claude API error:', err.message)
    return Response.json({ error: err.message || 'Claude API error' }, { status: err.status || 500 })
  }
}
