// app/business/page.tsx
// /business — team & L&D marketing page. Server component, statically rendered.
// Business-blue accent (#4a7fd4). Shipped team features only. Soft contact CTA
// (mailto), consistent with the Business card on /pricing.

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Learnpath for Teams — Train your team on anything',
  description:
    'Turn any material into an assignable learning path with due dates and a completion dashboard — onboarding and training your team will actually finish.',
  openGraph: {
    title: 'Learnpath for Teams',
    description:
      'Assign structured learning paths, set due dates, and track completion on one dashboard.',
    images: ['/learnpath_og_image.png'],
    type: 'website',
  },
}

// ─── design tokens (blue accent; surfaces match globals.css) ─────────────────
const A     = '#4a7fd4'                       // business blue
const A_BG  = 'rgba(74,127,212,0.1)'
const A_BG2 = 'rgba(74,127,212,0.12)'
const A_BDR = 'rgba(74,127,212,0.3)'
const BG2   = 'var(--bg2, #111318)'
const BG3   = 'var(--bg3, #1a1c24)'
const TEXT  = 'var(--text, #e8e6df)'
const TEXT2 = 'var(--text2, #9a9790)'
const TEXT3 = 'var(--text3, #5a5856)'
const BDR   = 'var(--border, #2a2d38)'
const SERIF = "'Playfair Display', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"
const MONO  = "'JetBrains Mono', monospace"

const MAILTO = 'mailto:contact@mrfstudios.com?subject=Learnpath%20Business'

const STEPS = [
  { n: '01', title: 'Build a path', desc: "Type a topic or upload your own material — an onboarding doc, a policy, a training video. Claude turns it into a structured, multi-step path in seconds." },
  { n: '02', title: 'Assign it', desc: "Send it to your team and set a due date. Everyone gets the same lessons, flashcards, and quizzes — and a tutor for when they're stuck." },
  { n: '03', title: 'Track completion', desc: "Watch progress on the member dashboard: who's finished, who's behind, and where people are getting stuck — without chasing anyone over email." },
]

const FEATURES = [
  { title: 'Build from your own material', desc: 'Create team curricula from scratch, a PDF, or a YouTube video — so training matches the tools and policies you actually use.' },
  { title: 'Assign with due dates', desc: 'Push a path to specific members with a deadline, so onboarding and required training have a clear finish line.' },
  { title: 'One progress dashboard', desc: 'See every member in one place — completed, in progress, or behind — and step in where it’s needed.' },
  { title: 'A shared team library', desc: 'Keep your team’s paths in one library. Import a personal path you’ve already built and make it available to everyone.' },
  { title: 'Completion certificates', desc: 'Each member can download a certificate when they finish a path — a simple record that the training got done.' },
  { title: 'The full learning loop', desc: 'Your team gets the same streaming AI lessons, spaced-repetition flashcards, and built-in tutor that power Learnpath for individuals.' },
]

export default function BusinessPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #0a0b0f)', color: TEXT, fontFamily: SANS, overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: `1px solid ${BDR}`, background: 'rgba(10,11,15,0.88)', backdropFilter: 'blur(12px)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <Link href='/' style={{ fontFamily: SERIF, fontSize: 20, color: A, textDecoration: 'none', letterSpacing: '-0.01em' }}>◆ Learnpath</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href='/' style={{ padding: '7px 14px', borderRadius: 7, color: TEXT2, fontSize: 13, textDecoration: 'none', fontFamily: SANS }}>For students</Link>
          <Link href='/pricing' style={{ padding: '7px 14px', borderRadius: 7, color: TEXT2, fontSize: 13, textDecoration: 'none', fontFamily: SANS }}>Pricing</Link>
          <Link href='/auth' style={{ padding: '7px 14px', borderRadius: 7, color: TEXT2, fontSize: 13, textDecoration: 'none', fontFamily: SANS }}>Sign in</Link>
          <a href={MAILTO} style={{ padding: '8px 16px', borderRadius: 7, background: A, color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', fontFamily: SANS }}>Contact us</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '84px 24px 44px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 10, fontFamily: MONO, color: A, background: A_BG, border: `1px solid ${A_BDR}`, borderRadius: 4, padding: '3px 10px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>For teams &amp; L&amp;D</div>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5.5vw,50px)', color: TEXT, lineHeight: 1.18, marginBottom: 18, fontWeight: 400 }}>Training your team will actually finish</h1>
        <p style={{ fontSize: 16.5, color: TEXT2, lineHeight: 1.65, maxWidth: 600, margin: '0 auto 36px' }}>
          Turn any material — an onboarding doc, a policy, a new tool — into a structured learning path. Assign it with a due date, and see completion on one dashboard. Built on the same AI lessons, flashcards, and tutor your team will actually use.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={MAILTO} style={{ padding: '14px 28px', borderRadius: 10, background: A, color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: SANS }}>Contact us to get started</a>
          <Link href='/pricing' style={{ padding: '14px 28px', borderRadius: 10, border: `1px solid ${BDR}`, color: TEXT2, fontSize: 15, textDecoration: 'none', fontFamily: SANS }}>See team pricing</Link>
        </div>
        <p style={{ fontSize: 12, color: TEXT3, marginTop: 16, fontFamily: MONO }}>From $99/month for your whole team</p>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 88px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontFamily: MONO, color: A, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>How it works</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 30, color: TEXT, fontWeight: 400 }}>Roll out training in an afternoon</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {STEPS.map(step => (
            <div key={step.n} style={{ textAlign: 'left', padding: '28px 24px', background: BG2, border: `1px solid ${BDR}`, borderRadius: 14 }}>
              <div style={{ fontFamily: MONO, fontSize: 28, color: A_BDR, fontWeight: 500, marginBottom: 16 }}>{step.n}</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: 13.5, color: TEXT2, lineHeight: 1.65 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 88px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontFamily: MONO, color: A, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>What teams get</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 30, color: TEXT, fontWeight: 400 }}>Everything you need to assign and track</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ padding: '24px', background: BG2, border: `1px solid ${BDR}`, borderRadius: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: A_BG2, border: `1px solid ${A_BDR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: A, marginBottom: 12 }}>◆</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13.5, color: TEXT2, lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING TEASER */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ textAlign: 'center', padding: '56px 40px', background: 'linear-gradient(135deg, rgba(74,127,212,0.1), rgba(74,127,212,0.03))', border: `1px solid ${A_BDR}`, borderRadius: 20 }}>
          <div style={{ fontFamily: SERIF, fontSize: 32, color: TEXT, marginBottom: 12 }}>Simple team pricing</div>
          <div style={{ fontSize: 15, color: TEXT2, marginBottom: 6, maxWidth: 520, margin: '0 auto 6px' }}>$99/month for your whole team — unlimited members, no per-seat fees up to 10.</div>
          <div style={{ fontSize: 13, color: TEXT3, marginBottom: 32, fontFamily: MONO }}>Building something bigger? Contact us about per-seat pricing.</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={MAILTO} style={{ padding: '14px 28px', borderRadius: 10, background: A, color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: SANS }}>Contact us to get started</a>
            <Link href='/pricing' style={{ padding: '14px 28px', borderRadius: 10, border: `1px solid ${BDR}`, color: TEXT2, fontSize: 15, textDecoration: 'none', fontFamily: SANS }}>See full pricing →</Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${BDR}`, padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: SERIF, fontSize: 18, color: A, marginBottom: 8 }}>◆ Learnpath</div>
        <div style={{ fontSize: 12, color: TEXT3, marginBottom: 16 }}>Learn Anything · All Inside · Built by MRF Studios</div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href='/' style={{ fontSize: 12, color: TEXT3, textDecoration: 'none' }}>For students</Link>
          <Link href='/pricing' style={{ fontSize: 12, color: TEXT3, textDecoration: 'none' }}>Pricing</Link>
          <Link href='/auth' style={{ fontSize: 12, color: TEXT3, textDecoration: 'none' }}>Sign in</Link>
          <Link href='/auth' style={{ fontSize: 12, color: TEXT3, textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>

    </div>
  )
}