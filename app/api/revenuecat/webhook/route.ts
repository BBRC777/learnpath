import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

const PRO_EVENTS = ["INITIAL_PURCHASE", "RENEWAL", "PRODUCT_CHANGE", "UNCANCELLATION"]
const REVOKE_EVENTS = ["EXPIRATION", "CANCELLATION", "BILLING_ISSUE"]

export async function POST(request: Request) {
  try {
    const headersList = headers()
    const authHeader = headersList.get("authorization")
    const expectedSecret = process.env.REVENUECAT_API_KEY
    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { event } = body
    if (!event) return Response.json({ error: "No event" }, { status: 400 })

    const { type, app_user_id, entitlement_ids } = event
    const isPro = entitlement_ids?.includes("pro")
    if (!app_user_id) return Response.json({ error: "No app_user_id" }, { status: 400 })

    const supabase = createClient()
    const db = supabase.from("profiles") as any

    if (PRO_EVENTS.includes(type) && isPro) {
      await db.update({ is_pro: true, rc_customer_id: app_user_id, updated_at: new Date().toISOString() }).eq("id", app_user_id)
    }

    if (REVOKE_EVENTS.includes(type)) {
      await db.update({ is_pro: false, updated_at: new Date().toISOString() }).eq("id", app_user_id)
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error("RevenueCat webhook error:", error)
    return Response.json({ error: "Webhook error" }, { status: 500 })
  }
}

