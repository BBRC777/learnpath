// app/page.tsx
import Link from 'next/link'
import DemoBox from '@/components/DemoBox'
import AutoPlayVideo from '@/components/AutoPlayVideo'

const FEATURES = [
  {
    icon: '◆',
    title: 'for any subject or exam',
    desc: 'Tell us what you want to learn. Claude builds you a complete multi-week curriculum with structured lessons, key concepts, and exercises — in seconds.',
  },
  {
    icon: '⧉',
    title: 'Spaced Repetition Flashcards',
    desc: 'Every lesson generates flashcards automatically. Our SM-2 algorithm schedules reviews at the perfect moment so you never forget what you learn.',
  },
  {
    icon: '▶',
    title: 'AI Tutor Built In',
    desc: 'Stuck on a concept? Ask your AI tutor anything mid-lesson. Get an ELI5 explanation, go deeper, or have the lesson simplified — all without leaving the page.',
  },
  {
    icon: '◉',
    title: 'Adaptive Difficulty',
    desc: 'Score below 60% on a quiz and get a simpler follow-up. Ace it and unlock an advanced challenge. The curriculum adapts to how you actually perform.',
  },
  {
    icon: '🔥',
    title: 'Streaks & XP',
    desc: 'Daily streaks, XP rewards, level-ups, and 10 badge types keep you coming back. Learning is more fun when progress feels real.',
  },
  {
    icon: '🔗',
    title: 'Share Your Path',
    desc: 'Finished building a great curriculum? Share it with a public link. Anyone can browse your full lesson outline and start learning with one click.',
  },
]

const STEPS = [
  { n: '01', title: 'Pick a topic', desc: 'Type anything — a language, a skill, a subject, a career goal. Learnpath handles the rest.' },
  { n: '02', title: 'Get your curriculum', desc: 'In seconds, Claude generates a structured multi-week learning path tailored to your level and schedule.' },
  { n: '03', title: 'Learn every day', desc: 'Work through lessons, review flashcards, quiz yourself, and chat with your AI tutor — all in one place.' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #2a2d38', background: 'rgba(10,11,15,0.85)', backdropFilter: 'blur(12px)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#d4853a', letterSpacing: '-0.01em' }}>◆ Learnpath</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/pricing" style={{ padding: '7px 14px', borderRadius: 7, color: 'var(--text2)', fontSize: 13, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Pricing</Link>
          <Link href="/business" style={{ padding: '7px 14px', borderRadius: 7, color: 'var(--text2)', fontSize: 13, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>For teams</Link>
          <Link href="/auth" style={{ padding: '7px 14px', borderRadius: 7, color: 'var(--text2)', fontSize: 13, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Sign in</Link>
          <Link href="/auth" style={{ padding: '8px 16px', borderRadius: 7, background: '#d4853a', color: '#0a0b0f', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Get started free</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* HERO */}
        <div style={{ textAlign: 'center', padding: '100px 0 80px' }}>
          <div style={{ display: 'inline-block', fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#d4853a', textTransform: 'uppercase', letterSpacing: '0.14em', padding: '4px 14px', borderRadius: 20, border: '1px solid rgba(212,133,58,0.3)', background: 'rgba(212,133,58,0.08)', marginBottom: 28 }}>
            Powered by Claude AI
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.1, color: 'var(--text)', marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
            Your AI study partner<br/>
            <span style={{ color: '#d4853a', fontStyle: 'italic' }}>AI-generated curriculums</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>
            Paste your syllabus, type a topic, or name an exam. Learnpath builds a complete study plan with lessons, flashcards, and a personal AI tutor — in seconds.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth" style={{ padding: '14px 28px', borderRadius: 10, background: '#d4853a', color: '#0a0b0f', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
              Start learning free →
            </Link>
            <Link href="/pricing" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid #2a2d38', color: 'var(--text2)', fontSize: 15, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
              See pricing
            </Link>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 16, fontFamily: "'JetBrains Mono', monospace" }}>Free forever · No credit card required</p>
        </div>

        {/* DEMO VIDEO */}
        <div style={{ marginBottom: 72, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#d4853a', textTransform: 'uppercase' as const, letterSpacing: '0.14em' }}>See it in action</div>
          <AutoPlayVideo
            src="https://htl5p4dmq1ptkoi4.public.blob.vercel-storage.com/Demo%20Video%2060sec.mp4"
            style={{ width: '100%', maxWidth: 320, borderRadius: 20, border: '1px solid #2a2d38', boxShadow: '0 12px 48px rgba(0,0,0,0.5)', display: 'block' }}
          />
        </div>

        {/* APP PREVIEW */}
        {/* LIVE DEMO */}
        <div style={{ marginBottom: 100 }}>
          <DemoBox />
        </div>

        {/* HOW IT WORKS */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#d4853a', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>How it works</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: 'var(--text)', marginBottom: 56 }}>From idea to lesson in seconds</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {STEPS.map(step => (
              <div key={step.n} style={{ textAlign: 'left', padding: '28px 24px', background: 'var(--bg2)', border: '1px solid #2a2d38', borderRadius: 14 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, color: 'rgba(212,133,58,0.3)', fontWeight: 500, marginBottom: 16 }}>{step.n}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#d4853a', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>Everything you need</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: 'var(--text)' }}>Built for serious learners</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ padding: '24px', background: 'var(--bg2)', border: '1px solid #2a2d38', borderRadius: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>


        {/* PRICING TEASER */}
        <div style={{ textAlign: 'center', marginBottom: 100, padding: '60px 40px', background: 'linear-gradient(135deg, rgba(212,133,58,0.08), rgba(212,133,58,0.03))', border: '1px solid rgba(212,133,58,0.2)', borderRadius: 20 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: 'var(--text)', marginBottom: 12 }}>Start free today</div>
          <div style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 8 }}>2 learning paths free forever. Upgrade for unlimited.</div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 36, fontFamily: "'JetBrains Mono', monospace" }}>$6.67/mo billed annually (save 33%) · or $9.99/mo</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth" style={{ padding: '14px 28px', borderRadius: 10, background: '#d4853a', color: '#0a0b0f', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
              Get started free →
            </Link>
            <Link href="/pricing" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid #2a2d38', color: 'var(--text2)', fontSize: 15, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
              Compare plans
            </Link>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #2a2d38', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#d4853a', marginBottom: 8 }}>◆ Learnpath</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>Learn Anything · All Inside · Built by MRF Studios</div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          <Link href="/pricing" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/business" style={{ padding: '7px 14px', borderRadius: 7, color: 'var(--text2)', fontSize: 13, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>For teams →</Link>
          <Link href="/auth" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/auth" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>

    </div>
  )
}