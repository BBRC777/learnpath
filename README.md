# Learnpath — Next.js / Vercel

AI-powered personalised learning OS. Built by MRF Studios.

## Stack
- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: CSS variables (no Tailwind — matches existing design system)
- **AI**: Anthropic Claude API via `/api/claude` server route
- **Auth + DB**: Supabase (email/password + Google OAuth)
- **Payments**: RevenueCat
- **Hosting**: Vercel (60s function timeout vs Netlify's 10s)

## Project structure

```
learnpath/
├── app/
│   ├── layout.tsx              # Root layout + Google Fonts
│   ├── globals.css             # Design tokens (CSS variables)
│   ├── page.tsx                # Redirects → /app or /auth
│   ├── auth/
│   │   ├── page.tsx            # Sign in / sign up
│   │   └── callback/route.ts  # OAuth + email confirmation handler
│   ├── app/
│   │   ├── layout.tsx          # Protected layout (loads profile server-side)
│   │   └── page.tsx            # Home dashboard
│   └── api/
│       ├── claude/route.ts     # Claude API — streaming + non-streaming
│       └── revenuecat/
│           └── webhook/route.ts # Pro subscription events
├── components/
│   ├── auth/AuthClient.tsx     # Full auth + onboarding flow
│   ├── layout/AppShell.tsx    # Sidebar + topbar (client component)
│   └── screens/HomeScreen.tsx  # Home dashboard
├── hooks/
│   ├── useClaudeStream.ts     # Streams from /api/claude
│   └── useProfile.ts          # Profile read/update + streak logic
├── lib/
│   ├── supabase/client.ts     # Browser Supabase client
│   └── supabase/server.ts     # Server Supabase client
├── types/
│   └── database.ts            # TypeScript types matching Supabase schema
├── middleware.ts               # Session refresh + route protection
├── next.config.js
├── vercel.json                 # 60s timeout for /api/claude
└── .env.local                  # Secrets (never commit)
```

## Setup

### 1. Clone and install
```bash
git clone https://github.com/BBRC777/learnpath.git
cd learnpath
npm install
```

### 2. Environment variables
Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required:
- `NEXT_PUBLIC_SUPABASE_URL` — already filled (your project)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — already filled
- `ANTHROPIC_API_KEY` — get from console.anthropic.com
- `REVENUECAT_API_KEY` — server secret from RevenueCat dashboard

### 3. Run locally
```bash
npm run dev
# → http://localhost:3000
```

### 4. Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or connect your GitHub repo in Vercel dashboard.

**Add environment variables in Vercel:**
1. Go to Project → Settings → Environment Variables
2. Add all vars from `.env.local` (except the NEXT_PUBLIC_ ones are fine to show)
3. `ANTHROPIC_API_KEY` must be Server-only

### 5. Update Supabase redirect URLs
Already done — `https://*.vercel.app/**` covers all preview deploys.

## Supabase

Project: `luvccsyqmxctvfubuhkk`

### Profiles table (already exists)
```sql
-- Matches types/database.ts exactly
id              uuid     NOT NULL  -- matches auth.users.id
email           text
display_name    text
avatar_url      text
is_pro          boolean
rc_customer_id  text
streak          integer
last_study      date
total_days      integer
cards_reviewed  integer
theme           text
voice_settings  jsonb    -- { daily_goal_minutes, goals[] }
created_at      timestamptz
updated_at      timestamptz
```

### Row Level Security (add this)
```sql
-- Enable RLS on profiles
alter table profiles enable row level security;

-- Users can only read/write their own profile
create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);
```

## RevenueCat

1. Set **App User ID** to Supabase `user.id` on login (do this in the mobile app)
2. Add webhook URL in RevenueCat → Project → Integrations → Webhooks:
   ```
   https://learnpathnow.com/api/revenuecat/webhook
   ```
3. Webhook secret = your `REVENUECAT_API_KEY` value

Entitlement `pro` → sets `profiles.is_pro = true` via webhook.

## Key patterns

### Streaming Claude from a client component
```tsx
import { useClaudeStream } from '@/hooks/useClaudeStream'

const { stream, streaming, streamText } = useClaudeStream()

await stream({
  type: 'curriculum',
  messages: [{ role: 'user', content: prompt }],
  onDone: (json) => {
    const curriculum = JSON.parse(json.match(/\{[\s\S]*\}/)?.[0] || '{}')
    setCurriculum(curriculum)
  },
})
```

### Protecting a page server-side
```tsx
// Any file in app/app/ — middleware already guards the route
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function MyPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')
  // ...
}
```

### Checking pro status (server)
```tsx
const { data: profile } = await supabase
  .from('profiles')
  .select('is_pro')
  .eq('id', user.id)
  .single()

if (!profile?.is_pro) redirect('/app?upgrade=true')
```

## Business

- Studio: MRF Studios
- Contact: contact@mrfstudios.com
- App: learnpathnow.com
- GitHub: github.com/BBRC777/learnpath
