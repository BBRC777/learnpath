// hooks/useTopicSuggestions.ts
'use client'
import { useEffect, useRef, useState } from 'react'
import type { Suggestion } from '@/app/api/topics/suggest/route'

/**
 * Debounced topic typeahead. Pass the current input value; get back ranked
 * suggestions. Stale in-flight requests are aborted so results never arrive out of
 * order. Matching is server-side string work — cheap, no model call per keystroke.
 */
export function useTopicSuggestions(query: string, { delay = 220, minLen = 2 } = {}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const q = query.trim()
    if (q.length < minLen) {
      setSuggestions([])
      setLoading(false)
      abortRef.current?.abort()
      return
    }
    const handle = setTimeout(async () => {
      abortRef.current?.abort()
      const ctrl = new AbortController()
      abortRef.current = ctrl
      setLoading(true)
      try {
        const res = await fetch(`/api/topics/suggest?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        if (!res.ok) throw new Error('suggest failed')
        const data = await res.json()
        setSuggestions(Array.isArray(data?.suggestions) ? data.suggestions : [])
      } catch (e: any) {
        if (e?.name !== 'AbortError') setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, delay)
    return () => clearTimeout(handle)
  }, [query, delay, minLen])

  return { suggestions, loading, clear: () => setSuggestions([]) }
}