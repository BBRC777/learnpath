// scripts/prewarm.mjs
// ---------------------------------------------------------------------------
// One-time / repeatable warmer for Learnpath's caches:
//   • demo_cache         → the sample plan the homepage demo box shows
//   • global_lesson_cache → the lessons a claimed plan loads (incl. lesson 1)
// Goal: the demo box AND the claim→lesson-1 path are instant for top topics.
//
// Run from the repo root:   node scripts/prewarm.mjs
// Optional: WARM_WEEKS=2 node scripts/prewarm.mjs   (warm every lesson, not just week 1)
//
// Needs in .env.local (all already used by the app):
//   ANTHROPIC_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
// Idempotent: re-running reuses any plan already in demo_cache and skips any
// lesson already in global_lesson_cache, so it only fills gaps. Safe to re-run.
//
// It deliberately calls Anthropic + Supabase directly (service-role) instead of
// hitting /api/demo/curriculum, so it does NOT consume the route's 20/day IP
// limit and never touches demo_usage. The normalizeTopic / plan prompt /
// makeGlobalCacheId below are VERBATIM copies of the app's — keep them in sync
// if the originals change, or warmed rows will stop being hit.
// ---------------------------------------------------------------------------

import fs from 'node:fs'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

// ---- tiny .env.local loader (no dependency, works on any Node version) ----
try {
  const txt = fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  for (const line of txt.split('\n')) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
} catch { /* fall back to shell env */ }

function req(name) {
  const v = process.env[name]
  if (!v) { console.error(`Missing env var: ${name} — add it to .env.local`); process.exit(1) }
  return v
}

// ---- constants that MIRROR app/api/demo/curriculum/route.ts ----
const MODEL = 'claude-sonnet-4-6'
const DEMO_WEEKS = 2
const DEMO_DAYS = 5
const DEMO_TIME = '20 min'
const DEMO_LEVEL = 'Beginner'

// How many weeks of lessons to warm per topic. 1 = the landing week (5 lessons);
// the app's own background generation fills the rest once a user opens lesson 1.
// Set WARM_WEEKS=2 to warm every lesson up front.
const WARM_WEEKS = Number(process.env.WARM_WEEKS || 1)

// Throttle between live generations (ms).
const DELAY_MS = Number(process.env.DELAY_MS || 600)

// Topic strings EXACTLY as users reach them. These must be the strings that get
// CLAIMED on signup, so the global-cache key matches. First six are the demo
// box's example chips (one-click, highest traffic); the rest are canonical
// student topics. Edit freely.
const TOPICS = [
  'Python', 'Conversational Spanish', 'Music Theory', 'The French Revolution', 'Investing Basics', 'Chess Openings',
  'MCAT', 'Organic Chemistry', 'Biochemistry', 'Anatomy', 'Calculus', 'Statistics',
  'Linear Algebra', 'Physics', 'Microeconomics', 'Psychology', 'World History',
  'SAT', 'Bar Exam', 'JavaScript', 'French', 'Spanish',
]

const anthropic = new Anthropic({ apiKey: req('ANTHROPIC_API_KEY') })
const supabase = createClient(req('NEXT_PUBLIC_SUPABASE_URL'), req('SUPABASE_SERVICE_ROLE_KEY'), {
  auth: { persistSession: false, autoRefreshToken: false },
})

// ===== VERBATIM copies of the app's keying + prompts =====================

// app/api/demo/curriculum/route.ts → normalizeTopic
function normalizeTopic(raw) {
  let t = raw.toLowerCase().trim()
  t = t.replace(/^(please\s+)?(can you\s+)?(help me\s+)?(teach me|i want to learn|i wanna learn|i'd like to learn|learn|how to|study|master)\s+/i, '')
  t = t.replace(/\b(in\s+)?\d+\s*(weeks?|days?|months?)\b/g, '')
  t = t.replace(/\b\d+\s*(min(ute)?s?|hours?|hrs?)\b(\s*(a|per)\s*day)?/g, '')
  t = t.replace(/\b(a|per)\s+day\b/g, '')
  t = t.replace(/[.,;:!?]+/g, ' ').replace(/\s+/g, ' ').trim()
  return t
}

// lib/db.ts → makeGlobalCacheId (title-keyed)
function makeGlobalCacheId(topic, level, weekNum, dayNum, dayTitle = '') {
  // Keep in sync with lib/db.ts. dayTitle excluded from key by design. (M3a)
  return [
    topic.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 40),
    level.toLowerCase().replace(/[^a-z0-9]/g, '_'),
    weekNum, dayNum,
  ].join('__')
}

// app/api/demo/curriculum/route.ts → buildPrompt (takes the NORMALIZED topic)
function buildPlanPrompt(topicKey) {
  return `Create a personalised learning curriculum as a single valid JSON object. No markdown. No explanation.

Topic: "${topicKey}"
Level: ${DEMO_LEVEL}
Duration: ${DEMO_WEEKS} weeks
Days per week: ${DEMO_DAYS}
Session length: ${DEMO_TIME}
Learning style: mixed

Return ONLY valid JSON:
{
  "title": "Engaging curriculum title",
  "subtitle": "One-line subtitle",
  "overview": "2-3 sentence overview.",
  "totalWeeks": ${DEMO_WEEKS},
  "daysPerWeek": ${DEMO_DAYS},
  "sessionTime": "${DEMO_TIME}",
  "level": "${DEMO_LEVEL}",
  "weeks": [{ "week": 1, "theme": "Week theme title", "milestone": "By end of this week you can...", "days": [{ "day": 1, "title": "Day activity title", "description": "One sentence.", "type": "lesson", "duration": "${DEMO_TIME}" }], "quizCount": 3 }]
}

Rules: Exactly ${DEMO_WEEKS} weeks, exactly ${DEMO_DAYS} days each. Vary types: lesson, flashcards, exercise, review, practice.`
}

// components/screens/LessonScreen.tsx → loadLesson prompt (media-rich foreground version)
function buildLessonPrompt(topic, level, wi, di, week, day) {
  return "You are an expert educator. Generate a complete, engaging lesson as a single valid JSON object. Return ONLY the JSON, no markdown, no explanation.\n\nTopic: " + topic + "\nLevel: " + level + "\nWeek " + (wi + 1) + " Theme: " + week.theme + "\nSession: " + day.title + "\nType: " + day.type + "\nDuration: " + day.duration + "\nDescription: " + day.description + "\n\nGenerate this JSON:\n{\n  \"title\": \"Engaging lesson title\",\n  \"subject\": \"" + topic + "\",\n  \"level\": \"" + level + "\",\n  \"duration\": \"" + day.duration + "\",\n  \"eyebrow\": \"Week " + (wi + 1) + " - Day " + (di + 1) + "\",\n  \"intro\": \"2-3 sentence introduction.\",\n  \"content\": \"Full lesson in markdown, 600-900 words. Use ## headers and > for insights.\",\n  \"keyPoints\": [\"Point 1\", \"Point 2\", \"Point 3\"],\n  \"vocab\": [{\"word\": \"term\", \"reading\": \"type\", \"example\": \"usage\"}],\n  \"exercises\": [{\"type\": \"Multiple Choice\", \"question\": \"Question?\", \"opts\": [\"A\",\"B\",\"C\",\"D\"], \"correct\": 0, \"explanation\": \"Why.\"}],\n  \"quiz\": [{\"q\": \"Question?\", \"opts\": [\"A\",\"B\",\"C\",\"D\"], \"correct\": 0, \"explanation\": \"Why.\"}]\n}\nRules: vocab 4-8 terms, exercises 2-3 mixed types, quiz 3 questions, content rich and specific. CRITICAL MEDIA: In the content field embed media tags on their own lines. IMAGE TAGS: [IMG:very specific visual query] - add 3-5 for physical techniques/poses/objects, make queries highly specific e.g. [IMG:Warrior I yoga correct hip squared alignment]. VIDEO TAGS: [VID:specific youtube search] - add 1-2 for key techniques e.g. [VID:Warrior I yoga pose tutorial beginners step by step]. Both replaced with real photos/videos."
}

// ===== generation + cache writes =========================================

async function genJSON(prompt, maxTokens) {
  const msg = await anthropic.messages.create({ model: MODEL, max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] })
  const text = msg.content.map(b => (b.type === 'text' ? b.text : '')).join('')
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('no JSON in model output')
  const parsed = JSON.parse(match[0])
  if (parsed.content) parsed.content = parsed.content.replace(/\\n/g, '\n') // mirror loadLesson
  return parsed
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

// Reuse the cached plan if present (so warmed lessons match its frozen titles);
// otherwise generate it and cache it under the normalized key the route uses.
async function getOrCreatePlan(topic) {
  const topicKey = normalizeTopic(topic)
  const { data: cached } = await supabase.from('demo_cache').select('curriculum').eq('topic_key', topicKey).maybeSingle()
  if (cached?.curriculum) return { topicKey, plan: cached.curriculum, fresh: false }
  const plan = await genJSON(buildPlanPrompt(topicKey), 3000)
  await supabase.from('demo_cache').upsert({ topic_key: topicKey, curriculum: plan }, { onConflict: 'topic_key' })
  return { topicKey, plan, fresh: true }
}

async function warmLesson(topic, level, wi, di, week, day) {
  const id = makeGlobalCacheId(topic, level, wi + 1, di + 1, day.title)
  const { data: exists } = await supabase.from('global_lesson_cache').select('id').eq('id', id).maybeSingle()
  if (exists) return 'skip'
  const lesson = await genJSON(buildLessonPrompt(topic, level, wi, di, week, day), 4000)
  await supabase.from('global_lesson_cache').upsert({
    id, topic, level, week_num: wi + 1, day_num: di + 1,
    week_theme: week.theme, day_title: day.title, day_type: day.type,
    lesson_data: lesson, updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })
  return 'warmed'
}

async function main() {
  console.log(`Warming ${TOPICS.length} topics · ${WARM_WEEKS} week(s) of lessons each\n`)
  let warmed = 0, skipped = 0, failed = 0
  for (const topic of TOPICS) {
    try {
      const { topicKey, plan, fresh } = await getOrCreatePlan(topic)
      const weeks = (plan.weeks || []).slice(0, WARM_WEEKS)
      console.log(`• ${topic}  (key="${topicKey}" · plan ${fresh ? 'generated' : 'cached'} · ${weeks.length} wk)`)
      for (let wi = 0; wi < weeks.length; wi++) {
        const week = weeks[wi]
        const days = week.days || []
        for (let di = 0; di < days.length; di++) {
          const day = days[di]
          try {
            const r = await warmLesson(topic, plan.level || DEMO_LEVEL, wi, di, week, day)
            if (r === 'warmed') warmed++; else skipped++
            console.log(`    W${wi + 1}D${di + 1}  ${String(day.title).slice(0, 44).padEnd(44)} ${r}`)
            if (r === 'warmed') await sleep(DELAY_MS)
          } catch (e) { failed++; console.log(`    W${wi + 1}D${di + 1}  FAILED: ${e.message}`) }
        }
      }
    } catch (e) { failed++; console.log(`! ${topic} — plan failed: ${e.message}`) }
    await sleep(DELAY_MS)
  }
  console.log(`\nDone. lessons warmed=${warmed} · skipped(existing)=${skipped} · failed=${failed}`)
}

main().catch(e => { console.error(e); process.exit(1) })
