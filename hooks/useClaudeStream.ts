'use client'
// hooks/useClaudeStream.ts
// Streams from /api/claude — API key stays server-side
import { useState, useRef } from 'react'

interface StreamOptions {
  type?: 'curriculum' | 'lesson' | 'tutor'
  system?: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  onChunk?: (text: string) => void
  onDone?: (fullText: string) => void
  onError?: (error: string) => void
}

export function useClaudeStream() {
  const [streaming, setStreaming]   = useState(false)
  const [streamText, setStreamText] = useState('')
  const abortRef = useRef<AbortController | null>(null)

  const stream = async (opts: StreamOptions) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setStreaming(true)
    setStreamText('')
    let full = ''

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...opts, stream: true }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              full += parsed.text
              setStreamText(full)
              opts.onChunk?.(parsed.text)
            }
          } catch { /* partial JSON — skip */ }
        }
      }

      opts.onDone?.(full)
    } catch (e: unknown) {
      const err = e as Error
      if (err.name !== 'AbortError') {
        opts.onError?.(err.message)
      }
    } finally {
      setStreaming(false)
    }
  }

  const abort = () => {
    abortRef.current?.abort()
    setStreaming(false)
  }

  return { stream, abort, streaming, streamText }
}
