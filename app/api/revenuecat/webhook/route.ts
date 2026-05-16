import { createClient } from '@/lib/supabase/server'

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

    const supabase = createClient()

    if (PRO_EVENTS.includes(type)) {
      await (supabase.from('profiles') as any)
        .update({ is_pro: true, rc_customer_id: app_user_id, updated_at: new Date().toISOString() })
        .eq('id', app_user_id)
      console.log('Pro granted:', app_user_id)
    }

    if (REVOKE_EVENTS.includes(type)) {
      await (supabase.from('profiles') as any)
        .update({ is_pro: false, updated_at: new Date().toISOString() })
        .eq('id', app_user_id)
      console.log('Pro revoked:', app_user_id)
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return Response.json({ error: 'Webhook error' }, { status: 500 })
  }
}
