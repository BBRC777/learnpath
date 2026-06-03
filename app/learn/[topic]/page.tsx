// app/learn/[topic]/page.tsx
// Handles /learn/mcat  /learn/python  /learn/spanish-conversational
// Server component — exports generateStaticParams + generateMetadata for full SSG + SEO.

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DemoBox from '@/components/DemoBox'

// ─── types ──────────────────────────────────────────────────────────────────

interface DayEntry    { day: number; title: string; description: string; type: string; duration: string }
interface WeekEntry   { week: number; theme: string; milestone: string; days: DayEntry[]; quizCount: number }
interface Curriculum  { title: string; subtitle: string; overview: string; totalWeeks: number; daysPerWeek: number; sessionTime: string; level: string; weeks: WeekEntry[] }
interface TopicData   { meta: { title: string; description: string }; og: { title: string; description: string }; hero: { h1: string; sub: string }; benefits: { title: string; desc: string }[]; faq: { q: string; a: string }[]; curriculum: Curriculum }

// ─── content data ────────────────────────────────────────────────────────────

const TOPICS: Record<string, TopicData> = {
  mcat: {
    meta: {
      title: "MCAT Study Plan: AI-Built in Seconds | Learnpath",
      description: "Paste your timeline or a topic and get a personalized MCAT study plan — high-yield lessons, flashcards, and an AI tutor. Free to try, no signup.",
    },
    og: {
      title: "Your AI study partner for the MCAT",
      description: "Paste a topic or your exam date and get a high-yield MCAT study plan in seconds — lessons, flashcards, and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for the MCAT",
      sub: "Tell it your exam date or a single topic, and get a high-yield study plan in seconds — built around how much time you actually have, with lessons, flashcards, and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "Back-scheduled to your exam date.", desc: "Tell it when you test and your plan works backward, fitting the highest-yield topics into the weeks you have — with room left for full-lengths." },
      { title: "High-yield first.", desc: "Lessons focus on what the MCAT actually tests — biochem, physics, psych/soc — instead of everything in the textbook, so your time goes where it counts." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface your toughest concepts on a schedule, so what you learn in week one is still there on test day." },
    ],
    faq: [
      { q: "How long should I study for the MCAT?", a: "Most students give themselves three to six months. Learnpath back-schedules from your exam date, so however long you have, your plan fits the highest-yield topics into the time you've actually got." },
      { q: "Can I build an MCAT study plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It's a study partner that handles the planning and daily practice, and works alongside any course, book, or tutor you're already using." },
      { q: "What MCAT subjects does it cover?", a: "Any of them — biochemistry, biology, general and organic chemistry, physics, and psychology/sociology. Name a section or a specific topic and it builds a focused plan." },
    ],
    curriculum: {
      title: "MCAT Biochemistry — 3-Week High-Yield Sprint",
      subtitle: "Amino acids to metabolism, with spaced recall built in",
      overview: "A focused three-week plan covering the highest-yield biochemistry on the MCAT — protein structure, enzymes, and metabolism — with checkpoint quizzes and spaced review so it sticks.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Amino acids & protein structure", milestone: "Recognize all 20 amino acids and the four levels of protein structure", quizCount: 1, days: [
          { day: 1, title: "The 20 amino acids", description: "Structures, one- and three-letter codes, and side-chain classes: nonpolar, polar, acidic, basic.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Acid–base & the peptide bond", description: "pKa, isoelectric point, titration curves, and how peptide bonds form.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Protein structure levels", description: "Primary through quaternary, and the forces that stabilize each.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "High-yield questions on amino acids, charge, and structure.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's toughest cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Enzymes & bioenergetics", milestone: "Interpret enzyme-kinetics plots and predict the effect of each inhibitor type", quizCount: 1, days: [
          { day: 1, title: "Enzyme function & regulation", description: "Active sites, cofactors, allosteric regulation, and feedback inhibition.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Enzyme kinetics", description: "Michaelis–Menten, Km and Vmax, and reading Lineweaver–Burk plots.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Inhibition", description: "Competitive, noncompetitive, uncompetitive, and mixed — effects on Km and Vmax.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Kinetics plots and inhibitor identification.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across enzymes and week one.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Metabolism & integration", milestone: "Trace glucose through glycolysis and the TCA cycle and account for the ATP", quizCount: 1, days: [
          { day: 1, title: "Glycolysis", description: "Key regulated steps, net ATP and NADH, and where it happens.", type: "lesson", duration: "30 min" },
          { day: 2, title: "TCA cycle & oxidative phosphorylation", description: "Carbon flow, the electron transport chain, and chemiosmosis.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Metabolic integration", description: "Fed vs. fasted states, key hormones, and pathway crosstalk.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of biochem in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  python: {
    meta: {
      title: "Python Study Plan: AI-Built in Seconds | Learnpath",
      description: "Tell it your goal or paste a topic and get a personalized Python learning plan — hands-on lessons, flashcards, and an AI tutor. Free to try, no signup.",
    },
    og: {
      title: "Your AI study partner for Python",
      description: "Tell it your goal or a topic and get a hands-on Python learning plan in seconds — lessons, practice, flashcards, and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for Python",
      sub: "Tell it what you want to build or a topic to master, and get a structured learning plan in seconds — hands-on lessons, practice, flashcards, and a tutor for when you get stuck.",
    },
    benefits: [
      { title: "Learn by building.", desc: "Lessons pair each concept with small, runnable examples, so you're writing real Python from day one — not just reading about it." },
      { title: "Goes at your pace.", desc: "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed to match where you are." },
      { title: "Practice that sticks.", desc: "Flashcards and checkpoint quizzes resurface syntax and concepts on a schedule, so the fundamentals become second nature." },
    ],
    faq: [
      { q: "How long does it take to learn Python?", a: "It depends on your goal. For the fundamentals, a few focused weeks is realistic. Learnpath scales the plan to your timeline and how much time you can give it each day." },
      { q: "Can I build a Python study plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials, like a course PDF." },
      { q: "Do I need any programming experience to start?", a: "No. Tell it you're starting from zero and the plan begins with the fundamentals, building up to writing small programs on your own." },
      { q: "What can I learn besides the basics?", a: "Whatever you name — data analysis, web scraping, automation, or a specific library. Give it a goal or a topic and it builds a focused plan around it." },
    ],
    curriculum: {
      title: "Python Foundations — 3-Week Starter Plan",
      subtitle: "From variables to your first real program",
      overview: "A three-week plan that takes you from Python basics to writing small, working programs — syntax and control flow, functions and data structures, then files, errors, and a build.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Syntax & control flow", milestone: "Write programs that make decisions and repeat work", quizCount: 1, days: [
          { day: 1, title: "Variables & types", description: "Numbers, strings, booleans, and how Python stores and converts them.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Operators & input", description: "Arithmetic, comparisons, and reading input from the user.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Conditionals & loops", description: "if/elif/else, for and while, and when to reach for each.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Trace small programs and predict their output.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on syntax and control flow.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Functions & data structures", milestone: "Organize code into functions and choose the right data structure", quizCount: 1, days: [
          { day: 1, title: "Functions", description: "Defining functions, arguments, return values, and scope.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Lists & dictionaries", description: "Storing and looking up data, and iterating over collections.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Strings & comprehensions", description: "Useful string methods and list/dict comprehensions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Write and read functions that work over lists and dicts.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Files, errors & a build", milestone: "Build a small program that reads input and handles errors", quizCount: 1, days: [
          { day: 1, title: "Files & the filesystem", description: "Reading and writing text files, and working with paths.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Errors & exceptions", description: "try/except, common errors, and debugging basics.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Build a small CLI tool", description: "Combine variables, functions, files, and error handling into a working program.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Python in short coding problems.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'spanish-conversational': {
    meta: {
      title: "Conversational Spanish Plan, AI-Built | Learnpath",
      description: "Get a personalized plan for everyday conversational Spanish — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for conversational Spanish",
      description: "Get a plan to actually speak everyday Spanish — practical lessons, spaced vocab, and an AI tutor to practice with.",
    },
    hero: {
      h1: "Your AI study partner for conversational Spanish",
      sub: "Tell it your level or a situation you want to handle, and get a plan to actually speak — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with.",
    },
    benefits: [
      { title: "Built for real conversations.", desc: "Lessons center on the phrases and patterns you'd actually use — introductions, ordering, directions — not grammar drills in isolation." },
      { title: "Vocabulary that sticks.", desc: "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing instead of fading." },
      { title: "Practice with a patient tutor.", desc: "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need." },
    ],
    faq: [
      { q: "How long until I can hold a basic conversation?", a: "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day." },
      { q: "Can I build a Spanish study plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "I'm a complete beginner — is that okay?", a: "Absolutely. Tell it you're starting from zero and the plan begins with greetings and the present tense, building toward everyday conversations." },
      { q: "Does it replace a class or a tutor?", a: "No. It handles your daily practice and vocabulary, and works alongside any class, app, or conversation partner you already have." },
    ],
    curriculum: {
      title: "Conversational Spanish — 3-Week Starter Plan",
      subtitle: "From greetings to handling everyday situations",
      overview: "A three-week plan focused on speaking everyday Spanish — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "20 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Greetings & introductions", milestone: "Introduce yourself and ask simple questions", quizCount: 1, days: [
          { day: 1, title: "Greetings & courtesies", description: "Hello and goodbye, please and thank you, and formal vs. informal 'you'.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Introducing yourself", description: "Your name, where you're from, and asking the same in return.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Numbers & the present tense", description: "Counting, plus regular -ar, -er, and -ir verbs in the present.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Short exchanges using greetings and the present tense.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's vocabulary.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Getting around & everyday needs", milestone: "Order food and ask for directions", quizCount: 1, days: [
          { day: 1, title: "Food & ordering", description: "Reading a menu, ordering politely, and common dishes.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Directions & places", description: "Asking where things are and understanding the answer.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Ser vs. estar", description: "The two 'to be' verbs and when to use each.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Role-play ordering and asking for directions.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Past, future & telling stories", milestone: "Talk about what you did and what you'll do", quizCount: 1, days: [
          { day: 1, title: "The past (preterite)", description: "Talking about completed actions, plus a few common irregulars.", type: "lesson", duration: "20 min" },
          { day: 2, title: "The near future", description: "Using 'ir + a + infinitive' to say what you're going to do.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Putting it together", description: "Linking sentences to tell a short, simple story.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Spanish in short conversations.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },
}

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
