// components/TopicSuggestions.tsx
'use client'
import type { Suggestion } from '@/app/api/topics/suggest/route'

const C = {
  bg2: 'var(--bg2, #111318)', bg3: 'var(--bg3, #1a1c24)', bg4: 'var(--bg4, #22252f)',
  text: 'var(--text, #e8e6df)', text2: 'var(--text2, #9a9790)', text3: 'var(--text3, #5a5856)',
  amber: 'var(--amber, #d4853a)',
  border: 'var(--border, #2a2d37)', border2: 'var(--border2, #343845)',
  sans: 'var(--sans, "DM Sans", sans-serif)', mono: 'var(--mono, "JetBrains Mono", monospace)',
}

interface Props {
  items: Suggestion[]
  activeIndex: number
  onPick: (s: Suggestion) => void
  onHover: (i: number) => void
}

// Renders below an input. The parent owns open/close + keyboard state; this is purely
// visual. Cached topics get a subtle "instant" tag — they generate with no wait and
// no AI cost, which is exactly the behavior we want to steer demand toward.
export default function TopicSuggestions({ items, activeIndex, onPick, onHover }: Props) {
  if (items.length === 0) return null
  return (
    <div
      role="listbox"
      style={{
        position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 30,
        background: C.bg2, border: `1px solid ${C.border2}`, borderRadius: 10,
        overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.45)', fontFamily: C.sans,
      }}
    >
      {items.map((s, i) => {
        const active = i === activeIndex
        return (
          <div
            key={`${s.query}-${i}`}
            role="option"
            aria-selected={active}
            onMouseDown={e => { e.preventDefault(); onPick(s) }}
            onMouseEnter={() => onHover(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
              cursor: 'pointer', background: active ? C.bg4 : 'transparent',
              borderTop: i === 0 ? 'none' : `1px solid ${C.border}`,
            }}
          >
            <span style={{ flex: 1, fontSize: 13.5, color: C.text }}>{s.display}</span>
            {s.cached && (
              <span
                title="Generates instantly"
                style={{
                  fontSize: 8.5, fontFamily: C.mono, textTransform: 'uppercase', letterSpacing: '0.07em',
                  padding: '2px 7px', borderRadius: 4, color: C.amber,
                  background: 'rgba(212,133,58,0.12)', border: '1px solid rgba(212,133,58,0.35)',
                }}
              >
                ⚡ Instant
              </span>
            )}
            {s.slug && !s.cached && (
              <span style={{ fontSize: 8.5, fontFamily: C.mono, color: C.text3, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Topic
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}