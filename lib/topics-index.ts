// lib/topics-index.ts
// Builds the canonical suggestion candidates from the live /learn TOPICS registry,
// plus an alias map that collapses common phrasings onto one canonical query
// (the lightweight version of the cost-model's "canonical-syllabus rework").
//
// This module is pure string work — no DB calls, no model calls. Cache-status and
// popularity are layered on top in the /api/topics/suggest route.

import { TOPICS } from '@/app/learn/topics'
import { normalizeTopic } from '@/lib/normalize-topic'

export interface TopicCandidate {
  /** Human-facing label shown in the dropdown, e.g. "MCAT Biochemistry". */
  display: string
  /** Normalized query string — what gets typed into the box / used as the cache key. */
  query: string
  /** /learn slug when this candidate is backed by an SEO page (deep-linkable). */
  slug?: string
}

// Tokens that should render upper-case in a prettified slug.
const ACRONYMS = new Set([
  'mcat', 'usmle', 'nclex', 'sat', 'act', 'psat', 'gre', 'gmat', 'lsat', 'dat', 'pcat',
  'teas', 'cpa', 'pmp', 'ap', 'cars', 'eli5', 'sql', 'css', 'html', 'api', 'ui', 'ux',
  'gdp', 'dna', 'rna', 'atp', 'tca', 'ai', 'ii', 'iii', 'iv',
])

const LOWER_WORDS = new Set(['and', 'of', 'the', 'to', 'a', 'in', 'for', 'with', 'vs'])

/** "mcat-organic-chemistry" -> "MCAT Organic Chemistry"; "ap-us-history" -> "AP US History". */
export function slugToDisplay(slug: string): string {
  const parts = slug.split('-')
  return parts
    .map((w, i) => {
      if (ACRONYMS.has(w)) return w.toUpperCase()
      if (i > 0 && LOWER_WORDS.has(w)) return w
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(' ')
}

// Alias -> canonical query. Keys are matched against the NORMALIZED user input
// (so they must themselves be in normalized form: lower-case, no schedule phrases).
// The value is the canonical query the alias collapses onto. This is the cache
// de-fragmentation fix: "orgo", "ochem", "organic chem" all resolve to one key.
const RAW_ALIASES: Record<string, string> = {
  'orgo': 'organic chemistry',
  'ochem': 'organic chemistry',
  'o chem': 'organic chemistry',
  'organic chem': 'organic chemistry',
  'gen chem': 'general chemistry',
  'genchem': 'general chemistry',
  'g chem': 'general chemistry',
  'biochem': 'biochemistry',
  'biochem mcat': 'mcat biochemistry',
  'mcat biochem': 'mcat biochemistry',
  'mcat bio': 'mcat biology',
  'mcat orgo': 'mcat organic chemistry',
  'mcat ochem': 'mcat organic chemistry',
  'mcat gen chem': 'mcat general chemistry',
  'psych soc': 'mcat psychology sociology',
  'psoc': 'mcat psychology sociology',
  'p s': 'mcat psychology sociology',
  'cars': 'mcat cars',
  'step 1': 'usmle step 1',
  'step1': 'usmle step 1',
  'usmle': 'usmle step 1',
  'spanish': 'spanish conversational',
  'conversational spanish': 'spanish conversational',
  'calc': 'calculus',
  'stats': 'statistics',
  'poli sci': 'political science',
  'comp sci': 'computer science',
  'cs': 'computer science',
}

// Normalize alias keys once so lookups are consistent with user input handling.
export const ALIASES: Record<string, string> = Object.fromEntries(
  Object.entries(RAW_ALIASES).map(([k, v]) => [normalizeTopic(k), v]),
)

/** Resolve an alias to its canonical query, or return the input unchanged. */
export function resolveAlias(normalizedQuery: string): string {
  return ALIASES[normalizedQuery] ?? normalizedQuery
}

// Canonical candidates derived once from the live registry. Adding a /learn topic
// automatically adds it here — no edits needed (same contract as page.tsx/sitemap.ts).
let _canonical: TopicCandidate[] | null = null
export function canonicalCandidates(): TopicCandidate[] {
  if (_canonical) return _canonical
  _canonical = Object.keys(TOPICS).map(slug => {
    const display = slugToDisplay(slug)
    return { display, slug, query: normalizeTopic(display) }
  })
  return _canonical
}

// Lightweight fuzzy score: rewards prefix and word-boundary matches, tolerates the
// query appearing anywhere. Returns 0 for no match. Intentionally cheap.
export function matchScore(needleNorm: string, candidate: TopicCandidate): number {
  if (!needleNorm) return 0
  const hayDisplay = candidate.display.toLowerCase()
  const hayQuery = candidate.query
  // Strongest: candidate query starts with the needle.
  if (hayQuery.startsWith(needleNorm)) return 100 - (hayQuery.length - needleNorm.length) * 0.1
  // Strong: a word in the display starts with the needle.
  if (hayDisplay.split(/\s+/).some(w => w.startsWith(needleNorm))) return 80
  // Medium: needle appears as a substring of the query.
  if (hayQuery.includes(needleNorm)) return 60
  // Weak: all needle tokens appear somewhere in the query (order-independent).
  const tokens = needleNorm.split(' ').filter(Boolean)
  if (tokens.length > 1 && tokens.every(tok => hayQuery.includes(tok))) return 40
  return 0
}

export interface RankedCandidate extends TopicCandidate {
  score: number
}

/**
 * Build the raw candidate list for a query — canonical topics + the alias target if
 * the input is an alias — ranked purely by string match. The route layers cache
 * status + popularity on top before returning to the client.
 */
export function buildCandidates(rawQuery: string, limit = 24): RankedCandidate[] {
  const norm = normalizeTopic(rawQuery)
  if (!norm) return []
  const aliasTarget = resolveAlias(norm)

  const candidates = canonicalCandidates()
  const ranked: RankedCandidate[] = []

  for (const c of candidates) {
    // Score against both the typed text and (if different) the alias target,
    // so "orgo" surfaces the organic-chemistry topics.
    const s = Math.max(matchScore(norm, c), aliasTarget !== norm ? matchScore(aliasTarget, c) : 0)
    if (s > 0) ranked.push({ ...c, score: s })
  }

  // If the alias resolves to something with no canonical page, still offer it as a
  // free-text candidate so the user gets the de-fragmented, cache-friendly phrasing.
  if (aliasTarget !== norm && !ranked.some(r => r.query === aliasTarget)) {
    ranked.push({ display: titleCaseQuery(aliasTarget), query: aliasTarget, score: 70 })
  }

  ranked.sort((a, b) => b.score - a.score)
  return ranked.slice(0, limit)
}

/** "organic chemistry" -> "Organic Chemistry" for free-text (non-slug) candidates. */
function titleCaseQuery(q: string): string {
  return q
    .split(' ')
    .map(w => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}