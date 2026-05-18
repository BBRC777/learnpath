'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  loadFlashcards, saveFlashcards, updateFlashcard, loadCurricula,
  isCardDue, getCardState, sm2CalcNext, intervalLabel, awardXP, updateStreak, logActivity,
  type Flashcard
} from '@/lib/db'
import { useRouter } from 'next/navigation'

type View = 'overview' | 'session' | 'done' | 'generate'

interface Deck {
  curriculumId: string
  curriculumTitle: string
  topic: string
  cards: Flashcard[]
}

export default function FlashcardsScreen() {
  const [userId, setUserId] = useState<string|null>(null)
  const [cards, setCards] = useState<Flashcard[]>([])
  const [curricula, setCurricula] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState<string|null>(null)
  const [view, setView] = useState<View>('overview')
  const [queue, setQueue] = useState<Flashcard[]>([])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState({ again:0, hard:0, good:0, easy:0 })
  const [sessionStart] = useState(Date.now())
  const [filter, setFilter] = useState('all')
  const [activeCurrId, setActiveCurrId] = useState<string|null>(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await createClient().auth.getUser()
        if (!user) return
        setUserId(user.id)
        const [allCards, currs] = await Promise.all([
          loadFlashcards(user.id),
          loadCurricula(user.id),
        ])
        setCards(allCards)
        setCurricula(currs)
        if (currs.length > 0) setActiveCurrId(currs[0].id)
      } catch(e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  // Build decks from curricula + cards
  const decks: Deck[] = curricula.map(c => ({
    curriculumId: c.id,
    curriculumTitle: c.curriculum?.title || c.topic,
    topic: c.topic,
    cards: cards.filter(card => card.curriculum_id === c.id),
  })).filter(d => d.cards.length > 0)

  const totalDue = cards.filter(isCardDue).length
  const totalNew = cards.filter(c => !c.last_reviewed).length
  const totalMature = cards.filter(c => c.interval >= 7).length

  const generateFromCurriculum = async (curr: any) => {
    if (!userId) return
    setGenerating(curr.id)
    try {
      const cache = curr.lesson_cache || {}
      let added = 0
      for (const [lessonKey, lessonData] of Object.entries(cache)) {
        const vocab = (lessonData as any)?.vocab || []
        if (vocab.length > 0) {
          const n = await saveFlashcards(userId, curr.id, lessonKey, vocab)
          added += n
        }
      }
      // Reload cards
      const allCards = await loadFlashcards(userId)
      setCards(allCards)
      if (added === 0) {
        alert('No new vocab found. Complete some lessons first to generate flashcards.')
      }
    } catch(e) { console.error(e) }
    finally { setGenerating(null) }
  }

  const startSession = (deckCards: Flashcard[]) => {
    const due = deckCards.filter(isCardDue)
    if (!due.length) return
    setQueue(due)
    setIdx(0)
    setFlipped(false)
    setResults({ again:0, hard:0, good:0, easy:0 })
    setView('session')
  }

  const startAllDue = () => {
    const due = cards.filter(isCardDue)
    if (!due.length) return
    setQueue(due)
    setIdx(0)
    setFlipped(false)
    setResults({ again:0, hard:0, good:0, easy:0 })
    setView('session')
  }

  const rate = async (rating: number) => {
    const card = queue[idx]
    const next = sm2CalcNext(card, rating)
    const updates = { ...next, last_reviewed: Date.now() }

    // Optimistic update
    setCards(cs => cs.map(c => c.id === card.id ? { ...c, ...updates } : c))
    setQueue(q => q.map((c, i) => i === idx ? { ...c, ...updates } : c))

    // Persist
    try { await updateFlashcard(card.id, updates) } catch(e) { console.error(e) }

    const key = ['', 'again', 'hard', 'good', 'easy'][rating] as keyof typeof results
    setResults(r => ({ ...r, [key]: r[key] + 1 }))

    if (idx + 1 >= queue.length) {
      // Award XP and update streak on session complete
      if (userId) {
        try {
          await Promise.all([
            awardXP('flashcard_session', { userId }),
            updateStreak(userId),
            logActivity(userId, 'flashcard', 10),
          ])
          ;(window as any).__learnpath_refreshProfile?.()
        } catch(e) { console.error(e) }
      }
      setView('done')
      return
    }
    setIdx(i => i + 1)
    setFlipped(false)
  }

  const stateColors: Record<string,string> = { new:'var(--blue-text)', learning:'var(--amber2)', review:'var(--green-text)', overdue:'var(--red-text)' }
  const stateBgs: Record<string,string> = { new:'var(--blue-bg)', learning:'var(--amber-bg)', review:'var(--green-bg)', overdue:'var(--red-bg)' }
  const stateBorders: Record<string,string> = { new:'var(--blue-border)', learning:'var(--amber-bg2)', review:'var(--green-border)', overdue:'var(--red-border)' }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  )

  // ── SESSION DONE ──
  if (view === 'done') {
    const total = results.again + results.hard + results.good + results.easy
    const correct = results.good + results.easy
    const pct = total ? Math.round((correct / total) * 100) : 100
    const mins = Math.max(1, Math.round((Date.now() - sessionStart) / 60000))
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
        <div style={{ maxWidth:480, width:'100%', textAlign:'center' as const, padding:20 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--text)', marginBottom:6 }}>
            {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good session!' : 'Keep practising!'}
          </div>
          <div style={{ fontSize:13.5, color:'var(--text2)', marginBottom:24 }}>
            You reviewed {total} cards in {mins} minute{mins !== 1 ? 's' : ''}. {pct}% accuracy. +15 XP earned!
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:24 }}>
            {[
              { v: correct, l:'Correct', c:'var(--green-text)' },
              { v: results.again, l:'Again', c:'var(--red-text)' },
              { v: mins+'m', l:'Time', c:'var(--amber)' },
            ].map((s,i) => (
              <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:9, padding:'12px 8px', textAlign:'center' as const }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:20, fontWeight:500, color:s.c, marginBottom:2 }}>{s.v}</div>
                <div style={{ fontSize:9.5, color:'var(--text3)' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:9, justifyContent:'center' }}>
            <button onClick={() => setView('overview')} style={{ padding:'11px 22px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Back to Decks</button>
            {totalDue > 0 && (
              <button onClick={startAllDue} style={{ padding:'11px 22px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>
                Review All Due ({totalDue})
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── SESSION ──
  if (view === 'session') {
    const currentCard = queue[idx]
    if (!currentCard) { setView('done'); return null }
    const progress = queue.length ? (idx / queue.length) * 100 : 0
    const deckTitle = curricula.find(c => c.id === currentCard.curriculum_id)?.curriculum?.title || currentCard.curriculum_id
    const rIntervals = [1,2,3,4].map(r => sm2CalcNext(currentCard, r).interval)

    return (
      <div style={{ display:'flex', flexDirection:'column' as const, height:'100%' }}>
        <div style={{ height:2, background:'var(--border)', flexShrink:0 }}>
          <div style={{ height:'100%', background:'var(--amber)', width:progress+'%', transition:'width 0.35s' }}/>
        </div>
        <div style={{ padding:'0 16px', height:40, display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12, color:'var(--text2)' }}>{deckTitle}</span>
            <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{queue.length - idx} remaining</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--red-text)' }}>✗ {results.again}</span>
            <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--green-text)' }}>✓ {results.good + results.easy}</span>
            <button onClick={() => setView('done')} style={{ fontSize:11, padding:'3px 9px', borderRadius:5, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontFamily:'var(--sans)' }}>End</button>
          </div>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'28px 24px 80px', overflowY:'auto' }}>
          <div onClick={() => !flipped && setFlipped(true)} style={{ width:'100%', maxWidth:520, height:260, cursor:flipped?'default':'pointer', marginBottom:20 }}>
            <div style={{ position:'relative' as const, width:'100%', height:'100%' }}>
              {!flipped ? (
                <div style={{ position:'absolute' as const, inset:0, background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:16, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'28px 32px', textAlign:'center' as const }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.12em', textTransform:'uppercase' as const, marginBottom:10 }}>{currentCard.curriculum_id}</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:30, color:'var(--text)', lineHeight:1.15, marginBottom:6 }}>{currentCard.front}</div>
                  {currentCard.reading && <div style={{ fontSize:13, color:'var(--text3)', fontFamily:'var(--mono)', marginBottom:6 }}>{currentCard.reading}</div>}
                  {currentCard.example && <div style={{ fontSize:12, color:'var(--text3)', fontStyle:'italic', lineHeight:1.5 }}>"{currentCard.example}"</div>}
                  <button onClick={e => { e.stopPropagation(); if(window.speechSynthesis){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentCard.front))} }} style={{ marginTop:12, padding:'4px 12px', borderRadius:12, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)', fontSize:11, cursor:'pointer', fontFamily:'var(--sans)' }}>Hear it</button>
                </div>
              ) : (
                <div style={{ position:'absolute' as const, inset:0, background:'var(--bg3)', border:'1px solid rgba(212,133,58,0.18)', borderRadius:16, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'28px 32px', textAlign:'center' as const }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.12em', textTransform:'uppercase' as const, marginBottom:10 }}>Answer</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--amber2)', marginBottom:8 }}>{currentCard.back}</div>
                  {currentCard.example && <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, maxWidth:380 }}>{currentCard.example}</div>}
                  <button onClick={e => { e.stopPropagation(); if(window.speechSynthesis){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentCard.back))} }} style={{ marginTop:10, padding:'4px 12px', borderRadius:12, border:'1px solid var(--border2)', background:'var(--bg4)', color:'var(--text3)', fontSize:11, cursor:'pointer', fontFamily:'var(--sans)' }}>Hear answer</button>
                </div>
              )}
            </div>
          </div>
          {!flipped ? (
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', cursor:'pointer' }} onClick={() => setFlipped(true)}>Tap card to reveal</div>
          ) : (
            <div style={{ display:'flex', gap:8, width:'100%', maxWidth:520 }}>
              {[
                { l:'Again', r:1, c:'var(--red-text)',   bg:'var(--red-bg)',   border:'var(--red-border)' },
                { l:'Hard',  r:2, c:'var(--amber2)',     bg:'var(--amber-bg)', border:'var(--amber-bg2)' },
                { l:'Good',  r:3, c:'var(--green-text)', bg:'var(--green-bg)', border:'var(--green-border)' },
                { l:'Easy',  r:4, c:'var(--blue-text)',  bg:'var(--blue-bg)',  border:'var(--blue-border)' },
              ].map(btn => (
                <button key={btn.r} onClick={() => rate(btn.r)} style={{ flex:1, padding:'12px 6px', borderRadius:9, border:`1px solid ${btn.border}`, background:btn.bg, color:btn.c, cursor:'pointer', textAlign:'center' as const }}>
                  <div style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:1 }}>{btn.l}</div>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', opacity:0.7 }}>{intervalLabel(rIntervals[btn.r - 1])}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── OVERVIEW ──
  const activeDeckCards = cards.filter(c => c.curriculum_id === activeCurrId)
  const filteredCards = activeDeckCards.filter(c => {
    if (filter === 'due') return isCardDue(c)
    if (filter === 'new') return !c.last_reviewed
    if (filter === 'mature') return c.interval >= 7
    return true
  })

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:760, margin:'0 auto', padding:'24px 28px 60px' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9, marginBottom:22 }}>
          {[
            { v: totalDue,    l:'Due today',   c: totalDue > 0 ? 'var(--red-text)' : 'var(--green-text)' },
            { v: totalNew,    l:'New cards',   c: 'var(--blue-text)' },
            { v: totalMature, l:'Mature cards', c: 'var(--green-text)' },
            { v: cards.length, l:'Total cards', c: 'var(--amber)' },
          ].map((s,i) => (
            <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'13px 15px' }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:22, fontWeight:500, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Review all due button */}
        {totalDue > 0 && (
          <button onClick={startAllDue} style={{ width:'100%', padding:'11px', borderRadius:9, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer', marginBottom:16 }}>
            Review all {totalDue} due cards
          </button>
        )}

        {/* Decks from curricula */}
        {curricula.length > 0 && (
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:10 }}>Your Decks</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {curricula.map((curr, i) => {
                const deckCards = cards.filter(c => c.curriculum_id === curr.id)
                const due = deckCards.filter(isCardDue).length
                const mature = deckCards.filter(c => c.interval >= 7).length
                const isGen = generating === curr.id
                const COLORS = ['#d4853a','#7aacef','#b090f0','#6abf8a','#ef7a7a','#e8a55a']
                const color = COLORS[i % COLORS.length]
                return (
                  <div key={curr.id} style={{ background:'var(--bg2)', border:`1px solid ${due > 0 ? 'rgba(212,133,58,0.25)' : 'var(--border)'}`, borderRadius:12, padding:'16px 18px', position:'relative' as const, overflow:'hidden' }}>
                    <div style={{ position:'absolute' as const, top:0, left:0, width:3, height:'100%', background:color }}/>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13.5, fontWeight:500, color:'var(--text)', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{curr.curriculum?.title || curr.topic}</div>
                        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>{curr.topic} · {deckCards.length} cards</div>
                      </div>
                      {due > 0
                        ? <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:3, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)', whiteSpace:'nowrap' as const, flexShrink:0, marginLeft:8 }}>{due} due</span>
                        : deckCards.length > 0
                          ? <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:3, background:'var(--green-bg)', border:'1px solid var(--green-border)', color:'var(--green-text)', flexShrink:0, marginLeft:8 }}>Up to date</span>
                          : null
                      }
                    </div>
                    {deckCards.length > 0 && (
                      <div style={{ height:3, background:'var(--bg5)', borderRadius:2, margin:'8px 0 10px' }}>
                        <div style={{ height:'100%', borderRadius:2, background:color, width:(deckCards.length ? Math.round((mature/deckCards.length)*100) : 0)+'%' }}/>
                      </div>
                    )}
                    <div style={{ display:'flex', gap:6 }}>
                      {deckCards.length > 0 && due > 0 && (
                        <button onClick={() => { setActiveCurrId(curr.id); startSession(deckCards) }} style={{ flex:1, padding:'5px 10px', borderRadius:6, background:'var(--amber)', border:'none', color:'#0a0b0f', fontSize:11, fontWeight:500, cursor:'pointer', fontFamily:'var(--sans)' }}>
                          Study {due}
                        </button>
                      )}
                      <button onClick={() => generateFromCurriculum(curr)} disabled={isGen} style={{ flex:1, padding:'5px 10px', borderRadius:6, background:'var(--bg3)', border:'1px solid var(--border2)', color:'var(--text2)', fontSize:11, cursor:isGen?'default':'pointer', fontFamily:'var(--sans)' }}>
                        {isGen ? 'Generating...' : deckCards.length > 0 ? '+ More cards' : '+ Generate cards'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {curricula.length === 0 && (
          <div style={{ textAlign:'center' as const, padding:'60px 0' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text2)', marginBottom:8 }}>No learning paths yet</div>
            <div style={{ fontSize:13, color:'var(--text3)', marginBottom:20 }}>Build a curriculum first, then generate flashcards from your lessons.</div>
            <button onClick={() => router.push('/app/curriculum')} style={{ padding:'10px 22px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Build my first path</button>
          </div>
        )}

        {/* Card list */}
        {activeDeckCards.length > 0 && (
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 16px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <select value={activeCurrId||''} onChange={e => setActiveCurrId(e.target.value)} style={{ background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:5, color:'var(--text)', fontFamily:'var(--sans)', fontSize:11, padding:'3px 7px', outline:'none' }}>
                  {curricula.map(c => <option key={c.id} value={c.id}>{c.curriculum?.title || c.topic}</option>)}
                </select>
                <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{activeDeckCards.length} cards</span>
              </div>
              <div style={{ display:'flex', gap:5 }}>
                {['all','due','new','mature'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding:'3px 9px', borderRadius:4, border:`1px solid ${filter===f?'rgba(212,133,58,0.3)':'var(--border2)'}`, background:filter===f?'var(--amber-bg)':'var(--bg3)', color:filter===f?'var(--amber2)':'var(--text3)', fontSize:10, fontFamily:'var(--mono)', cursor:'pointer' }}>{f}</button>
                ))}
              </div>
            </div>
            {filteredCards.map(card => {
              const state = getCardState(card)
              const daysSince = card.last_reviewed ? Math.floor((Date.now() - card.last_reviewed) / 86400000) : null
              return (
                <div key={card.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ flex:1, fontFamily:'var(--serif)', fontSize:14, color:'var(--text)', fontStyle:'italic' }}>{card.front}</div>
                  <div style={{ flex:1, fontSize:12.5, color:'var(--text2)' }}>{card.back}</div>
                  <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'1px 6px', borderRadius:3, background:stateBgs[state], border:`1px solid ${stateBorders[state]}`, color:stateColors[state], whiteSpace:'nowrap' as const }}>{state}</span>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', width:80, textAlign:'right' as const }}>{daysSince !== null ? `${daysSince}d ago` : 'not seen'}</div>
                </div>
              )
            })}
            {filteredCards.length === 0 && (
              <div style={{ padding:28, textAlign:'center' as const, color:'var(--text3)', fontSize:13 }}>No {filter === 'all' ? '' : filter} cards in this deck.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
