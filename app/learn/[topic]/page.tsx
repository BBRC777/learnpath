// app/learn/[topic]/page.tsx
// Handles /learn/mcat  /learn/python  /learn/spanish-conversational
// Server component — exports generateStaticParams + generateMetadata for full SSG + SEO.

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DemoBox from '@/components/DemoBox'

import { TOPICS } from '../topics'
// ─── static generation ───────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(TOPICS).map(topic => ({ topic }))
}

// ─── per-page metadata ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const data = TOPICS[params.topic]
  if (!data) return {}
  return {
    title: data.meta.title,
    description: data.meta.description,
    openGraph: {
      title: data.og.title,
      description: data.og.description,
      images: ['/learnpath_og_image.png'],
      type: 'website',
    },
  }
}

// ─── design tokens (with fallbacks matching globals.css) ─────────────────────

const A     = '#d4853a'
const BG2   = 'var(--bg2, #111318)'
const BG3   = 'var(--bg3, #1a1c24)'
const BG4   = 'var(--bg4, #22252f)'
const TEXT  = 'var(--text, #e8e6df)'
const TEXT2 = 'var(--text2, #9a9790)'
const TEXT3 = 'var(--text3, #5a5856)'
const BDR   = 'var(--border, #2a2d37)'
const BDR2  = 'var(--border2, #343845)'
const SERIF = "'Playfair Display', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"
const MONO  = "'JetBrains Mono', monospace"

const TYPE_COLOR: Record<string, string> = {
  lesson: '#7aacef', flashcards: '#b090f0', exercise: '#6abf8a',
  review: '#e8a55a', practice: '#6abf8a', quiz: '#e87a7a',
}

// ─── page component ──────────────────────────────────────────────────────────

export default function LearnTopicPage({ params }: { params: { topic: string } }) {
  const data = TOPICS[params.topic]
  if (!data) notFound()
  const { hero, benefits, faq, curriculum } = data

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #0a0b0f)', color: TEXT, fontFamily: SANS, overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #2a2d38', background: 'rgba(10,11,15,0.88)', backdropFilter: 'blur(12px)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <Link href='/' style={{ fontFamily: SERIF, fontSize: 20, color: A, textDecoration: 'none', letterSpacing: '-0.01em' }}>◆ Learnpath</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href='/pricing' style={{ padding: '7px 14px', borderRadius: 7, color: TEXT2, fontSize: 13, textDecoration: 'none', fontFamily: SANS }}>Pricing</Link>
          <Link href='/auth' style={{ padding: '7px 14px', borderRadius: 7, color: TEXT2, fontSize: 13, textDecoration: 'none', fontFamily: SANS }}>Sign in</Link>
          <Link href='/auth' style={{ padding: '8px 16px', borderRadius: 7, background: A, color: '#0a0b0f', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: SANS }}>Get started free</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 10, fontFamily: MONO, color: A, background: 'rgba(212,133,58,0.1)', border: '1px solid rgba(212,133,58,0.28)', borderRadius: 4, padding: '3px 10px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Free · No signup required</div>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,5vw,46px)', color: TEXT, lineHeight: 1.2, marginBottom: 16, fontWeight: 400 }}>{hero.h1}</h1>
        <p style={{ fontSize: 16.5, color: TEXT2, lineHeight: 1.65, maxWidth: 580, margin: '0 auto 52px' }}>{hero.sub}</p>
      </div>

      {/* DEMO BOX */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 72px' }}>
        <DemoBox />
      </div>

      {/* BENEFITS */}
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: TEXT, fontWeight: 400, textAlign: 'center', marginBottom: 36 }}>Built for how students actually study</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 14 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: BG2, border: `1px solid ${BDR}`, borderRadius: 12, padding: '22px 22px' }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(212,133,58,0.12)', border: '1px solid rgba(212,133,58,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: A, marginBottom: 12 }}>◆</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: TEXT, marginBottom: 6 }}>{b.title}</div>
              <div style={{ fontSize: 13, color: TEXT2, lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CURRICULUM PREVIEW */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 9, fontFamily: MONO, color: A, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Example plan · generated by Claude</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 24, color: TEXT, fontWeight: 400 }}>{curriculum.title}</h2>
          <p style={{ fontSize: 13, color: TEXT2, marginTop: 6 }}>{curriculum.subtitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 14 }}>
            {[`${curriculum.totalWeeks} weeks`, `${curriculum.daysPerWeek} days/week`, `${curriculum.sessionTime}/session`, curriculum.level].map((chip, i) => (
              <span key={i} style={{ fontSize: 9, fontFamily: MONO, padding: '3px 8px', borderRadius: 4, border: `1px solid ${BDR2}`, background: BG3, color: TEXT3 }}>{chip}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {curriculum.weeks.map((wk, wi) => (
            <div key={wi} style={{ background: BG2, border: `1px solid ${wi === 0 ? 'rgba(212,133,58,0.35)' : BDR}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: `1px solid ${BDR}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: wi === 0 ? 'rgba(212,133,58,0.12)' : BG4, border: `1px solid ${wi === 0 ? 'rgba(212,133,58,0.38)' : BDR2}`, fontFamily: MONO, fontSize: 11, color: wi === 0 ? A : TEXT3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>W{wi + 1}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: TEXT }}>{wk.theme}</div>
                  <div style={{ fontSize: 10, fontFamily: MONO, color: TEXT3, marginTop: 2 }}>{wk.milestone}</div>
                </div>
              </div>
              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {wk.days.map((d, di) => {
                  const c = TYPE_COLOR[d.type] || TYPE_COLOR.lesson
                  return (
                    <div key={di} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 11px', background: BG3, border: `1px solid ${BDR}`, borderRadius: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, background: BG4, border: `1px solid ${BDR2}`, fontFamily: MONO, fontSize: 9, color: TEXT3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>D{di + 1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <span style={{ fontSize: 8, fontFamily: MONO, padding: '1px 5px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.06em', background: `${c}18`, color: c, border: `1px solid ${c}40` }}>{d.type}</span>
                          <span style={{ fontSize: 9, fontFamily: MONO, color: TEXT3, marginLeft: 'auto' }}>{d.duration}</span>
                        </div>
                        <div style={{ fontSize: 12.5, fontWeight: 500, color: TEXT, marginBottom: 2 }}>{d.title}</div>
                        <div style={{ fontSize: 11.5, color: TEXT2, lineHeight: 1.5 }}>{d.description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <Link href='/auth' style={{ display: 'inline-block', padding: '13px 32px', borderRadius: 10, background: A, color: '#0a0b0f', fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: SANS }}>Build your own plan free →</Link>
          <div style={{ fontSize: 12, color: TEXT3, marginTop: 10 }}>No credit card required. Free account saves your plan and unlocks lessons.</div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 660, margin: '0 auto', padding: '0 24px 96px' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: TEXT, fontWeight: 400, marginBottom: 28, textAlign: 'center' }}>Common questions</h2>
        <div>
          {faq.map((item, i) => (
            <div key={i} style={{ borderTop: `1px solid ${BDR}`, padding: '20px 0' }}>
              <div style={{ fontSize: 14.5, fontWeight: 500, color: TEXT, marginBottom: 8 }}>{item.q}</div>
              <div style={{ fontSize: 13.5, color: TEXT2, lineHeight: 1.65 }}>{item.a}</div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${BDR}` }} />
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #2a2d38', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: SERIF, fontSize: 18, color: A, marginBottom: 8 }}>◆ Learnpath</div>
        <div style={{ fontSize: 12, color: TEXT3, marginBottom: 16 }}>Learn Anything · All Inside · Built by MRF Studios</div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          <Link href='/pricing' style={{ fontSize: 12, color: TEXT3, textDecoration: 'none' }}>Pricing</Link>
          <Link href='/auth' style={{ fontSize: 12, color: TEXT3, textDecoration: 'none' }}>Sign in</Link>
          <Link href='/auth' style={{ fontSize: 12, color: TEXT3, textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>

    </div>
  )
}