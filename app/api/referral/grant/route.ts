import { createClient } from '@supabase/supabase-js'

const TRIAL_DAYS = 7

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export async function POST(request: Request) {
  try {
    const { code, referred_id } = await request.json()
    if (!code || !referred_id) {
      return Response.json({ error: 'Missing code or referred_id' }, { status: 400 })
    }

    const supabase = serviceClient()

    // 1. Look up the referral code
    const { data: refCode, error: codeErr } = await (supabase.from('referral_codes') as any)
      .select('user_id')
      .eq('code', code.toUpperCase())
      .single()

    if (codeErr || !refCode) {
      return Response.json({ error: 'Invalid referral code' }, { status: 404 })
    }

    const referrer_id = refCode.user_id

    // 2. Prevent self-referral
    if (referrer_id === referred_id) {
      return Response.json({ error: 'Cannot refer yourself' }, { status: 400 })
    }

    // 3. Check this new user hasn't already used a referral code
    const { data: existing } = await (supabase.from('referrals') as any)
      .select('id')
      .eq('referred_id', referred_id)
      .single()

    if (existing) {
      return Response.json({ error: 'Referral already used' }, { status: 400 })
    }

    const trialUntil = new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000).toISOString()

    // 4. Grant trial to the new user (referred)
    await (supabase.from('profiles') as any)
      .update({ pro_trial_until: trialUntil, updated_at: new Date().toISOString() })
      .eq('id', referred_id)

    // 5. Grant trial to the referrer — extend existing trial if they already have one
    const { data: referrerProfile } = await (supabase.from('profiles') as any)
      .select('pro_trial_until, is_pro')
      .eq('id', referrer_id)
      .single()

    // Only grant trial if referrer isn't already paid Pro
    if (!referrerProfile?.is_pro) {
      const existing_trial = referrerProfile?.pro_trial_until
        ? new Date(referrerProfile.pro_trial_until)
        : new Date()
      const base = existing_trial > new Date() ? existing_trial : new Date()
      const referrerTrialUntil = new Date(base.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000).toISOString()
      await (supabase.from('profiles') as any)
        .update({ pro_trial_until: referrerTrialUntil, updated_at: new Date().toISOString() })
        .eq('id', referrer_id)
    }

    // 6. Record the referral
    await (supabase.from('referrals') as any)
      .insert({ code: code.toUpperCase(), referrer_id, referred_id, reward_granted: true })

    return Response.json({ success: true, trial_until: trialUntil })
  } catch (error) {
    console.error('Referral grant error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}