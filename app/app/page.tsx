// app/app/page.tsx
import { createClient } from '@/lib/supabase/server'
import HomeScreen from '@/components/screens/HomeScreen'

export const metadata = { title: 'Home — Learnpath' }

export default async function AppHomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return <HomeScreen profile={profile} />
}
