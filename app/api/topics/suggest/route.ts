// app/api/topics/suggest/route.ts
// Cache-aware topic typeahead. Given ?q=, returns ranked suggestions:
//   cached/instant first  ->  most-requested next  ->  fuzzy match last.
// Pure string matching + one TTL-cached snapshot lookup. No model call per keystroke.

import { NextResponse } from 'next/server'
import { buildCandidates } from '@/lib/topics-index'
import { getTopicSnapshot } from '@/lib/topic-popularity'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export interface Suggestion {
  display: string
  query: string
  slug?: string
  cached: boolean
  hits: number
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q') ?? ''
  if (q.trim().length < 2) return NextResponse.json({ suggestions: [] })

  const candidates = buildCandidates(q, 24)
  if (candidates.length === 0) return NextResponse.json({ suggestions: [] })

  const { cachedKeys, popularity } = await getTopicSnapshot()

  const enriched: Suggestion[] = candidates.map(c => ({
    display: c.display,
    query: c.query,
    slug: c.slug,
    cached: cachedKeys.has(c.query),
    hits: popularity.get(c.query) ?? 0,
  }))

  // Rank: cached-first -> popularity -> fuzzy match score (from buildCandidates order).
  enriched.sort((a, b) => {
    if (a.cached !== b.cached) return a.cached ? -1 : 1
    if (b.hits !== a.hits) return b.hits - a.hits
    return 0 // preserve buildCandidates' score-descending order on ties
  })

  return NextResponse.json({ suggestions: enriched.slice(0, 6) })
}