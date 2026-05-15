// app/page.tsx
// Root — middleware handles redirecting to /app or /auth
// This page is a fallback only
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function RootPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  redirect(user ? '/app' : '/auth')
}
