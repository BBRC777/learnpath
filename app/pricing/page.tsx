// app/pricing/page.tsx
import Link from 'next/link'

const FREE_FEATURES = [
  "2 learning paths",
  "Up to 4 weeks per path",
  "AI-generated lessons",
  "Flashcards with spaced repetition",
  "Basic quiz & exercises",
  "XP, streaks & badges",
  "Leaderboard",
  "Share a curriculum publicly"
]

const PRO_FEATURES = [
  "Unlimited learning paths",
  "Unlimited path length",
  "Everything in Free",
  "AI Tutor (unlimited questions)",
  "Study Mode",
  "ELI5 & Go Deeper explanations",
  "Adaptive difficulty",
  "AI mnemonics per vocab word",
  "PDF → Curriculum",
  "YouTube → Curriculum",
  "Priority support"
]

const BUSINESS_FEATURES = [
  "Everything in Pro",
  "Unlimited team members",
  "Team curriculum library",
  "Assign paths with due dates",
  "Member progress dashboard",
  "End-of-training assessments",
  "Pass/fail thresholds per course",
  "Completion certificates (PDF)",
  "Import personal paths to team",
  "Business theme",
  "Priority support"
]

const COMPARISON = [
  {
    "feature": "Learning paths",
    "free": "2",
    "pro": "Unlimited",
    "biz": "Unlimited"
  },
  {
    "feature": "Path length",
    "free": "4 weeks max",
    "pro": "Unlimited",
    "biz": "Unlimited"
  },
  {
    "feature": "AI-generated lessons",
    "free": "✓",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "Flashcards + spaced rep.",
    "free": "✓",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "Quizzes & exercises",
    "free": "✓",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "XP, streaks & badges",
    "free": "✓",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "Leaderboard",
    "free": "✓",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "Share curriculum",
    "free": "✓",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "AI Tutor",
    "free": "—",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "Study Mode",
    "free": "—",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "ELI5 & Go Deeper",
    "free": "—",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "Adaptive difficulty",
    "free": "—",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "AI mnemonics",
    "free": "—",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "PDF → Curriculum",
    "free": "—",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "YouTube → Curriculum",
    "free": "—",
    "pro": "✓",
    "biz": "✓"
  },
  {
    "feature": "Team dashboard",
    "free": "—",
    "pro": "—",
    "biz": "✓"
  },
  {
    "feature": "Assign paths + due dates",
    "free": "—",
    "pro": "—",
    "biz": "✓"
  },
  {
    "feature": "Progress tracking",
    "free": "—",
    "pro": "—",
    "biz": "✓"
  },
  {
    "feature": "End-of-training assessment",
    "free": "—",
    "pro": "—",
    "biz": "✓"
  },
  {
    "feature": "Completion certificates",
    "free": "—",
    "pro": "—",
    "biz": "✓"
  }
]

const FAQ = [
  {
    "q": "Can I try Pro before paying?",
    "a": "Yes — every new account gets 2 free learning paths with full access to all lesson features. No credit card required to start."
  },
  {
    "q": "What counts as a learning path?",
    "a": "A learning path is a full AI-generated curriculum on a topic you choose — for example \"Japanese for beginners\" or \"Python fundamentals\". Free accounts can have 2 active paths at a time."
  },
  {
    "q": "Can I cancel anytime?",
    "a": "Yes. Cancel from your account settings at any time. You keep Pro access until the end of your billing period."
  },
  {
    "q": "What is the AI Tutor?",
    "a": "The AI Tutor is a Claude-powered chat panel built into every lesson. Ask questions about the material, request clarifications, or go deeper on any concept — mid-lesson, without losing your place."
  },
  {
    "q": "How does spaced repetition work?",
    "a": "Learnpath uses the SM-2 algorithm to schedule flashcard reviews at the optimal interval for long-term retention. Cards you find easy get pushed further out; difficult cards come back sooner."
  },
  {
    "q": "Is my data private?",
    "a": "Yes. Your curricula, progress, and flashcards are stored securely in Supabase and are only visible to you — unless you explicitly choose to share a curriculum publicly."
  },
  {
    "q": "How does Business pricing work?",
    "a": "Business is $99/month for your whole team — unlimited members, no per-seat fees up to 10 members. Building a larger team? Contact us about per-seat pricing at $15/seat/month."
  }
]

export default function PricingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #2a2d38', background: 'var(--bg)', backdropFilter: 'blur(12px)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#d4853a', letterSpacing: '-0.01em', textDecoration: 'none' }}>◆ Learnpath</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/auth" style={{ padding: '7px 14px', borderRadius: 7, color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>Sign in</Link>
            <Link href="/auth" style={{ padding: '8px 16px', borderRadius: 7, background: '#d4853a', color: '#0a0b0f', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>Get started free</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', padding: '80px 0 64px' }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#d4853a', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>Pricing</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--text)', lineHeight: 1.15, marginBottom: 16 }}>
            Simple, honest pricing
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
            Start free with 2 learning paths. Upgrade when you want more.
          </p>
        </div>

        {/* PLANS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 80 }}>

          {/* FREE */}
          <div style={{ padding: '32px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Free</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: 'var(--text)', fontWeight: 600 }}>$0</span>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>/forever</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 28, lineHeight: 1.5 }}>Everything you need to get started. No credit card required.</div>
            <Link href="/auth" style={{ display: 'block', padding: '12px', borderRadius: 9, border: '1px solid var(--border)', color: 'var(--text)', fontSize: 14, fontWeight: 500, textDecoration: 'none', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", marginBottom: 28 }}>
              Get started free
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FREE_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'var(--text2)' }}>
                  <span style={{ color: '#6abf8a', flexShrink: 0, fontSize: 12 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* PRO */}
          <div style={{ padding: '32px', background: 'linear-gradient(160deg, rgba(212,133,58,0.08), rgba(212,133,58,0.03))', border: '1px solid rgba(212,133,58,0.35)', borderRadius: 16, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#d4853a', color: '#0a0b0f', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, padding: '3px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
              Most popular
            </div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#d4853a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Pro</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>Monthly</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>$9.99</div>
              </div>
              <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'rgba(212,133,58,0.1)', border: '1px solid rgba(212,133,58,0.3)', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#d4853a', fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>Annual · Save 33%</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>$6.67<span style={{ fontSize: 11, color: 'var(--text2)' }}>/mo</span></div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 28, lineHeight: 1.5 }}>Unlimited paths, AI Tutor, Study Mode, and everything we build next.</div>
            <Link href="/auth" style={{ display: 'block', padding: '12px', borderRadius: 9, background: '#d4853a', color: '#0a0b0f', fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", marginBottom: 28 }}>
              Start free, upgrade anytime
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PRO_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'var(--text)' }}>
                  <span style={{ color: '#d4853a', flexShrink: 0, fontSize: 12 }}>◆</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* BUSINESS */}
          <div style={{ padding: '32px', background: 'linear-gradient(160deg, rgba(74,127,212,0.10), rgba(74,127,212,0.04))', border: '1px solid rgba(74,127,212,0.45)', borderRadius: 16, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#4a7fd4', color: '#fff', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, padding: '3px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
              For teams
            </div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#4a7fd4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Business</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: 'var(--text)', fontWeight: 600 }}>$99</span>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>/month per team</span>
            </div>
            <div style={{ fontSize: 12, color: '#4a7fd4', marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" }}>
              Unlimited members · scales with you
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 28, lineHeight: 1.5 }}>
              Deploy structured training to your whole team. Track progress, enforce deadlines, prove compliance.
            </div>
            <a href="mailto:contact@mrfstudios.com?subject=Learnpath%20Business" style={{ display: 'block', padding: '12px', borderRadius: 9, background: '#4a7fd4', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", marginBottom: 28 }}>
              Contact us to get started
            </a>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BUSINESS_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'var(--text)' }}>
                  <span style={{ color: '#4a7fd4', flexShrink: 0, fontSize: 12 }}>◆</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* COMPARISON TABLE */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'var(--text)', textAlign: 'center', marginBottom: 32 }}>Full comparison</h2>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 100px', background: 'var(--bg)', borderBottom: '1px solid #2a2d38' }}>
              <div style={{ padding: '12px 20px', fontSize: 11, color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>Feature</div>
              <div style={{ padding: '12px 12px', fontSize: 11, color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', borderLeft: '1px solid #2a2d38' }}>Free</div>
              <div style={{ padding: '12px 12px', fontSize: 11, color: '#d4853a', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', borderLeft: '1px solid #2a2d38' }}>Pro</div>
              <div style={{ padding: '12px 12px', fontSize: 11, color: '#4a7fd4', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', borderLeft: '1px solid #2a2d38' }}>Business</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 100px', borderBottom: i < COMPARISON.length - 1 ? '1px solid #2a2d38' : 'none' }}>
                <div style={{ padding: '13px 20px', fontSize: 13.5, color: 'var(--text2)' }}>{row.feature}</div>
                <div style={{ padding: '13px 12px', fontSize: 13, color: row.free === '✓' ? '#6abf8a' : row.free === '—' ? 'var(--border)' : 'var(--text2)', textAlign: 'center', borderLeft: '1px solid #2a2d38', fontFamily: "'JetBrains Mono', monospace" }}>{row.free}</div>
                <div style={{ padding: '13px 12px', fontSize: 13, color: row.pro === '✓' ? '#d4853a' : row.pro === '—' ? 'var(--border)' : 'var(--text2)', textAlign: 'center', borderLeft: '1px solid #2a2d38', fontFamily: "'JetBrains Mono', monospace" }}>{row.pro}</div>
                <div style={{ padding: '13px 12px', fontSize: 13, color: row.biz === '✓' ? '#4a7fd4' : row.biz === '—' ? 'var(--border)' : 'var(--text2)', textAlign: 'center', borderLeft: '1px solid #2a2d38', fontFamily: "'JetBrains Mono', monospace" }}>{row.biz}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 100 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'var(--text)', textAlign: 'center', marginBottom: 40 }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(item => (
              <div key={item.q} style={{ padding: '20px 24px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>{item.q}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginBottom: 100, padding: '60px 40px', background: 'linear-gradient(135deg, rgba(212,133,58,0.08), rgba(212,133,58,0.03))', border: '1px solid rgba(212,133,58,0.2)', borderRadius: 20 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: 'var(--text)', marginBottom: 12 }}>Ready to start learning?</div>
          <div style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 32 }}>Join thousands of learners building real skills with AI.</div>
          <Link href="/auth" style={{ padding: '14px 32px', borderRadius: 10, background: '#d4853a', color: '#0a0b0f', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
            Get started free →
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #2a2d38', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#d4853a', marginBottom: 8 }}>◆ Learnpath</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>Learn Anything · All Inside · Built by MRF Studios</div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          <Link href="/" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Home</Link>
          <Link href="/auth" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/auth" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Sign up</Link>
          <Link href="/privacy" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Terms of Service</Link>
        </div>
      </div>

    </div>
  )
}
