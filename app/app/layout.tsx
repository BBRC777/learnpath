import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AppShell from "@/components/layout/AppShell"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) redirect("/auth")

  const { data: profile } = await (supabase.from("profiles") as any)
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile || !profile.display_name) {
    redirect("/auth?onboarding=true")
  }

  return (
    <AppShell user={user} profile={profile}>
      {children}
    </AppShell>
  )
}
