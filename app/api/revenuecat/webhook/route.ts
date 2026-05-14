// app/api/revenuecat/webhook/route.ts
// RevenueCat sends events here when subscriptions change
// Set this URL in RevenueCat Dashboard → Project → Integrations → Webhooks
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

// RevenueCat webhook events we care about
const PRO_EVENTS = ['INITIAL_PURCHASE', 'RENEWAL', 'PRODUCT_CHANGE', 'UNCANCELLATION']
const REVOKE_EVENTS = ['EXPIRATION', 'CANCELLATION', 'BILLING_ISSUE']

export async function POST(request: Request) {
  try {
    const headersList = headers()
    const authHeader = headersList.get('authorization')

    // Verify webhook secret
    const expectedSecret = process.env.REVENUECAT_API_KEY
    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { event } = body

    if (!event) {
      return Response.json({ error: 'No event' }, { status: 400 })
    }

    const { type, app_user_id, entitlement_ids } = event
    const isPro = entitlement_ids?.includes('pro')

    // app_user_id = Supabase user.id (set this in RevenueCat on login)
    if (!app_user_id) {
      return Response.json({ error: 'No app_user_id' }, { status: 400 })
    }

    const supabase = createClient()

    if (PRO_EVENTS.includes(type) && isPro) {
      // Grant pro
      await supabase
        .from('profiles')
        .update({
          is_pro: true,
          rc_customer_id: app_user_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', app_user_id)
      console.log(`✓ Pro granted: ${app_user_id}`)
    }

    if (REVOKE_EVENTS.includes(type)) {
      // Revoke pro
      await supabase
        .from('profiles')
        .update({
          is_pro: false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', app_user_id)
      console.log(`✓ Pro revoked: ${app_user_id}`)
    }

    return Response.json({ received: true })

  } catch (error) {
    console.error('RevenueCat webhook error:', error)
    return Response.json({ error: 'Webhook error' }, { status: 500 })
  }
}
