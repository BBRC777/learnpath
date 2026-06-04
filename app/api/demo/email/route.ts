import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

export async function POST(request: Request) {
  try {
    const { email, topic } = await request.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('leads')
      .insert({ email: email.trim().toLowerCase(), topic: topic || null, source: 'demo' })

    if (error && error.code !== '23505') throw error

    return Response.json({ ok: true })
  } catch (e: any) {
    console.error('Email capture error:', e)
    return Response.json({ error: 'Could not save — try again.' }, { status: 500 })
  }
}