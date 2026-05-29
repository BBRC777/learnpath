import { createClient } from '@supabase/supabase-js'

const PRO_EVENTS = ['INITIAL_PURCHASE', 'RENEWAL', 'PRODUCT_CHANGE', 'UNCANCELLATION']
const REVOKE_EVENTS = ['EXPIRATION', 'CANCELLATION', 'BILLING_ISSUE']

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event } = body
    if (!event) return Response.json({ error: 'No event' }, { status: 400 })

    const { type, app_user_id } = event
    console.log('Webhook event:', type, 'user:', app_user_id)
    if (!app_user_id) return Response.json({ error: 'No app_user_id' }, { status: 400 })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )

    if (PRO_EVENTS.includes(type)) {
      const { error } = await (supabase.from('profiles') as any)
        .update({ is_pro: true, rc_customer_id: app_user_id, updated_at: new Date().toISOString() })
        .eq('id', app_user_id)
      if (error) {
        console.error('Pro grant failed:', error.message)
        return Response.json({ error: 'Database update failed' }, { status: 500 })
      }
      console.log('Pro granted:', app_user_id)
    }

    if (REVOKE_EVENTS.includes(type)) {
      const { error } = await (supabase.from('profiles') as any)
        .update({ is_pro: false, updated_at: new Date().toISOString() })
        .eq('id', app_user_id)
      if (error) {
        console.error('Pro revoke failed:', error.message)
        return Response.json({ error: 'Database update failed' }, { status: 500 })
      }
      console.log('Pro revoked:', app_user_id)
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return Response.json({ error: 'Webhook error' }, { status: 500 })
  }
}