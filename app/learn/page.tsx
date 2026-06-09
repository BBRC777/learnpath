// app/learn/page.tsx
// Browse page for all /learn/[topic] pages. Fully static Server Component —
// no client JS, full SSG, clean for SEO and crawlers.
// Adding a new topic category: just add its import here and a new CATEGORIES entry.

import type { Metadata } from 'next'
import Link from 'next/link'
import { slugToDisplay } from '@/lib/topics-index'

import { coreTopics }       from './topics/core'
import { apTopics }         from './topics/ap'
import { highSchoolTopics } from './topics/highschool'
import { collegeTopics }    from './topics/college'
import { examTopics }       from './topics/exams'
import { programmingTopics } from './topics/programming'
import { languageTopics }   from './topics/languages'
import { skillsTopics }     from './topics/skills'
import type { TopicData }   from './topics/types'

// ─── category registry ────────────────────────────────────────────────────────

interface Category {
  label: string
  description: string
  icon: string
  topics: Record<string, TopicData>
}

const CATEGORIES: Category[] = [
  {
    label: 'Medical & Pre-Med',
    description: 'MCAT subjects, USMLE Step 1, NCLEX',
    icon: '🩺',
    topics: coreTopics,
  },
  {
    label: 'Professional Exams',
    description: 'USMLE Step 2, GRE, GMAT, LSAT, CPA, Bar, and more',
    icon: '📋',
    topics: examTopics,
  },
  {
    label: 'AP Exams',
    description: 'All College Board AP subjects',
    icon: '🎓',
    topics: apTopics,
  },
  {
    label: 'High School',
    description: 'Core high-school courses and subjects',
    icon: '🏫',
    topics: highSchoolTopics,
  },
  {
    label: 'College Courses',
    description: 'Intro and 100-200 level college courses',
    icon: '🏛️',
    topics: collegeTopics,
  },
  {
    label: 'Programming & Tech',
    description: 'Languages, databases, and software fundamentals',
    icon: '💻',
    topics: programmingTopics,
  },
  {
    label: 'Languages',
    description: 'Conversational and practical language learning',
    icon: '🌍',
    topics: languageTopics,
  },
  {
    label: 'Skills & Life',
    description: 'Personal finance, productivity, and practical skills',
    icon: '✨',
    topics: skillsTopics,
  },
]

const totalTopics = CATEGORIES.reduce((n, c) => n + Object.keys(c.topics).length, 0)

// ─── metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `All Study Topics (${totalTopics}) | Learnpath`,
  description:
    `Browse ${totalTopics} study topics — MCAT, AP exams, college courses, programming, languages, and more. ` +
    'Pick any topic and get a personalized AI study plan in seconds. Free, no signup.',
  openGraph: {
    title: `Browse all ${totalTopics} study topics | Learnpath`,
    description:
      'MCAT, AP, college courses, programming, languages — pick a topic and get a personalized study plan in seconds.',
    images: ['/learnpath_og_image.png'],
    type: 'website',
  },
}

// ─── design tokens ────────────────────────────────────────────────────────────

const A     = '#d4853a'
const A2    = '#e8a55a'
const BG    = 'var(--bg,  #0a0b0f)'
const BG2   = 'var(--bg2, #111318)'
const BG3   = 'var(--bg3, #1a1c24)'
const TEXT  = 'var(--text,  #e8e6df)'
const TEXT2 = 'var(--text2, #9a9790)'
const TEXT3 = 'var(--text3, #5a5856)'
const BDR   = 'var(--border,  #2a2d37)'
const BDR2  = 'var(--border2, #343845)'
const SERIF = "'Playfair Display', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"
const MONO  = "'JetBrains Mono', monospace"

// ─── page ─────────────────────────────────────────────────────────────────────

export default function LearnIndexPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: SANS, color: TEXT }}>
      {/* Pill hover — injected once server-side, no client JS needed */}
      <style dangerouslySetInnerHTML={{ __html:
        `.lp-topic-pill:hover { border-color: ${A} !important; color: ${TEXT} !important; background: ${BG3} !important; }`
      }} />

      {/* ── top nav bar ── */}
      <div style={{ borderBottom: `1px solid ${BDR}`, background: BG2 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none', fontFamily: SERIF, fontSize: 17, color: A, fontWeight: 600, letterSpacing: '-0.01em' }}>
            ◆ Learnpath
          </Link>
          <span style={{ color: BDR2, fontSize: 14 }}>/</span>
          <span style={{ fontSize: 13, color: TEXT3, fontFamily: MONO }}>Browse topics</span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 80px' }}>

        {/* ── hero ── */}
        <div style={{ padding: '52px 0 40px', borderBottom: `1px solid ${BDR}` }}>
          <div style={{ fontSize: 11, fontFamily: MONO, color: A, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>
            {totalTopics} topics · 8 categories
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 700, color: TEXT, margin: '0 0 14px', lineHeight: 1.15 }}>
            Find your study topic
          </h1>
          <p style={{ fontSize: 16, color: TEXT2, margin: '0 0 24px', maxWidth: 560, lineHeight: 1.65 }}>
            Pick any topic below and get a personalized, week-by-week study plan in seconds —
            with AI-generated lessons, flashcards, and a built-in tutor. Free, no signup required.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '10px 18px', borderRadius: 8, textDecoration: 'none',
              background: A, color: '#0a0b0f', fontFamily: SANS, fontSize: 13.5, fontWeight: 600,
            }}
          >
            Build a plan for any topic →
          </Link>
        </div>

        {/* ── category sections ── */}
        {CATEGORIES.map(cat => {
          const slugs = Object.keys(cat.topics)
          if (slugs.length === 0) return null
          return (
            <section key={cat.label} style={{ padding: '36px 0 0', borderBottom: `1px solid ${BDR}` }}>

              {/* category header */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{cat.icon}</span>
                <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: TEXT, margin: 0 }}>
                  {cat.label}
                </h2>
                <span style={{
                  fontSize: 10, fontFamily: MONO, color: A, background: 'rgba(212,133,58,0.12)',
                  border: `1px solid rgba(212,133,58,0.3)`, borderRadius: 4,
                  padding: '2px 7px', textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {slugs.length}
                </span>
              </div>
              <p style={{ fontSize: 13, color: TEXT3, fontFamily: MONO, margin: '0 0 20px' }}>
                {cat.description}
              </p>

              {/* topic pills grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 32 }}>
                {slugs.map(slug => (
                  <TopicPill key={slug} slug={slug} />
                ))}
              </div>

            </section>
          )
        })}

        {/* ── bottom CTA ── */}
        <div style={{ marginTop: 56, padding: '36px 32px', background: BG2, borderRadius: 16, border: `1px solid ${BDR}`, textAlign: 'center' }}>
          <div style={{ fontFamily: SERIF, fontSize: 22, color: TEXT, marginBottom: 8 }}>
            Don't see your topic?
          </div>
          <p style={{ fontSize: 14, color: TEXT2, margin: '0 auto 20px', maxWidth: 440 }}>
            Learnpath builds a plan for almost anything — just type it into the homepage
            and Claude will build a curriculum in seconds.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '11px 22px', borderRadius: 9, textDecoration: 'none',
              background: BG3, border: `1px solid ${BDR2}`,
              color: TEXT2, fontFamily: SANS, fontSize: 13.5,
            }}
          >
            Type any topic on the homepage →
          </Link>
        </div>

      </div>
    </div>
  )
}

// ─── topic pill ───────────────────────────────────────────────────────────────
// A pure server component — hover handled via CSS class injected below.

function TopicPill({ slug }: { slug: string }) {
  const display = slugToDisplay(slug)
  return (
    <Link
      href={`/learn/${slug}`}
      className="lp-topic-pill"
      style={{
        display: 'inline-block', textDecoration: 'none',
        padding: '7px 14px', borderRadius: 8,
        background: BG2, border: `1px solid ${BDR}`,
        color: TEXT2, fontFamily: SANS, fontSize: 13,
        transition: 'border-color 0.15s, color 0.15s, background 0.15s',
      }}
    >
      {display}
    </Link>
  )
}