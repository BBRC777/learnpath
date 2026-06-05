import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no confusable chars (0/O, 1/I)
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const service = serviceClient()

    // Return existing code if one exists
    const { data: existing } = await (service.from('referral_codes') as any)
      .select('code')
      .eq('user_id', user.id)
      .single()

    if (existing?.code) {
      return Response.json({ code: existing.code })
    }

    // Generate a unique code
    let code = ''
    let attempts = 0
    while (attempts < 10) {
      const candidate = generateCode()
      const { data: collision } = await (service.from('referral_codes') as any)
        .select('id')
        .eq('code', candidate)
        .single()
      if (!collision) { code = candidate; break }
      attempts++
    }

    if (!code) return Response.json({ error: 'Could not generate code' }, { status: 500 })

    await (service.from('referral_codes') as any)
      .insert({ user_id: user.id, code })

    return Response.json({ code })
  } catch (error) {
    console.error('Referral code error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}