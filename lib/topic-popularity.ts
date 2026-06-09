// lib/topic-popularity.ts
// Server-only. Backs cache-aware ranking with two cheap signals:
//   1. which topics are already cached (demo_cache) — these are instant + ~free
//   2. how popular each topic is (topic_popularity.hit_count) — real demand
//
// Both are read through a 60s in-process snapshot, so a burst of keystrokes against
// /api/topics/suggest triggers at most one DB refresh per window rather than one per
// request. Writes (logTopicDemand) are fire-and-forget and never block generation.

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null
function svc(): SupabaseClient | null {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  return _client
}

interface Snapshot {
  cachedKeys: Set<string>
  popularity: Map<string, number>
  at: number
}

const TTL_MS = 60_000
let _snap: Snapshot | null = null
let _inflight: Promise<Snapshot> | null = null

async function loadSnapshot(): Promise<Snapshot> {
  const empty: Snapshot = { cachedKeys: new Set(), popularity: new Map(), at: Date.now() }
  const client = svc()
  if (!client) return empty
  try {
    const [cacheRes, popRes] = await Promise.all([
      (client.from('demo_cache') as any).select('topic_key'),
      (client.from('topic_popularity') as any).select('topic_key, hit_count'),
    ])
    const cachedKeys = new Set<string>((cacheRes.data ?? []).map((r: any) => r.topic_key))
    const popularity = new Map<string, number>()
    for (const r of popRes.data ?? []) popularity.set(r.topic_key, r.hit_count ?? 0)
    return { cachedKeys, popularity, at: Date.now() }
  } catch (e) {
    console.error('topic snapshot load failed (serving empty):', e)
    return empty
  }
}

/** Returns the current snapshot, refreshing in the background once past TTL. */
export async function getTopicSnapshot(): Promise<Snapshot> {
  if (_snap && Date.now() - _snap.at < TTL_MS) return _snap
  if (!_inflight) {
    _inflight = loadSnapshot().then(s => {
      _snap = s
      _inflight = null
      return s
    })
  }
  // First call (no snapshot yet) awaits; later stale calls also await the refresh.
  return _inflight
}

/**
 * Increment demand for a topic. Fire-and-forget: callers should NOT await this in a
 * hot path. Tries an atomic RPC first, falls back to read-modify-write upsert.
 */
export function logTopicDemand(topicKey: string, display?: string): void {
  const key = topicKey?.trim()
  if (!key) return
  const client = svc()
  if (!client) return
  ;(async () => {
    try {
      const { error } = await (client as any).rpc('increment_topic_hit', {
        p_key: key,
        p_display: display ?? null,
      })
      if (!error) return
      // Fallback if the function isn't installed yet.
      const { data } = await (client.from('topic_popularity') as any)
        .select('hit_count').eq('topic_key', key).maybeSingle()
      const next = (data?.hit_count ?? 0) + 1
      await (client.from('topic_popularity') as any).upsert(
        { topic_key: key, display: display ?? null, hit_count: next, last_seen: new Date().toISOString() },
        { onConflict: 'topic_key' },
      )
    } catch (e) {
      console.error('logTopicDemand failed (non-fatal):', e)
    }
  })()
}