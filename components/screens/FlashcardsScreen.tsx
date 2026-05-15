'use client'
import { useState } from 'react'

const DECKS = [
  { id:'jp1', name:'Japanese · Week 1', subject:'Japanese', color:'#d4853a', totalCards:12 },
  { id:'jp2', name:'Japanese · Week 2', subject:'Japanese', color:'#e8a55a', totalCards:10 },
  { id:'py1', name:'Python · Week 3',   subject:'Python',   color:'#7aacef', totalCards:8 },
]

const ALL_CARDS = [
  { id:'c1',  front:'ichi',       reading:'one',           back:'The number 1',          example:'ichi-ban = number one',      deckId:'jp1', interval:6,  easeFactor:2.3, repetitions:2, lastReviewed: Date.now()-8*86400000 },
  { id:'c2',  front:'ni',         reading:'two',           back:'The number 2',          example:'ni-juu = twenty',            deckId:'jp1', interval:3,  easeFactor:2.5, repetitions:1, lastReviewed: Date.now()-2*86400000 },
  { id:'c3',  front:'san',        reading:'three',         back:'The number 3',          example:'san-gatsu = March',          deckId:'jp1', interval:1,  easeFactor:2.5, repetitions:0, lastReviewed: null },
  { id:'c4',  front:'yon',        reading:'four (safe)',   back:'The number 4',          example:'yon preferred over shi',     deckId:'jp1', interval:10, easeFactor:2.1, repetitions:3, lastReviewed: Date.now()-15*86400000 },
  { id:'c5',  front:'go',         reading:'five',          back:'The number 5',          example:'go-fun = 5 minutes',         deckId:'jp1', interval:2,  easeFactor:2.5, repetitions:1, lastReviewed: Date.now()-1*86400000 },
  { id:'c6',  front:'roku',       reading:'six',           back:'The number 6',          example:'roku-gatsu = June',          deckId:'jp1', interval:1,  easeFactor:2.5, repetitions:0, lastReviewed: null },
  { id:'c7',  front:'nana',       reading:'seven',         back:'The number 7',          example:'nana-ji = 7 o clock',        deckId:'jp1', interval:4,  easeFactor:2.4, repetitions:2, lastReviewed: Date.now()-3*86400000 },
  { id:'c8',  front:'hachi',      reading:'eight',         back:'The number 8',          example:'hachi-ji han = 8:30',        deckId:'jp1', interval:1,  easeFactor:2.5, repetitions:0, lastReviewed: null },
  { id:'c9',  front:'kyuu',       reading:'nine',          back:'The number 9',          example:'kyuu-ji = 9 o clock',        deckId:'jp1', interval:5,  easeFactor:2.2, repetitions:2, lastReviewed: Date.now()-6*86400000 },
  { id:'c10', front:'juu',        reading:'ten',           back:'The number 10',         example:'juu-ichi = eleven',          deckId:'jp1', interval:2,  easeFactor:2.5, repetitions:1, lastReviewed: Date.now()-1*86400000 },
  { id:'c11', front:'hyaku',      reading:'one hundred',   back:'The number 100',        example:'ni-hyaku = 200',             deckId:'jp1', interval:1,  easeFactor:2.5, repetitions:0, lastReviewed: null },
  { id:'c12', front:'sen',        reading:'one thousand',  back:'The number 1000',       example:'is-sen = 1,000',             deckId:'jp1', interval:14, easeFactor:2.0, repetitions:3, lastReviewed: Date.now()-20*86400000 },
  { id:'c13', front:'ohayou',     reading:'good morning',  back:'Morning greeting',      example:'Ohayou gozaimasu (formal)',   deckId:'jp2', interval:1,  easeFactor:2.5, repetitions:0, lastReviewed: null },
  { id:'c14', front:'arigatou',   reading:'thank you',     back:'Expression of thanks',  example:'Arigatou gozaimasu (formal)',deckId:'jp2', interval:4,  easeFactor:2.3, repetitions:2, lastReviewed: Date.now()-4*86400000 },
  { id:'c15', front:'sumimasen',  reading:'excuse me',     back:'Apology / attention',   example:'Use to get attention politely',deckId:'jp2',interval:1, easeFactor:2.5, repetitions:0, lastReviewed: null },
  { id:'c16', front:'print()',    reading:'built-in',      back:'Outputs to console',    example:'print("Hello") outputs Hello', deckId:'py1', interval:5, easeFactor:2.3, repetitions:2, lastReviewed: Date.now()-5*86400000 },
  { id:'c17', front:'def',        reading:'keyword',       back:'Defines a function',    example:'def greet(name): ...',       deckId:'py1', interval:1,  easeFactor:2.5, repetitions:0, lastReviewed: null },
  { id:'c18', front:'return',     reading:'keyword',       back:'Returns value from function', example:'return x + y',         deckId:'py1', interval:2,  easeFactor:2.5, repetitions:1, lastReviewed: Date.now()-1*86400000 },
]

function isDue(card: any) {
  if (!card.lastReviewed) return true
  const daysSince = Math.floor((Date.now() - card.lastReviewed) / 86400000)
  return daysSince >= card.interval
}

function getState(card: any) {
  if (!card.lastReviewed) return 'new'
  if (card.repetitions === 0) return 'learning'
  const daysSince = Math.floor((Date.now() - card.lastReviewed) / 86400000)
  if (daysSince > card.interval) return 'overdue'
  return 'review'
}

function calcNext(card: any, rating: number) {
  let { interval, easeFactor, repetitions } = card
  if (rating===1) return { interval:1, easeFactor:Math.max(1.3,easeFactor-0.2), repetitions:0 }
  if (rating===2) return { interval:Math.max(1,Math.round(interval*1.2)), easeFactor:Math.max(1.3,easeFactor-0.15), repetitions }
  if (rating===3) { const n=repetitions===0?1:repetitions===1?3:Math.round(interval*easeFactor); return { interval:n, easeFactor, repetitions:repetitions+1 } }
  const n=repetitions===0?4:Math.round(interval*easeFactor*1.3)
  return { interval:n, easeFactor:Math.min(2.5,easeFactor+0.15), repetitions:repetitions+1 }
}

function intervalLabel(d: number) { if(d<=1)return'1d'; if(d<7)return`${d}d`; if(d<30)return`${Math.round(d/7)}w`; return`${Math.round(d/30)}mo` }

export default function FlashcardsScreen() {
  const [cards, setCards] = useState(ALL_CARDS)
  const [view, setView] = useState<'overview'|'session'|'done'>('overview')
  const [activeDeck, setActiveDeck] = useState('jp1')
  const [queue, setQueue] = useState<any[]>([])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState({ again:0, hard:0, good:0, easy:0 })
  const [filter, setFilter] = useState('all')
  const startTime = useState(Date.now())[0]

  const dueCount = (deckId: string) => cards.filter(c => c.deckId===deckId && isDue(c)).length
  const totalDue = cards.filter(isDue).length

  const startSession = (deckId: string) => {
    const due = cards.filter(c => c.deckId===deckId && isDue(c))
    if (!due.length) return
    setActiveDeck(deckId); setQueue(due); setIdx(0); setFlipped(false)
    setResults({ again:0, hard:0, good:0, easy:0 }); setView('session')
  }

  const rate = (rating: number) => {
    const card = queue[idx]
    const next = calcNext(card, rating)
    setCards(cs => cs.map(c => c.id===card.id ? { ...c, ...next, lastReviewed:Date.now() } : c))
    const key = ['','again','hard','good','easy'][rating] as keyof typeof results
    setResults(r => ({ ...r, [key]: r[key]+1 }))
    if (idx+1 >= queue.length) { setView('done'); return }
    setIdx(i=>i+1); setFlipped(false)
  }

  const currentCard = queue[idx]
  const progress = queue.length ? (idx/queue.length)*100 : 0

  const stateColors: Record<string,string> = { new:'var(--blue-text)', learning:'var(--amber2)', review:'var(--green-text)', overdue:'var(--red-text)' }
  const stateBgs: Record<string,string> = { new:'var(--blue-bg)', learning:'var(--amber-bg)', review:'var(--green-bg)', overdue:'var(--red-bg)' }
  const stateBorders: Record<string,string> = { new:'var(--blue-border)', learning:'var(--amber-bg2)', review:'var(--green-border)', overdue:'var(--red-border)' }

  if (view==='done') {
    const total = results.again+results.hard+results.good+results.easy
    const correct = results.good+results.easy
    const pct = total ? Math.round((correct/total)*100) : 100
    const mins = Math.max(1, Math.round((Date.now()-startTime)/60000))
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
        <div style={{ maxWidth:480, width:'100%', textAlign:'center', padding:20 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--text)', marginBottom:6 }}>{pct>=80?'Excellent!':pct>=60?'Good session!':'Keep practising!'}</div>
          <div style={{ fontSize:13.5, color:'var(--text2)', marginBottom:24 }}>You reviewed {total} cards in {mins} minute{mins!==1?'s':''}. {pct}% accuracy.</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:24 }}>
            {[{ v:correct, l:'Correct', c:'var(--green-text)' },{ v:results.again, l:'Again', c:'var(--red-text)' },{ v:mins+'m', l:'Time', c:'var(--amber)' }].map((s,i)=>(
              <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:9, padding:'12px 8px', textAlign:'center' }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:20, fontWeight:500, color:s.c, marginBottom:2 }}>{s.v}</div>
                <div style={{ fontSize:9.5, color:'var(--text3)' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:9, justifyContent:'center' }}>
            <button onClick={()=>setView('overview')} style={{ padding:'11px 22px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Back to Decks</button>
            {totalDue>0 && <button onClick={()=>{ const due=cards.filter(isDue); setQueue(due); setIdx(0); setFlipped(false); setResults({again:0,hard:0,good:0,easy:0}); setView('session') }} style={{ padding:'11px 22px', borderRadius:8, background:'var(--amber)', border:'1px solid var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Review All Due</button>}
          </div>
        </div>
      </div>
    )
  }

  if (view==='session' && currentCard) {
    const deck = DECKS.find(d => d.id===currentCard.deckId)
    const rIntervals = [1,2,3,4].map(r => calcNext(currentCard,r).interval)
    return (
      <div style={{ display:'flex', flexDirection:'column' as const, height:'100%' }}>
        <div style={{ height:2, background:'var(--border)', flexShrink:0 }}>
          <div style={{ height:'100%', background:'var(--amber)', width:progress+'%', transition:'width 0.35s' }}/>
        </div>
        <div style={{ padding:'0 16px', height:40, display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12, color:'var(--text2)' }}>{deck?.name}</span>
            <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{queue.length-idx} remaining</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--red-text)' }}>x {results.again}</span>
            <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--green-text)' }}>✓ {results.good+results.easy}</span>
            <button onClick={()=>setView('done')} style={{ fontSize:11, padding:'3px 9px', borderRadius:5, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontFamily:'var(--sans)' }}>End</button>
          </div>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'28px 24px 80px', overflowY:'auto' }}>
          <div onClick={()=>!flipped&&setFlipped(true)} style={{ width:'100%', maxWidth:520, height:260, cursor:flipped?'default':'pointer', marginBottom:20, perspective:1200 }}>
            <div style={{ position:'relative', width:'100%', height:'100%' }}>
              {!flipped ? (
                <div style={{ position:'absolute', inset:0, background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:16, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'28px 32px', textAlign:'center' }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.12em', textTransform:'uppercase' as const, marginBottom:10 }}>{deck?.subject}</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:30, color:'var(--text)', lineHeight:1.15, marginBottom:6 }}>{currentCard.front}</div>
                  <div style={{ fontSize:13, color:'var(--text3)', fontFamily:'var(--mono)', marginBottom:6 }}>{currentCard.reading}</div>
                  <div style={{ fontSize:12, color:'var(--text3)', fontStyle:'italic', lineHeight:1.5 }}>"{currentCard.example}"</div>
                  <button onClick={e=>{e.stopPropagation();if(window.speechSynthesis){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentCard.front))}}} style={{ marginTop:12, padding:'4px 12px', borderRadius:12, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)', fontSize:11, cursor:'pointer', fontFamily:'var(--sans)' }}>Hear it</button>
                </div>
              ) : (
                <div style={{ position:'absolute', inset:0, background:'var(--bg3)', border:'1px solid rgba(212,133,58,0.18)', borderRadius:16, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'28px 32px', textAlign:'center' }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.12em', textTransform:'uppercase' as const, marginBottom:10 }}>Answer</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--amber2)', marginBottom:8 }}>{currentCard.back}</div>
                  <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, maxWidth:380 }}>{currentCard.example}</div>
                  <button onClick={e=>{e.stopPropagation();if(window.speechSynthesis){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentCard.back))}}} style={{ marginTop:10, padding:'4px 12px', borderRadius:12, border:'1px solid var(--border2)', background:'var(--bg4)', color:'var(--text3)', fontSize:11, cursor:'pointer', fontFamily:'var(--sans)' }}>Hear answer</button>
                </div>
              )}
            </div>
          </div>

          {!flipped ? (
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', cursor:'pointer' }} onClick={()=>setFlipped(true)}>Tap card to reveal</div>
          ) : (
            <div style={{ display:'flex', gap:8, width:'100%', maxWidth:520 }}>
              {[{l:'Again',r:1,c:'var(--red-text)',bg:'var(--red-bg)',border:'var(--red-border)'},{l:'Hard',r:2,c:'var(--amber2)',bg:'var(--amber-bg)',border:'var(--amber-bg2)'},{l:'Good',r:3,c:'var(--green-text)',bg:'var(--green-bg)',border:'var(--green-border)'},{l:'Easy',r:4,c:'var(--blue-text)',bg:'var(--blue-bg)',border:'var(--blue-border)'}].map(btn=>(
                <button key={btn.r} onClick={()=>rate(btn.r)} style={{ flex:1, padding:'12px 6px', borderRadius:9, border:`1px solid ${btn.border}`, background:btn.bg, color:btn.c, cursor:'pointer', textAlign:'center' as const }}>
                  <div style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:1 }}>{btn.l}</div>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', opacity:0.7 }}>{intervalLabel(rIntervals[btn.r-1])}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const selectedDeck = activeDeck
  const filteredCards = cards.filter(c => {
    if (c.deckId !== selectedDeck) return false
    if (filter==='due') return isDue(c)
    if (filter==='new') return !c.lastReviewed
    if (filter==='mature') return c.interval >= 7
    return true
  })

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:760, margin:'0 auto', padding:'24px 28px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9, marginBottom:22 }}>
          {[
            { v:totalDue, l:'Due today', c:totalDue>0?'var(--red-text)':'var(--green-text)' },
            { v:cards.filter(c=>!c.lastReviewed).length, l:'New cards', c:'var(--blue-text)' },
            { v:cards.filter(c=>c.interval>=7).length, l:'Mature cards', c:'var(--green-text)' },
            { v:cards.length, l:'Total cards', c:'var(--amber)' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'13px 15px' }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:22, fontWeight:500, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:22 }}>
          {DECKS.map(deck => {
            const due = dueCount(deck.id)
            const deckCards = cards.filter(c=>c.deckId===deck.id)
            const mature = deckCards.filter(c=>c.interval>=7).length
            const pct = deck.totalCards ? Math.round((mature/deck.totalCards)*100) : 0
            return (
              <div key={deck.id} onClick={()=>setActiveDeck(deck.id)} style={{ background:'var(--bg2)', border:`1px solid ${due>0?'rgba(212,133,58,0.25)':'var(--border)'}`, borderRadius:12, padding:'16px 18px', cursor:'pointer', position:'relative' as const, overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%', background:deck.color }}/>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:500, color:'var(--text)', lineHeight:1.3 }}>{deck.name}</div>
                    <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>{deck.subject} · {deck.totalCards} cards</div>
                  </div>
                  {due>0 ? <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:3, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)', whiteSpace:'nowrap' as const }}>{due} due</span>
                  : <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:3, background:'var(--green-bg)', border:'1px solid var(--green-border)', color:'var(--green-text)' }}>Up to date</span>}
                </div>
                <div style={{ height:3, background:'var(--bg5)', borderRadius:2, margin:'8px 0 6px' }}>
                  <div style={{ height:'100%', borderRadius:2, background:deck.color, width:pct+'%' }}/>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{mature}/{deck.totalCards} mature · {pct}%</div>
                  <button onClick={e=>{e.stopPropagation();if(due>0)startSession(deck.id)}} style={{ padding:'4px 11px', borderRadius:5, background:due>0?'var(--amber)':'var(--bg4)', border:due>0?'none':'1px solid var(--border2)', color:due>0?'#0a0b0f':'var(--text3)', fontSize:11, fontWeight:500, cursor:due>0?'pointer':'default', fontFamily:'var(--sans)' }}>
                    {due>0?`Study ${due}`:'All done'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 16px', borderBottom:'1px solid var(--border)' }}>
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{DECKS.find(d=>d.id===selectedDeck)?.name}</div>
            <div style={{ display:'flex', gap:5 }}>
              {['all','due','new','mature'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} style={{ padding:'3px 9px', borderRadius:4, border:`1px solid ${filter===f?'rgba(212,133,58,0.3)':'var(--border2)'}`, background:filter===f?'var(--amber-bg)':'var(--bg3)', color:filter===f?'var(--amber2)':'var(--text3)', fontSize:10, fontFamily:'var(--mono)', cursor:'pointer' }}>{f}</button>
              ))}
            </div>
          </div>
          {filteredCards.map(card => {
            const state = getState(card)
            const daysSince = card.lastReviewed ? Math.floor((Date.now()-card.lastReviewed)/86400000) : null
            return (
              <div key={card.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px', borderBottom:'1px solid var(--border)' }}>
                <div style={{ flex:1, fontFamily:'var(--serif)', fontSize:14, color:'var(--text)', fontStyle:'italic' }}>{card.front}</div>
                <div style={{ flex:1, fontSize:12.5, color:'var(--text2)' }}>{card.back}</div>
                <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'1px 6px', borderRadius:3, background:stateBgs[state], border:`1px solid ${stateBorders[state]}`, color:stateColors[state], whiteSpace:'nowrap' as const }}>{state}</span>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', width:80, textAlign:'right' as const }}>{daysSince!==null?`${daysSince}d ago`:'not seen'}</div>
              </div>
            )
          })}
          {filteredCards.length===0 && <div style={{ padding:28, textAlign:'center' as const, color:'var(--text3)', fontSize:13 }}>No {filter==='all'?'':filter} cards in this deck.</div>}
        </div>
      </div>
    </div>
  )
}
