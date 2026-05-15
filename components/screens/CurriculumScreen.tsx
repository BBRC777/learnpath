'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveCurriculum, loadCurricula } from '@/lib/db'
import { useRouter } from 'next/navigation'

const TOPICS = ['Spanish','Japanese','Python','Guitar','Drawing','Calculus','Photography','Chess','Public Speaking','Investing Basics','Creative Writing','Music Theory']
const LEVEL_OPTS = ['Complete Beginner','Beginner','Intermediate','Advanced']
const DUR_OPTS = [{ label:'2 Weeks', weeks:2 },{ label:'4 Weeks', weeks:4 },{ label:'6 Weeks', weeks:6 },{ label:'8 Weeks', weeks:8 },{ label:'12 Weeks', weeks:12 }]
const TIME_OPTS = ['15 min','20 min','30 min','45 min','60 min']
const DAY_LABELS = ['M','T','W','T','F','S','S']
const STYLE_OPTS = [
  { v:'visual',       label:'Visual',       desc:'Images, diagrams, examples' },
  { v:'structured',   label:'Structured',   desc:'Lists, frameworks, steps' },
  { v:'storytelling', label:'Story-driven', desc:'Narrative and context' },
  { v:'practical',    label:'Hands-on',     desc:'Exercises and doing' },
  { v:'mixed',        label:'Mixed',        desc:'Variety each session' },
]

const TYPE_COLORS: Record<string,string> = { lesson:'var(--blue-text)', flashcards:'var(--purple-text)', exercise:'var(--green-text)', review:'var(--amber2)', practice:'var(--green-text)' }
const TYPE_BGS: Record<string,string>    = { lesson:'var(--blue-bg)',   flashcards:'var(--purple-bg)',   exercise:'var(--green-bg)',   review:'var(--amber-bg)',  practice:'var(--green-bg)' }

function StepProgress({ step }: { step: number }) {
  const steps = ['Topic','Schedule','Style','Review']
  return (
    <div style={{ display:'flex', alignItems:'center', marginBottom:36 }}>
      {steps.map((s,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', flex: i<steps.length-1?1:undefined }}>
          <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'center' }}>
            <div style={{ width:28, height:28, borderRadius:'50%', border:`1px solid ${step>i?'var(--green-border)':step===i?'var(--amber)':'var(--border2)'}`, background:step>i?'var(--green-bg)':step===i?'var(--amber-bg2)':'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontFamily:'var(--mono)', color:step>i?'var(--green-text)':step===i?'var(--amber)':'var(--text3)' }}>
              {step>i?'✓':i+1}
            </div>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', color:step===i?'var(--amber)':'var(--text3)', marginTop:4, whiteSpace:'nowrap' as const }}>{s}</div>
          </div>
          {i<steps.length-1 && <div style={{ flex:1, height:1, background:step>i?'var(--green-border)':'var(--border2)', margin:'0 4px', marginBottom:14 }}/>}
        </div>
      ))}
    </div>
  )
}

export default function CurriculumScreen() {
  const [step, setStep] = useState(0)
  const [topic, setTopic] = useState('')
  const [goal, setGoal] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [duration, setDuration] = useState(DUR_OPTS[1])
  const [sessionTime, setSessionTime] = useState('30 min')
  const [activeDays, setActiveDays] = useState([0,1,2,3,4])
  const [styles, setStyles] = useState(['mixed'])
  const [extra, setExtra] = useState('')
  const [generating, setGenerating] = useState(false)
  const [streamText, setStreamText] = useState('')
  const [curriculum, setCurriculum] = useState<any>(null)
  const [savedId, setSavedId] = useState<string|null>(null)
  const [error, setError] = useState('')
  const [openWeeks, setOpenWeeks] = useState<Record<number,boolean>>({ 0:true })
  const [userId, setUserId] = useState<string|null>(null)
  const [saving, setSaving] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<number|null>(null)
  const [selectedDay, setSelectedDay] = useState<number|null>(null)
  const router = useRouter()

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
    })
  }, [])

  const toggleDay = (i: number) => setActiveDays(d => d.includes(i)?d.filter(x=>x!==i):[...d,i].sort())
  const toggleStyle = (v: string) => setStyles(s => s.includes(v)?(s.length>1?s.filter(x=>x!==v):s):[...s,v])
  const daysLabel = activeDays.map(i => DAY_LABELS[i]).join(', ')
  const totalLessons = duration.weeks * activeDays.length

  const inp: React.CSSProperties = { width:'100%', padding:'10px 13px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text)', fontFamily:'var(--sans)', fontSize:14, outline:'none' }
  const lbl: React.CSSProperties = { display:'block', fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase' as const, letterSpacing:'0.1em', color:'var(--text3)', marginBottom:6 }
  const nextBtn: React.CSSProperties = { padding:'10px 24px', borderRadius:8, border:'none', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }
  const backBtn: React.CSSProperties = { padding:'10px 20px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }

  const generate = async () => {
    if (!topic.trim()) { setError('Enter a topic first'); return }
    setError('')
    setGenerating(true)
    setStreamText('')
    setCurriculum(null)
    setSavedId(null)

    const prompt = `Create a personalised learning curriculum as a single valid JSON object. No markdown. No explanation.

Topic: "${topic}"
Goal: "${goal || 'Build solid proficiency'}"
Level: ${level}
Duration: ${duration.weeks} weeks
Days per week: ${activeDays.length} (${daysLabel})
Session length: ${sessionTime}
Learning style: ${styles.join(', ')}
${extra ? `Special requests: ${extra}` : ''}

Return ONLY valid JSON:
{
  "title": "Engaging curriculum title",
  "subtitle": "One-line subtitle",
  "overview": "2-3 sentence overview of what the learner will achieve.",
  "totalWeeks": ${duration.weeks},
  "daysPerWeek": ${activeDays.length},
  "sessionTime": "${sessionTime}",
  "level": "${level}",
  "weeks": [
    {
      "week": 1,
      "theme": "Week theme title",
      "milestone": "By end of this week you can...",
      "days": [
        { "day": 1, "title": "Day activity title", "description": "One sentence describing what to do.", "type": "lesson", "duration": "${sessionTime}" }
      ],
      "quizCount": 3
    }
  ]
}

Rules: Exactly ${duration.weeks} weeks, exactly ${activeDays.length} days each. Vary types: lesson, flashcards, exercise, review, practice. Build progressively week over week.`

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type:'curriculum', stream:true, messages:[{ role:'user', content:prompt }] })
      })
      if (!res.ok) { const e = await res.json(); throw new Error(e.error||'API error') }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try { const p = JSON.parse(data); if(p.text){ full+=p.text; setStreamText(full.slice(-400)) } } catch {}
        }
      }
      const match = full.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Could not parse curriculum')
      const parsed = JSON.parse(match[0])
      setCurriculum(parsed)
      setOpenWeeks({ 0:true })
      if (userId) {
        setSaving(true)
        try {
          const saved = await saveCurriculum(userId, { topic, level, durLabel:duration.label, days:activeDays.length, time:sessionTime, style:styles.join(', '), curriculum:parsed })
          setSavedId(saved.id)
        } catch(e: any) { console.error('Save failed:', e.message) }
        finally { setSaving(false) }
      }
    } catch(e: any) { setError(e.message) }
    finally { setGenerating(false); setStreamText('') }
  }

  // ── GENERATING SCREEN ──────────────────────────────────────
  if (generating) return (
    <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', height:'100%', padding:32, textAlign:'center' }}>
      <div style={{ width:40, height:40, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 24px' }}/>
      <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:8 }}>Claude is designing your path</div>
      <div style={{ fontSize:13, color:'var(--text2)', marginBottom:24 }}>Building a {duration.weeks}-week curriculum for {topic}</div>
      {streamText && <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'12px 14px', fontFamily:'var(--mono)', fontSize:10.5, color:'var(--text3)', lineHeight:1.6, maxHeight:120, overflow:'hidden', maxWidth:440, width:'100%', textAlign:'left' as const }}>{streamText}</div>}
    </div>
  )

  // ── RESULT SCREEN ──────────────────────────────────────────
  if (curriculum) return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:740, margin:'0 auto', padding:'28px 32px 80px' }}>

        {/* Hero */}
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'24px 26px', marginBottom:20 }}>
          <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:6 }}>{level} · {duration.label} Path</div>
          <div style={{ fontFamily:'var(--serif)', fontSize:26, color:'var(--text)', marginBottom:6, lineHeight:1.2 }}>{curriculum.title}</div>
          <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.65, marginBottom:16 }}>{curriculum.overview}</div>
          <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6, marginBottom: savedId ? 12 : 0 }}>
            {[`${curriculum.totalWeeks} weeks`, `${curriculum.daysPerWeek} days/week`, sessionTime+'/session', `${totalLessons} total sessions`].map((chip,i) => (
              <span key={i} style={{ fontSize:10, fontFamily:'var(--mono)', padding:'3px 9px', borderRadius:4, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)' }}>{chip}</span>
            ))}
            <span style={{ fontSize:10, fontFamily:'var(--mono)', padding:'3px 9px', borderRadius:4, border:'1px solid rgba(212,133,58,0.3)', background:'var(--amber-bg)', color:'var(--amber2)' }}>Generated by Claude</span>
          </div>
          {saving && <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:8 }}>Saving to your account...</div>}
          {savedId && <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--green-text)', marginTop:8 }}>Saved to your account</div>}
        </div>

        {/* Fix #2 — Action buttons: Start Learning (left) + Go to Home (right) */}
        <div style={{ display:'flex', gap:10, marginBottom:24 }}>
          <button onClick={() => router.push('/app/lesson')} style={{ flex:2, padding:13, borderRadius:10, border:'1px solid var(--amber)', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>
            Start Learning
          </button>
          <button onClick={() => router.push('/app')} style={{ flex:1, padding:13, borderRadius:10, border:'1px solid var(--border)', background:'var(--bg2)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>
            Go to Home
          </button>
          <button onClick={() => { setCurriculum(null); setSavedId(null); setStep(0) }} style={{ flex:1, padding:13, borderRadius:10, border:'1px solid var(--border)', background:'var(--bg2)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>
            Build Another
          </button>
        </div>

        {/* Fix #3 — Selected lesson info */}
        {selectedWeek !== null && selectedDay !== null && (() => {
          const wk = curriculum.weeks[selectedWeek]
          const d = wk?.days[selectedDay]
          if (!d) return null
          return (
            <div style={{ background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.3)', borderRadius:10, padding:'14px 18px', marginBottom:16, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:4 }}>Selected · Week {selectedWeek+1}, Day {selectedDay+1}</div>
                <div style={{ fontSize:14, fontWeight:500, color:'var(--text)' }}>{d.title}</div>
                <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>{d.description}</div>
              </div>
              <button onClick={() => router.push('/app/lesson')} style={{ padding:'9px 18px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap' as const }}>
                Start this lesson
              </button>
            </div>
          )
        })()}

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>
            {(curriculum.weeks||[]).length} Weeks · Click any lesson to start
          </div>
          <button onClick={() => { const all: Record<number,boolean>={}; (curriculum.weeks||[]).forEach((_:any,i:number)=>all[i]=true); setOpenWeeks(all) }} style={{ fontSize:11, padding:'4px 10px', borderRadius:5, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontFamily:'var(--sans)' }}>Expand All</button>
        </div>

        <div style={{ display:'flex', flexDirection:'column' as const, gap:10 }}>
          {(curriculum.weeks||[]).map((wk: any, wi: number) => (
            <div key={wi} style={{ background:'var(--bg2)', border:`1px solid ${wi===0?'rgba(212,133,58,0.4)':'var(--border)'}`, borderRadius:12, overflow:'hidden' }}>
              <div onClick={() => setOpenWeeks(w=>({...w,[wi]:!w[wi]}))} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', cursor:'pointer' }}>
                <div style={{ width:32, height:32, borderRadius:8, background:wi===0?'var(--amber-bg)':'var(--bg4)', border:`1px solid ${wi===0?'rgba(212,133,58,0.4)':'var(--border2)'}`, fontFamily:'var(--mono)', fontSize:11, color:wi===0?'var(--amber)':'var(--text3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>W{wi+1}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13.5, fontWeight:500, color:'var(--text)' }}>{wk.theme}</div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>Week {wi+1} · {(wk.days||[]).length} sessions</div>
                </div>
                <div style={{ fontSize:12, color:'var(--text3)', transform:openWeeks[wi]?'rotate(180deg)':'none', transition:'transform 0.2s' }}>v</div>
              </div>
              {openWeeks[wi] && (
                <>
                  {wk.milestone && (
                    <div style={{ padding:'10px 16px', background:'var(--amber-bg)', borderBottom:'1px solid rgba(212,133,58,0.15)' }}>
                      <span style={{ fontSize:11.5, color:'var(--amber2)', lineHeight:1.4 }}><strong>Goal:</strong> {wk.milestone}</span>
                    </div>
                  )}
                  <div style={{ borderTop:'1px solid var(--border)', padding:'12px 14px' }}>
                    <div style={{ display:'flex', flexDirection:'column' as const, gap:7 }}>
                      {(wk.days||[]).map((d: any, di: number) => {
                        const isSelected = selectedWeek===wi && selectedDay===di
                        return (
                          <div key={di}
                            onClick={() => { setSelectedWeek(wi); setSelectedDay(di) }}
                            style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 12px', background:isSelected?'var(--amber-bg)':'var(--bg3)', border:`1px solid ${isSelected?'rgba(212,133,58,0.4)':'var(--border)'}`, borderRadius:8, cursor:'pointer', transition:'all 0.13s' }}>
                            <div style={{ width:22, height:22, borderRadius:5, background:isSelected?'var(--amber-bg2)':'var(--bg4)', border:`1px solid ${isSelected?'rgba(212,133,58,0.4)':'var(--border2)'}`, fontFamily:'var(--mono)', fontSize:9, color:isSelected?'var(--amber)':'var(--text3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>D{di+1}</div>
                            <div style={{ flex:1 }}>
                              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                                <span style={{ fontSize:8.5, fontFamily:'var(--mono)', padding:'1px 6px', borderRadius:3, textTransform:'uppercase' as const, letterSpacing:'0.06em', background:TYPE_BGS[d.type]||'var(--blue-bg)', color:TYPE_COLORS[d.type]||'var(--blue-text)', border:`1px solid ${TYPE_COLORS[d.type]||'var(--blue-text)'}44` }}>{d.type||'lesson'}</span>
                                <span style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginLeft:'auto' }}>{d.duration}</span>
                              </div>
                              <div style={{ fontSize:12.5, fontWeight:500, color:isSelected?'var(--amber2)':'var(--text)', marginBottom:2 }}>{d.title}</div>
                              <div style={{ fontSize:11.5, color:'var(--text2)', lineHeight:1.5 }}>{d.description}</div>
                            </div>
                            {isSelected && <div style={{ fontSize:11, color:'var(--amber)', fontFamily:'var(--mono)', flexShrink:0, marginTop:2 }}>selected</div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ── INTAKE FORM ────────────────────────────────────────────
  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:680, margin:'0 auto', padding:'32px 32px 80px' }}>
        <StepProgress step={step}/>

        {step===0 && (
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>What do you want to learn?</div>
            <div style={{ fontSize:12.5, color:'var(--text3)', marginBottom:20 }}>Be specific — the more detail you give, the better Claude can tailor your curriculum.</div>
            <div style={{ marginBottom:14 }}>
              <label style={lbl}>Topic or Subject</label>
              <input style={inp} placeholder="e.g. Japanese for travellers, Python data science..." value={topic} onChange={e=>setTopic(e.target.value)} autoFocus/>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6, marginTop:10 }}>
                {TOPICS.map(t => <div key={t} onClick={()=>setTopic(t)} style={{ padding:'4px 11px', borderRadius:14, fontSize:11.5, border:'1px solid var(--border)', background:'var(--bg3)', color:'var(--text3)', cursor:'pointer', fontFamily:'var(--mono)' }}>{t}</div>)}
              </div>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={lbl}>Your Goal (optional but powerful)</label>
              <textarea style={{ ...inp, minHeight:56, resize:'vertical' as const, lineHeight:1.6 }} placeholder="e.g. Hold a basic conversation before my trip to Japan in August..." value={goal} onChange={e=>setGoal(e.target.value)}/>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={lbl}>Your Current Level</label>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:7 }}>
                {LEVEL_OPTS.map(l => <div key={l} onClick={()=>setLevel(l)} style={{ padding:'7px 13px', borderRadius:20, border:`1px solid ${level===l?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:level===l?'var(--amber-bg2)':'var(--bg3)', color:level===l?'var(--amber2)':'var(--text2)', fontSize:12, cursor:'pointer' }}>{l}</div>)}
              </div>
            </div>
            {error && <div style={{ padding:'9px 12px', borderRadius:7, fontSize:12, marginBottom:12, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>{error}</div>}
            <div style={{ display:'flex', justifyContent:'flex-end', paddingTop:20, borderTop:'1px solid var(--border)' }}>
              <button style={nextBtn} onClick={() => { if(!topic.trim()){setError('Enter a topic first');return}; setError(''); setStep(1) }}>Schedule</button>
            </div>
          </div>
        )}

        {step===1 && (
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>Set your schedule</div>
            <div style={{ fontSize:12.5, color:'var(--text3)', marginBottom:20 }}>Be realistic — consistent beats heroic.</div>
            <div style={{ marginBottom:14 }}>
              <label style={lbl}>Path length</label>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:7 }}>
                {DUR_OPTS.map(d => <div key={d.weeks} onClick={()=>setDuration(d)} style={{ padding:'7px 13px', borderRadius:20, border:`1px solid ${duration.weeks===d.weeks?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:duration.weeks===d.weeks?'var(--amber-bg2)':'var(--bg3)', color:duration.weeks===d.weeks?'var(--amber2)':'var(--text2)', fontSize:12, cursor:'pointer' }}>{d.label}</div>)}
              </div>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={lbl}>Session length</label>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:7 }}>
                {TIME_OPTS.map(t => <div key={t} onClick={()=>setSessionTime(t)} style={{ padding:'7px 13px', borderRadius:20, border:`1px solid ${sessionTime===t?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:sessionTime===t?'var(--amber-bg2)':'var(--bg3)', color:sessionTime===t?'var(--amber2)':'var(--text2)', fontSize:12, cursor:'pointer' }}>{t}</div>)}
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={lbl}>Study days</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:5, marginBottom:8 }}>
                {DAY_LABELS.map((d,i) => <div key={i} onClick={()=>toggleDay(i)} style={{ aspectRatio:'1', borderRadius:7, border:`1px solid ${activeDays.includes(i)?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:activeDays.includes(i)?'var(--amber-bg2)':'var(--bg3)', color:activeDays.includes(i)?'var(--amber2)':'var(--text3)', cursor:'pointer', fontSize:10, fontFamily:'var(--mono)', display:'flex', alignItems:'center', justifyContent:'center' }}>{d}</div>)}
              </div>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{activeDays.length} days/week · {totalLessons} total sessions</div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', paddingTop:20, borderTop:'1px solid var(--border)' }}>
              <button style={backBtn} onClick={()=>setStep(0)}>Back</button>
              <button style={nextBtn} onClick={()=>{ if(activeDays.length===0){setError('Pick at least one day');return}; setError(''); setStep(2) }}>Learning Style</button>
            </div>
          </div>
        )}

        {step===2 && (
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>How do you learn best?</div>
            <div style={{ fontSize:12.5, color:'var(--text3)', marginBottom:20 }}>Pick all that fit — Claude will blend these into your lessons.</div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:8, marginBottom:20 }}>
              {STYLE_OPTS.map(s => <div key={s.v} onClick={()=>toggleStyle(s.v)} style={{ padding:'10px 14px', borderRadius:9, border:`1px solid ${styles.includes(s.v)?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:styles.includes(s.v)?'var(--amber-bg2)':'var(--bg3)', cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:500, color:styles.includes(s.v)?'var(--amber2)':'var(--text)', marginBottom:1 }}>{s.label}</div>
                  <div style={{ fontSize:11, color:'var(--text3)' }}>{s.desc}</div>
                </div>
                {styles.includes(s.v) && <span style={{ color:'var(--amber)', fontSize:14 }}>✓</span>}
              </div>)}
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={lbl}>Anything else? (optional)</label>
              <textarea style={{ ...inp, minHeight:64, resize:'vertical' as const, lineHeight:1.6 }} placeholder="e.g. I prefer shorter paragraphs. Focus on Latin American Spanish..." value={extra} onChange={e=>setExtra(e.target.value)}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', paddingTop:20, borderTop:'1px solid var(--border)' }}>
              <button style={backBtn} onClick={()=>setStep(1)}>Back</button>
              <button style={nextBtn} onClick={()=>setStep(3)}>Review</button>
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'20px 22px', marginBottom:20 }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:4 }}>{topic || 'Your Learning Path'}</div>
              {goal && <div style={{ fontSize:13, color:'var(--text2)', marginBottom:16, fontStyle:'italic' }}>"{goal}"</div>}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {[
                  { label:'Level', value:level },
                  { label:'Duration', value:duration.label },
                  { label:'Per session', value:sessionTime },
                  { label:'Days/week', value:`${activeDays.length} (${daysLabel})` },
                  { label:'Total sessions', value:`${totalLessons}` },
                  { label:'Style', value:styles.join(', ') },
                ].map((r,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', background:'var(--bg3)', borderRadius:7 }}>
                    <div>
                      <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{r.label}</div>
                      <div style={{ fontSize:12.5, color:'var(--text)', fontWeight:500 }}>{r.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {error && <div style={{ padding:'9px 12px', borderRadius:7, fontSize:12, marginBottom:12, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>{error}</div>}
            <div style={{ display:'flex', justifyContent:'space-between', paddingTop:20, borderTop:'1px solid var(--border)' }}>
              <button style={backBtn} onClick={()=>setStep(2)}>Back</button>
              <button style={{ ...nextBtn, display:'flex', alignItems:'center', gap:8 }} onClick={generate}>Generate with Claude</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
