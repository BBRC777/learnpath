// app/app/layout.tsx
// Protected layout — middleware guarantees user is authenticated here
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AppShell from '@/components/layout/AppShell'
import type { Profile } from '@/types/database'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) redirect('/auth')

  // Load profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // No profile or no display_name → onboarding
  if (!profile || !profile.display_name) {
    redirect('/auth?onboarding=true')
  }

  return (
    <AppShell user={user} profile={profile as Profile}>
      {children}
    </AppShell>
  )
}
