// app/auth/page.tsx
// Public route — middleware redirects logged-in users to /app
import AuthClient from '@/components/auth/AuthClient'

export const metadata = {
  title: 'Sign In — Learnpath',
}

export default function AuthPage() {
  return <AuthClient />
}
