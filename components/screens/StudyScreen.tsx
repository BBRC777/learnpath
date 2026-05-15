'use client'
import { useState, useRef, useEffect } from 'react'

const SESSIONS = [
  { id:'quick',  name:'Quick Review',     desc:'5 flashcards + 3 exercises',                    time:'~10 min' },
  { id:'deep',   name:'Deep Study',       desc:'Lesson extract + flashcards + exercises + quiz', time:'~25 min' },
  { id:'flash',  name:'Flashcard Blitz',  desc:'12 cards, pure spaced repetition',               time:'~8 min'  },
  { id:'quiz',   name:'Quiz Sprint',      desc:'5 exercises + full week quiz',                   time:'~12 min' },
]

const FLASHCARDS = [
  { front:'ichi',      reading:'one',           back:'The number 1',       example:'ichi-ban = number one',      subject:'Japanese' },
  { front:'juu',       reading:'ten',           back:'The number 10',      example:'juu-ichi = eleven',          subject:'Japanese' },
  { front:'hyaku',     reading:'one hundred',   back:'The number 100',     example:'ni-hyaku = 200',             subject:'Japanese' },
  { front:'arigatou',  reading:'thank you',     back:'Expression of thanks', example:'arigatou gozaimasu',       subject:'Japanese' },
  { front:'print()',   reading:'built-in',      back:'Outputs to console', example:'print("Hello") -> Hello',    subject:'Python'   },
  { front:'def',       reading:'keyword',       back:'Defines a function', example:'def greet(name): ...',       subject:'Python'   },
]

const EXERCISES = [
  { type:'Multiple Choice', q:'What does ni-juu go mean?', opts:['Twenty','Fifteen','Twenty-five','Fifty-two'], correct:2, expl:'Ni (2) + juu (10) = 20, plus go (5) = 25.' },
  { type:'Multiple Choice', q:'Which reading of 4 is preferred in modern Japanese?', opts:['shi','yon','equal','yonn'], correct:1, expl:'Yon is preferred — shi sounds like death.' },
  { type:'Fill in Blank',   q:'Complete: hachi-juu ___  (83 in Japanese)', answer:'san', expl:'83 = hachi-juu san. Eighty (8x10) + three.' },
]

const QUIZ = [
  { q:'What is the Sino-Japanese word for 100?', opts:['momo','hyaku','sen','juu-juu'], correct:1, expl:'Hyaku is the Sino-Japanese reading for 100.' },
  { q:'How do you say 47 in Japanese?', opts:['shi-juu nana','yon-juu shichi','yon-juu nana','shichi-juu yon'], correct:2, expl:'Yon-juu nana: yon (4) x 10 = 40, plus nana (7) = 47.' },
  { q:'What does the Python keyword return do?', opts:['Prints a value','Ends program','Sends value from function','Loops back'], correct:2, expl:'return exits the function and passes a value back to the caller.' },
]

const LESSON_TEXT = `Numbers are the backbone of everyday communication in Japanese. Once you memorize ten words, you can construct any number up to 99 using simple arithmetic spoken aloud.

The magic lies in Japanese's elegant modularity. 11 is juu-ichi (ten-one), 20 is ni-juu (two-ten), 47 is yon-juu nana (four-ten-seven). Unlike English's irregular eleven and twelve, Japanese numbers are completely predictable.

Watch out for 4 and 7: each has two readings. Use yon (not shi) and nana (not shichi) in most contexts.`

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(()=>Math.random()-0.5) }

function buildQueue(sessionType: string) {
  const cards = shuffle(FLASHCARDS)
  const exs = shuffle(EXERCISES)
  const quiz = shuffle(QUIZ)
  let fi=0, ei=0, qi=0
  const configs: Record<string,string[]> = {
    quick:  ['flash','flash','flash','flash','flash','ex','ex','ex'],
    deep:   ['lesson','flash','flash','flash','flash','flash','ex','ex','ex','quiz','quiz','quiz'],
    flash:  ['flash','flash','flash','flash','flash','flash','flash','flash','flash','flash','flash','flash'],
    quiz:   ['ex','ex','ex','ex','ex','quiz','quiz','quiz','quiz','quiz'],
  }
  const items = configs[sessionType] || configs.quick
  const queue: any[] = []
  items.forEach(type => {
    if (type==='flash' && fi<cards.length) queue.push({ type:'flash', data:cards[fi++] })
    else if (type==='ex' && ei<exs.length) queue.push({ type:'exercise', data:exs[ei++] })
    else if (type==='quiz' && qi<quiz.length) queue.push({ type:'quiz', data:quiz[qi++] })
    else if (type==='lesson') queue.push({ type:'lesson' })
  })
  const withTransitions: any[] = []
  for (let i=0; i<queue.length; i++) {
    if (i>0 && queue[i].type!==queue[i-1].type) withTransitions.push({ type:'transition', to:queue[i].type })
    withTransitions.push(queue[i])
  }
  return withTransitions
}

export default function StudyScreen() {
  const [phase, setPhase] = useState<'launcher'|'studying'|'done'>('launcher')
  const [sessionType, setSessionType] = useState('deep')
  const [queue, setQueue] = useState<any[]>([])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState<any>(null)
  const [fillVal, setFillVal] = useState('')
  const [score, setScore] = useState({ correct:0, wrong:0, cards:0, xp:0 })
  const [secs, setSecs] = useState(0)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    if (phase==='studying') { timerRef.current = setInterval(()=>setSecs(s=>s+1),1000) }
    else { clearInterval(timerRef.current) }
    return () => clearInterval(timerRef.current)
  }, [phase])

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

  const launch = () => {
    setQueue(buildQueue(sessionType)); setIdx(0); setFlipped(false)
    setAnswered(null); setFillVal(''); setScore({correct:0,wrong:0,cards:0,xp:0})
    setSecs(0); setPhase('studying')
  }

  const advance = (wasCorrect: boolean|null=null) => {
    setScore(s=>({ ...s, correct:wasCorrect===true?s.correct+1:s.correct, wrong:wasCorrect===false?s.wrong+1:s.wrong, xp:s.xp+(wasCorrect===true?10:wasCorrect===false?2:5) }))
    const next = idx+1
    if (next>=queue.length) { setPhase('done'); return }
    setIdx(next); setFlipped(false); setAnswered(null); setFillVal('')
  }

  const rateFlash = (r: number) => { setScore(s=>({...s,cards:s.cards+1,xp:s.xp+(r>=3?8:3)})); advance(r>=3) }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if(e.code==='Space'&&phase==='studying'&&queue[idx]?.type==='flash'&&!flipped){e.preventDefault();setFlipped(true)} }
    window.addEventListener('keydown',handler)
    return ()=>window.removeEventListener('keydown',handler)
  },[phase,idx,queue,flipped])

  const currentItem = queue[idx]
  const totalReal = queue.filter(i=>i.type!=='transition').length
  const doneReal = queue.slice(0,idx).filter(i=>i.type!=='transition').length
  const pct = totalReal ? (doneReal/totalReal)*100 : 0

  const btnPrimary: React.CSSProperties = { padding:'10px 22px', borderRadius:8, background:'var(--amber)', border:'1px solid var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }
  const btnSecondary: React.CSSProperties = { padding:'10px 22px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }

  if (phase==='done') {
    const total = score.correct+score.wrong
    const pct2 = total ? Math.round((score.correct/total)*100) : 100
    const mins = Math.max(1,Math.round(secs/60))
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
        <div style={{ maxWidth:500, width:'100%', textAlign:'center', padding:20 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--text)', marginBottom:6 }}>{pct2>=85?'Outstanding!':pct2>=65?'Good session!':'Keep going!'}</div>
          <div style={{ fontSize:13.5, color:'var(--text2)', marginBottom:24 }}>{pct2}% accuracy · {fmt(secs)} · {score.xp} XP earned</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:24 }}>
            {[{v:score.correct,l:'Correct',c:'var(--green-text)'},{v:score.wrong,l:'Wrong',c:'var(--red-text)'},{v:score.cards,l:'Cards',c:'var(--purple-text)'},{v:score.xp,l:'XP',c:'var(--amber)'}].map((s,i)=>(
              <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:9, padding:'12px 8px', textAlign:'center' }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:20, fontWeight:500, color:s.c, marginBottom:2 }}>{s.v}</div>
                <div style={{ fontSize:9.5, color:'var(--text3)' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 18px', marginBottom:20 }}>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:6 }}>XP Progress</div>
            <div style={{ height:5, background:'var(--bg5)', borderRadius:3, overflow:'hidden' }}>
              <div style={{ height:'100%', borderRadius:3, background:'var(--amber)', width:`${Math.min(100,(score.xp/150)*100)}%`, transition:'width 1s' }}/>
            </div>
            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:6 }}>{score.xp}/150 XP to next level</div>
          </div>
          <div style={{ display:'flex', gap:9, justifyContent:'center' }}>
            <button onClick={()=>setPhase('launcher')} style={btnSecondary}>New Session</button>
            <button onClick={launch} style={btnPrimary}>Replay</button>
          </div>
        </div>
      </div>
    )
  }

  if (phase==='studying') return (
    <div style={{ display:'flex', flexDirection:'column' as const, height:'100%' }}>
      <div style={{ height:2, background:'var(--border)', flexShrink:0 }}>
        <div style={{ height:'100%', background:'linear-gradient(90deg,var(--amber),var(--amber2))', width:pct+'%', transition:'width 0.4s' }}/>
      </div>
      <div style={{ padding:'0 16px', height:42, display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:12, color:'var(--text2)' }}>{SESSIONS.find(s=>s.id===sessionType)?.name}</span>
          <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{doneReal}/{totalReal}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--text3)', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:5, padding:'3px 9px' }}>{fmt(secs)}</span>
          <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--green-text)' }}>✓ {score.correct}</span>
          <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--red-text)' }}>x {score.wrong}</span>
          <button onClick={()=>setPhase('done')} style={{ fontSize:11, padding:'3px 9px', borderRadius:5, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontFamily:'var(--sans)' }}>End</button>
        </div>
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'24px 20px 60px', overflowY:'auto' }}>
        <div style={{ width:'100%', maxWidth:580 }} key={idx}>

          {currentItem?.type==='transition' && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:6 }}>
                {currentItem.to==='flash'?'Flashcard Time':currentItem.to==='exercise'?'Practice Exercises':currentItem.to==='quiz'?'Quick Quiz':'Lesson Extract'}
              </div>
              <div style={{ fontSize:13, color:'var(--text2)', marginBottom:22 }}>
                {currentItem.to==='flash'&&'Test your recall with spaced repetition.'}
                {currentItem.to==='exercise'&&'Apply what you have learned.'}
                {currentItem.to==='quiz'&&'Check your understanding.'}
                {currentItem.to==='lesson'&&'Read a key extract from today lesson.'}
              </div>
              <button style={btnPrimary} onClick={()=>advance()}>Continue</button>
            </div>
          )}

          {currentItem?.type==='lesson' && (
            <>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--blue-text)', background:'var(--blue-bg)', border:'1px solid var(--blue-border)', borderRadius:4, padding:'2px 8px', display:'inline-block', marginBottom:12, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Lesson Extract</div>
              <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'24px 28px', marginBottom:18 }}>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:8 }}>Week 1 · Lesson 3</div>
                <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:14, lineHeight:1.25 }}>The Logic of Japanese Numbers</div>
                <div style={{ fontSize:14.5, color:'var(--text2)', lineHeight:1.9 }}>{LESSON_TEXT.split('\n\n').map((p,i)=><p key={i} style={{ marginBottom:12 }}>{p}</p>)}</div>
              </div>
              <button style={{ ...btnPrimary, width:'100%' }} onClick={()=>advance()}>Got it — continue</button>
            </>
          )}

          {currentItem?.type==='flash' && (
            <>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--purple-text)', background:'var(--purple-bg)', border:'1px solid var(--purple-border)', borderRadius:4, padding:'2px 8px', display:'inline-block', marginBottom:12, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Flashcard</div>
              <div onClick={()=>!flipped&&setFlipped(true)} style={{ width:'100%', height:240, cursor:flipped?'default':'pointer', marginBottom:18, background:flipped?'var(--bg3)':'var(--bg2)', border:`1px solid ${flipped?'rgba(212,133,58,0.18)':'var(--border2)'}`, borderRadius:16, display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'28px 32px', textAlign:'center' }}>
                {!flipped ? (
                  <>
                    <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, marginBottom:10 }}>{currentItem.data.subject}</div>
                    <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--text)', marginBottom:6 }}>{currentItem.data.front}</div>
                    <div style={{ fontSize:13, color:'var(--text3)', fontFamily:'var(--mono)', marginBottom:6 }}>{currentItem.data.reading}</div>
                    <div style={{ fontSize:12, color:'var(--text3)', fontStyle:'italic' }}>"{currentItem.data.example}"</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, marginBottom:10 }}>Answer</div>
                    <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--amber2)', marginBottom:8 }}>{currentItem.data.back}</div>
                    <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6 }}>{currentItem.data.example}</div>
                  </>
                )}
              </div>
              {!flipped ? (
                <div style={{ textAlign:'center', fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', cursor:'pointer' }} onClick={()=>setFlipped(true)}>Tap card or press Space to reveal</div>
              ) : (
                <div style={{ display:'flex', gap:8 }}>
                  {[{l:'Again',r:1,c:'var(--red-text)',bg:'var(--red-bg)',b:'var(--red-border)',sub:'1d'},{l:'Hard',r:2,c:'var(--amber2)',bg:'var(--amber-bg)',b:'var(--amber-bg2)',sub:'2d'},{l:'Good',r:3,c:'var(--green-text)',bg:'var(--green-bg)',b:'var(--green-border)',sub:'4d'},{l:'Easy',r:4,c:'var(--blue-text)',bg:'var(--blue-bg)',b:'var(--blue-border)',sub:'1w'}].map(btn=>(
                    <button key={btn.r} onClick={()=>rateFlash(btn.r)} style={{ flex:1, padding:'12px 6px', borderRadius:9, border:`1px solid ${btn.b}`, background:btn.bg, color:btn.c, cursor:'pointer', textAlign:'center' as const }}>
                      <div style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:1 }}>{btn.l}</div>
                      <div style={{ fontSize:9, fontFamily:'var(--mono)', opacity:0.7 }}>{btn.sub}</div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {(currentItem?.type==='exercise'||currentItem?.type==='quiz') && (() => {
            const ex = currentItem.data
            const isFill = ex.type==='Fill in Blank'
            const typeLabel = currentItem.type==='quiz'?'Quiz':'Exercise'
            const typeColor = currentItem.type==='quiz'?'var(--amber2)':'var(--green-text)'
            const typeBg = currentItem.type==='quiz'?'var(--amber-bg)':'var(--green-bg)'
            const typeBorder = currentItem.type==='quiz'?'var(--amber-bg2)':'var(--green-border)'
            return (
              <>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:typeColor, background:typeBg, border:`1px solid ${typeBorder}`, borderRadius:4, padding:'2px 8px', display:'inline-block', marginBottom:12, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{typeLabel}</div>
                <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'22px 26px', marginBottom:14 }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, marginBottom:8 }}>{ex.type}</div>
                  <div style={{ fontSize:15, fontWeight:500, color:'var(--text)', lineHeight:1.5, marginBottom:14 }}>{ex.q}</div>
                  {isFill ? (
                    <>
                      <input style={{ width:'100%', padding:'10px 13px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text)', fontFamily:'var(--sans)', fontSize:14, outline:'none', marginBottom:8 }}
                        placeholder="Your answer..." value={fillVal} onChange={e=>setFillVal(e.target.value)} disabled={answered!==null}
                        onKeyDown={e=>{if(e.key==='Enter'&&answered===null){const c=fillVal.trim().toLowerCase()===ex.answer.toLowerCase();setAnswered(c?'correct':'wrong')}}}
                      />
                      {answered===null && <button onClick={()=>{const c=fillVal.trim().toLowerCase()===ex.answer.toLowerCase();setAnswered(c?'correct':'wrong')}} style={{ padding:'8px 16px', borderRadius:7, background:'var(--bg4)', border:'1px solid var(--border2)', color:'var(--text2)', fontSize:12, cursor:'pointer', fontFamily:'var(--sans)' }}>Check</button>}
                      {answered!==null && <div style={{ padding:'10px 14px', borderRadius:8, background:answered==='correct'?'var(--green-bg)':'var(--red-bg)', border:`1px solid ${answered==='correct'?'var(--green-border)':'var(--red-border)'}`, color:answered==='correct'?'var(--green-text)':'var(--red-text)', fontSize:13, lineHeight:1.6, marginTop:8 }}>{answered==='correct'?'Correct! ':`Answer: "${ex.answer}". `}{ex.expl}</div>}
                    </>
                  ) : (
                    <>
                      <div style={{ display:'flex', flexDirection:'column' as const, gap:7 }}>
                        {ex.opts.map((opt: string, oi: number)=>{
                          let bg='var(--bg3)',border='1px solid var(--border2)',color='var(--text2)'
                          if(answered!==null){if(oi===ex.correct){bg='var(--green-bg)';border='1px solid var(--green-border)';color='var(--green-text)'}else if(oi===answered){bg='var(--red-bg)';border='1px solid var(--red-border)';color='var(--red-text)'}}
                          return <button key={oi} onClick={()=>{if(answered===null)setAnswered(oi)}} style={{ padding:'11px 14px', borderRadius:9, border, background:bg, color, cursor:'pointer', fontSize:13.5, textAlign:'left' as const, lineHeight:1.4 }}>{opt}</button>
                        })}
                      </div>
                      {answered!==null && <div style={{ padding:'10px 14px', borderRadius:8, background:answered===ex.correct?'var(--green-bg)':'var(--red-bg)', border:`1px solid ${answered===ex.correct?'var(--green-border)':'var(--red-border)'}`, color:answered===ex.correct?'var(--green-text)':'var(--red-text)', fontSize:13, lineHeight:1.6, marginTop:10 }}>{answered===ex.correct?'Correct! ':'Not quite. '}{ex.expl}</div>}
                    </>
                  )}
                </div>
                {answered!==null && <button style={{ ...btnPrimary, width:'100%' }} onClick={()=>advance(isFill?answered==='correct':answered===ex.correct)}>{idx+1>=queue.length?'See results':'Next'}</button>}
              </>
            )
          })()}
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', padding:24 }}>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'32px 36px', width:'100%', maxWidth:520 }}>
        <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:10 }}>Focus Session</div>
        <div style={{ fontFamily:'var(--serif)', fontSize:26, color:'var(--text)', marginBottom:6 }}>Study Mode</div>
        <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.65, marginBottom:24 }}>Mix lessons, flashcards, exercises, and quizzes into one focused session — no switching screens.</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:20 }}>
          {SESSIONS.map(s=>(
            <div key={s.id} onClick={()=>setSessionType(s.id)} style={{ padding:'14px 16px', borderRadius:10, border:`1px solid ${sessionType===s.id?'rgba(212,133,58,0.4)':'var(--border)'}`, background:sessionType===s.id?'var(--amber-bg)':'var(--bg3)', cursor:'pointer', position:'relative' as const }}>
              <div style={{ position:'absolute', top:10, right:10, fontSize:9, fontFamily:'var(--mono)', color:sessionType===s.id?'var(--amber)':'var(--text3)', background:sessionType===s.id?'var(--amber-bg2)':'var(--bg5)', borderRadius:3, padding:'1px 5px' }}>{s.time}</div>
              <div style={{ fontSize:13, fontWeight:500, color:sessionType===s.id?'var(--amber2)':'var(--text)', marginBottom:3 }}>{s.name}</div>
              <div style={{ fontSize:11, color:'var(--text3)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <button style={{ ...btnPrimary, width:'100%', justifyContent:'center', display:'flex', alignItems:'center', gap:8 }} onClick={launch}>
          Start Session
        </button>
        <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', textAlign:'center' as const, marginTop:12 }}>
          Study Mode is a Pro feature · $9.99/mo
        </div>
      </div>
    </div>
  )
}
