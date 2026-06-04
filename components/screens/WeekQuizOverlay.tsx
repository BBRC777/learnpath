'use client'
import { useState } from 'react'

export interface QuizQ {
  q: string
  opts: string[]
  correct: number
  explanation: string
  lessonTitle?: string
}

interface Props {
  title: string
  topic: string
  questions: QuizQ[]
  isFinal: boolean
  passThreshold?: number          // e.g. 70 means 70% to pass; omit for auto-pass
  onSaveResult?: (scorePct: number, passed: boolean) => Promise<void>
  onContinue: () => void
  onSkip: () => void
}

export default function WeekQuizOverlay({ title, topic, questions, isFinal, passThreshold, onSaveResult, onContinue, onSkip }: Props) {
  const [answers, setAnswers]       = useState<Record<number, number>>({})
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState('')

  const answeredCount = Object.keys(answers).length
  const allAnswered   = answeredCount === questions.length

  const handleSubmit = async () => {
    if (!allAnswered) { setError(`Answer all ${questions.length} questions before submitting.`); return }
    const rawScore = questions.filter((q, i) => answers[i] === q.correct).length
    const scorePct = Math.round((rawScore / questions.length) * 100)
    const passed   = passThreshold ? scorePct >= passThreshold : true
    if (onSaveResult) {
      setSubmitting(true)
      try { await onSaveResult(scorePct, passed) } catch { /* show results even if save fails */ }
      setSubmitting(false)
    }
    setSubmitted(true); setError('')
  }

  const score      = questions.filter((q, i) => answers[i] === q.correct).length
  const pct        = Math.round((score / questions.length) * 100)
  const wrongIdxs  = questions.map((q, i) => (answers[i] !== q.correct ? i : -1)).filter(i => i >= 0)

  const grade = pct === 100 ? { label: 'Perfect!', color: '#6abf8a' }
    : pct >= 80  ? { label: 'Great work', color: '#6abf8a' }
    : pct >= 60  ? { label: 'Good effort', color: '#d4853a' }
    : { label: 'Keep studying', color: '#ef7a7a' }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 20px 60px' }}>
      <div style={{ width: '100%', maxWidth: 640, background: 'var(--bg2, #111318)', border: '1px solid var(--border, #2a2d38)', borderRadius: 20, overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid var(--border, #2a2d38)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: 'var(--amber, #d4853a)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
              {isFinal ? 'Final Exam' : 'Pop Quiz'} · {topic}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: 'var(--text, #e8e6df)', lineHeight: 1.2 }}>{title}</div>
            {!submitted && (
              <div style={{ fontSize: 12, color: 'var(--text2, #9a9790)', marginTop: 6 }}>
                {questions.length} questions · {answeredCount}/{questions.length} answered
              </div>
            )}
          </div>
          <button onClick={onSkip} style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid var(--border2, #363a48)', background: 'var(--bg3, #1a1c24)', color: 'var(--text3, #5a5856)', fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>
            Skip →
          </button>
        </div>

        {/* RESULTS PHASE */}
        {submitted ? (
          <div style={{ padding: '28px 28px 32px' }}>
            {/* Score */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, color: grade.color, lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 20, color: 'var(--text2, #9a9790)' }}>/ {questions.length}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: grade.color, marginBottom: 4 }}>{grade.label}</div>
              {passThreshold !== undefined && (
                <div style={{ fontSize: 13, fontWeight: 600, color: pct >= passThreshold ? '#6abf8a' : '#ef7a7a', marginBottom: 4 }}>
                  {pct >= passThreshold ? '✓ Passed' : '✗ Did not pass'} · {passThreshold}% required
                </div>
              )}
              <div style={{ height: 6, background: 'var(--bg4, #22252f)', borderRadius: 3, margin: '12px auto', maxWidth: 200 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: grade.color, borderRadius: 3, transition: 'width 0.6s ease' }} />
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text3, #5a5856)' }}>{pct}% correct</div>
            </div>

            {/* Wrong answers with explanations */}
            {wrongIdxs.length > 0 ? (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text3, #5a5856)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                  Review — {wrongIdxs.length} {wrongIdxs.length === 1 ? 'question' : 'questions'} to revisit
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {wrongIdxs.map(qi => {
                    const q = questions[qi]
                    return (
                      <div key={qi} style={{ background: 'var(--bg3, #1a1c24)', border: '1px solid rgba(239,122,122,0.25)', borderRadius: 12, padding: '18px 20px' }}>
                        <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text3, #5a5856)', marginBottom: 8 }}>
                          {q.lessonTitle && <span style={{ color: 'var(--text3, #5a5856)' }}>{q.lessonTitle} · </span>}Q{qi + 1}
                        </div>
                        <div style={{ fontSize: 14, color: 'var(--text, #e8e6df)', fontWeight: 500, marginBottom: 12, lineHeight: 1.5 }}>{q.q}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                          {q.opts.map((opt, oi) => {
                            const isCorrect  = oi === q.correct
                            const isSelected = oi === answers[qi]
                            if (!isCorrect && !isSelected) return null
                            return (
                              <div key={oi} style={{ padding: '8px 12px', borderRadius: 8, fontSize: 13, border: isCorrect ? '1px solid var(--green-border, rgba(106,191,138,0.4))' : '1px solid rgba(239,122,122,0.4)', background: isCorrect ? 'var(--green-bg, rgba(106,191,138,0.08))' : 'rgba(239,122,122,0.08)', color: isCorrect ? 'var(--green-text, #6abf8a)' : '#ef7a7a', display: 'flex', gap: 8, alignItems: 'center' }}>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, flexShrink: 0 }}>{isCorrect ? '✓ Correct' : '✕ Your answer'}</span>
                                <span>{opt}</span>
                              </div>
                            )
                          })}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text2, #9a9790)', lineHeight: 1.7, padding: '12px 14px', background: 'var(--bg2, #111318)', borderRadius: 8, borderLeft: '2px solid var(--amber, #d4853a)' }}>
                          {q.explanation}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '0 0 28px', fontSize: 14, color: 'var(--text2, #9a9790)' }}>
                You got every question right. 🎉
              </div>
            )}

            <button onClick={onContinue} style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: 'var(--amber, #d4853a)', color: '#0a0b0f', fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              {isFinal ? 'View my certificate →' : 'Continue to next week →'}
            </button>
          </div>
        ) : (

        /* QUIZ PHASE */
          <div style={{ padding: '24px 28px 28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
              {questions.map((q, qi) => (
                <div key={qi} style={{ background: 'var(--bg3, #1a1c24)', border: `1px solid ${answers[qi] !== undefined ? 'rgba(212,133,58,0.3)' : 'var(--border, #2a2d38)'}`, borderRadius: 12, padding: '18px 20px', transition: 'border-color 0.15s' }}>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text3, #5a5856)', marginBottom: 8 }}>
                    Q{qi + 1} {q.lessonTitle ? `· ${q.lessonTitle}` : ''}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text, #e8e6df)', fontWeight: 500, marginBottom: 14, lineHeight: 1.5 }}>{q.q}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {q.opts.map((opt, oi) => {
                      const selected = answers[qi] === oi
                      return (
                        <button key={oi} onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                          style={{ padding: '10px 14px', borderRadius: 8, border: selected ? '1px solid var(--amber, #d4853a)' : '1px solid var(--border2, #363a48)', background: selected ? 'rgba(212,133,58,0.12)' : 'var(--bg2, #111318)', color: selected ? 'var(--amber, #d4853a)' : 'var(--text2, #9a9790)', cursor: 'pointer', fontSize: 13, textAlign: 'left', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.12s', lineHeight: 1.4 }}>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {error && <div style={{ marginBottom: 12, fontSize: 12, color: '#ef7a7a', fontFamily: "'JetBrains Mono', monospace" }}>{error}</div>}

            <button onClick={handleSubmit} disabled={!allAnswered || submitting}
              style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: allAnswered ? 'var(--amber, #d4853a)' : 'var(--bg4, #22252f)', color: allAnswered ? '#0a0b0f' : 'var(--text3, #5a5856)', fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: allAnswered && !submitting ? 'pointer' : 'default', transition: 'all 0.2s' }}>
              {submitting ? 'Saving…' : `Submit quiz (${answeredCount}/${questions.length} answered)`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}