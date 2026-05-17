'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BADGES, loadCurricula, updateCurriculumProgress, updateStreak, logActivity, getCachedLesson, cacheLesson, completeLessonAndAwardXP, loadStreak, checkAndAwardBadges } from '@/lib/db'
import { useRouter, useSearchParams } from 'next/navigation'

function PlayIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="#0a0b0f"><polygon points="2,1 11,6 2,11"/></svg>
}
function PauseIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="#0a0b0f"><rect x="1" y="1" width="4" height="10"/><rect x="7" y="1" width="4" height="10"/></svg>
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', margin:'24px 0 8px', lineHeight:1.3 }}>{line.slice(3)}</h2>
    if (line.startsWith('# ')) return <h1 key={i} style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', margin:'28px 0 10px', lineHeight:1.2 }}>{line.slice(2)}</h1>
    if (line.startsWith('> ')) return <blockquote key={i} style={{ borderLeft:'2px solid var(--amber)', padding:'10px 16px', background:'var(--amber-bg)', borderRadius:'0 8px 8px 0', margin:'14px 0', color:'var(--amber3)', fontStyle:'italic', fontSize:14 }}>{line.slice(2)}</blockquote>
    if (line.startsWith('- ') || line.startsWith('* ')) return <div key={i} style={{ display:'flex', gap:8, marginBottom:6, paddingLeft:8 }}><span style={{ color:'var(--amber)', flexShrink:0 }}>ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·</span><span style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7 }}>{line.slice(2)}</span></div>
    if (!line.trim()) return <div key={i} style={{ height:10 }}/>
    return <p key={i} style={{ fontSize:14.5, color:'var(--text2)', lineHeight:1.85, marginBottom:12 }}>{line}</p>
  })
}

export default function LessonScreen() {
  const [curricula, setCurricula] = useState<any[]>([])
  const [activeCurrId, setActiveCurrId] = useState<string|null>(null)
  const [selectedLesson, setSelectedLesson] = useState<{wi:number,di:number}|null>(null)
  const [lessonData, setLessonData] = useState<any>(null)
  const [generating, setGenerating] = useState(false)
  const [streamText, setStreamText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [marking, setMarking] = useState(false)
  const [userId, setUserId] = useState<string|null>(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioSpeed, setAudioSpeed] = useState(1)
  const [exAnswers, setExAnswers] = useState<Record<number,any>>({})
  const [exInputs, setExInputs] = useState<Record<number,string>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<number,number>>({})
  const [showPicker, setShowPicker] = useState(false)
  const [view, setView] = useState<'picker'|'lesson'>('picker')
  const [streak, setStreak] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState<Record<string,any>|null>(null)
  const [eliMode, setEliMode] = useState<'eli5'|'deeper'|null>(null)
  const [eliContent, setEliContent] = useState('')
  const [eliLoading, setEliLoading] = useState(false)
  const [newBadges, setNewBadges] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlCurrId = searchParams.get('id')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await createClient().auth.getUser()
      if (!user) return
      setUserId(user.id)
      loadStreak(user.id).then(s => setStreak(s?.current_streak || 0)).catch(() => {})
      const currs = await loadCurricula(user.id)
      setCurricula(currs)
      if (currs.length > 0) {
        const targetId = urlCurrId || currs[0].id
        const targetCurr = currs.find((c: any) => c.id === targetId) || currs[0]
        setActiveCurrId(targetCurr.id)
        // Find first incomplete lesson for THIS specific curriculum
        const targetProgress = targetCurr.progress || {}
        const targetWeeks = targetCurr.curriculum?.weeks || []
        let found = false
        outer: for (let wi = 0; wi < targetWeeks.length; wi++) {
          for (let di = 0; di < (targetWeeks[wi].days||[]).length; di++) {
            if (!targetProgress[wi + '-' + di]) {
              setSelectedLesson({ wi, di })
              found = true
              break outer
            }
          }
        }
        if (!found && targetWeeks.length > 0) {
          setSelectedLesson({ wi:0, di:0 })
        }

      }
    }
    load()
  }, [])

  const activeCurr = curricula.find(c => c.id === activeCurrId)

  useEffect(() => {
    if (activeCurr && selectedLesson) {
      const key = `${selectedLesson.wi}-${selectedLesson.di}`
      const done = !!(activeCurr.progress || {})[key]
      setIsComplete(done)
      setExAnswers({})
      setExInputs({})
      setQuizAnswers({})
      setLessonData(null)
      loadLesson(activeCurr, selectedLesson.wi, selectedLesson.di)
    }
  }, [selectedLesson, activeCurrId])

  const loadLesson = async (curr: any, wi: number, di: number) => {
    const key = `${wi}-${di}`
    // Check cache first
    const cached = await getCachedLesson(curr.id, key)
    if (cached) {
      setLessonData(cached)
      return
    }
    // Generate with Claude
    const week = curr.curriculum?.weeks?.[wi]
    const day = week?.days?.[di]
    if (!day) return
    setGenerating(true)
    setStreamText('')
    const prompt = `You are an expert educator. Generate a complete, engaging lesson for this learning session.

Topic: ${curr.topic}
Level: ${curr.level}
Week ${wi+1} Theme: ${week.theme}
Today's Session: ${day.title}
Session Type: ${day.type}
Duration: ${day.duration}
Description: ${day.description}

Generate a complete lesson as a single valid JSON object. Return ONLY the JSON, no markdown, no explanation.

{
  "title": "Engaging lesson title",
  "subject": "${curr.topic}",
  "level": "${curr.level}",
  "duration": "${day.duration}",
  "eyebrow": "Week ${wi+1} ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· Day ${di+1}",
  "intro": "2-3 sentence introduction that hooks the learner and explains what they will master.",
  "content": "Full lesson content in markdown. Use ## for section headers. Use > for key insights. Write 600-900 words. Be specific, practical, and engaging. Include real examples.",
  "keyPoints": ["Point 1", "Point 2", "Point 3", "Point 4"],
  "vocab": [
    {"word": "term", "reading": "pronunciation or type", "example": "example usage"}
  ],
  "exercises": [
    {"type": "Multiple Choice", "question": "Question text?", "opts": ["A","B","C","D"], "correct": 0, "explanation": "Why this is correct."},
    {"type": "Fill in the Blank", "question": "Complete this: ___", "answer": "answer", "explanation": "Explanation."}
  ],
  "quiz": [
    {"q": "Quiz question?", "opts": ["A","B","C","D"], "correct": 0, "explanation": "Explanation."}
  ]
}

Rules:
- vocab: 4-8 key terms relevant to this session
- exercises: 2-3 exercises mixing Multiple Choice and Fill in the Blank
- quiz: 3 questions to check understanding
- content: rich, educational, specific to the topic and level
- Keep all strings on single lines (no literal newlines in JSON strings, use \\n)`

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stream: true, messages: [{ role:'user', content: prompt }] })
      })
      if (!res.ok) throw new Error('API error')
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
          try { const p = JSON.parse(data); if(p.text){ full+=p.text; setStreamText(full.slice(-300)) } } catch {}
        }
      }
      const match = full.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Could not parse lesson')
      const parsed = JSON.parse(match[0])
      // Fix content: replace literal \n with newlines
      if (parsed.content) parsed.content = parsed.content.replace(/\\n/g, '\n')
      setLessonData(parsed)
      // Cache it
      if (activeCurrId) await cacheLesson(activeCurrId, key, parsed)
    } catch(e: any) {
      console.error('Lesson generation failed:', e)
      setLessonData({ error: e.message })
    } finally {
      setGenerating(false)
      setStreamText('')
    }
  }

  const markComplete = async () => {
    if (!activeCurrId || !userId || isComplete) return
    setMarking(true)
    try {
      const currs = await loadCurricula(userId)
      const curr = currs.find((c: any) => c.id === activeCurrId)
      const progress = { ...(curr?.progress || {}) }
      const key = `${selectedLesson!.wi}-${selectedLesson!.di}`
      progress[key] = true
      await updateCurriculumProgress(activeCurrId, progress)
      await logActivity(userId, 'lesson', 20)
      await updateStreak(userId)
      const xpResult = await completeLessonAndAwardXP(activeCurrId, key, streak)
      if (xpResult && xpResult.leveledUp) { setShowLevelUp(xpResult.levelInfo as Record<string,any>) }
      // Check badges
      if (userId && xpResult) {
        const earned = await checkAndAwardBadges(userId, { xp: xpResult.newXP, streak })
        if (earned.length > 0) setNewBadges(earned)
      }
      ;(window as any).__learnpath_refreshProfile?.()
      setIsComplete(true)
      setCurricula(cs => cs.map(c => c.id === activeCurrId ? { ...c, progress } : c))
    } catch(e) { console.error(e) }
    finally { setMarking(false) }
  }
  const fetchEli = async (mode: 'eli5'|'deeper') => {
    if (!lessonData) return
    setEliMode(mode); setEliLoading(true); setEliContent('')
    const modeText = mode === 'eli5' ? 'Explain this lesson like I am 5 years old. Use simple words, analogies, and short sentences. No jargon.' : 'Go deeper on this lesson. Add advanced concepts, nuance, expert-level insights, and real-world applications beyond what was covered.'
    const prompt = modeText + '\n\nLesson title: ' + (lessonData.title||'') + '\n\nLesson content:\n' + (lessonData.content||'')
    try {
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ stream:true, messages:[{ role:'user', content:prompt }] }) })
      const reader = res.body!.getReader(); const decoder = new TextDecoder(); let full = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim(); if (data === '[DONE]') break
          try { const p = JSON.parse(data); if (p.text) { full += p.text; setEliContent(full) } } catch {}
        }
      }
    } catch(e) { setEliContent('Unable to generate. Please try again.') }
    finally { setEliLoading(false) }
  }

  const toggleAudio = () => {
    if (!lessonData) return
    if (audioPlaying) { window.speechSynthesis?.cancel(); setAudioPlaying(false); return }
    const text = `${lessonData.title}. ${lessonData.intro} ${lessonData.content?.replace(/#{1,3} /g,'').replace(/>/g,'') || ''}`
    const u = new SpeechSynthesisUtterance(text)
    u.rate = audioSpeed
    u.onend = () => setAudioPlaying(false)
    window.speechSynthesis?.speak(u)
    setAudioPlaying(true)
  }

  const sectionLabel = (label: string) => (
    <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.14em', margin:'22px 0 10px', display:'flex', alignItems:'center', gap:8 }}>
      {label}<div style={{ flex:1, height:1, background:'var(--border)' }}/>
    </div>
  )

  const weeks = activeCurr?.curriculum?.weeks || []
  const progress = activeCurr?.progress || {}
  const totalSessions = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
  const doneSessions = Object.values(progress).filter(Boolean).length
  const currPct = totalSessions ? Math.round((doneSessions/totalSessions)*100) : 0

  // No curricula
  if (!activeCurr && curricula.length === 0 && !generating) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
        <div style={{ textAlign:'center' as const, padding:32 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:8 }}>No learning paths yet</div>
          <div style={{ fontSize:13, color:'var(--text2)', marginBottom:20 }}>Build a curriculum first and your lessons will appear here.</div>
          <button onClick={() => router.push('/app/curriculum')} style={{ padding:'10px 22px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Build my first path</button>
        </div>
      </div>
    )
  }

  const selectedDay = selectedLesson ? weeks[selectedLesson.wi]?.days?.[selectedLesson.di] : null
  const lessonKey = selectedLesson ? `${selectedLesson.wi}-${selectedLesson.di}` : null

  return (
    <div style={{ display:'flex', height:'100%', overflow:'hidden' }}>

      {/* LEFT PANEL ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â lesson picker */}
      <div style={{ width:260, flexShrink:0, borderRight:'1px solid var(--border)', overflowY:'auto', background:'var(--bg2)' }}>

        {/* Curriculum selector */}
        {curricula.length > 1 && (
          <div style={{ padding:'12px 14px', borderBottom:'1px solid var(--border)' }}>
            <select value={activeCurrId||''} onChange={e => { setActiveCurrId(e.target.value); setSelectedLesson(null); setLessonData(null) }}
              style={{ width:'100%', padding:'7px 10px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:12, outline:'none' }}>
              {curricula.map(c => <option key={c.id} value={c.id}>{c.curriculum?.title || c.topic}</option>)}
            </select>
          </div>
        )}

        {/* Curriculum header */}
        {activeCurr && (
          <div style={{ padding:'14px', borderBottom:'1px solid var(--border)' }}>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:4 }}>{activeCurr.topic}</div>
            <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:8, lineHeight:1.3 }}>{activeCurr.curriculum?.title}</div>
            <div style={{ height:3, background:'var(--bg5)', borderRadius:2, marginBottom:5 }}>
              <div style={{ height:'100%', borderRadius:2, background:'var(--amber)', width:currPct+'%' }}/>
            </div>
            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{doneSessions}/{totalSessions} sessions ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· {currPct}%</div>
          </div>
        )}

        {/* Week/day list */}
        {weeks.map((wk: any, wi: number) => (
          <div key={wi}>
            <div style={{ padding:'8px 14px 4px', fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.1em', background:'var(--bg3)', borderBottom:'1px solid var(--border)' }}>
              Week {wi+1} ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· {wk.theme}
            </div>
            {(wk.days||[]).map((d: any, di: number) => {
              const key = `${wi}-${di}`
              const done = !!progress[key]
              const isSelected = selectedLesson?.wi===wi && selectedLesson?.di===di
              const typeColors: Record<string,string> = { lesson:'var(--blue-text)', flashcards:'var(--purple-text)', exercise:'var(--green-text)', review:'var(--amber2)', practice:'var(--green-text)' }
              return (
                <div key={di} onClick={() => { setSelectedLesson({wi,di}); setView('lesson') }}
                  style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', cursor:'pointer', background:isSelected?'var(--amber-bg)':'transparent', borderLeft:`2px solid ${isSelected?'var(--amber)':'transparent'}`, transition:'all 0.12s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                    <div style={{ width:14, height:14, borderRadius:'50%', border:`1px solid ${done?'var(--green-border)':'var(--border2)'}`, background:done?'var(--green-bg)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      {done && <span style={{ fontSize:8, color:'var(--green-text)' }}>ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ</span>}
                    </div>
                    <span style={{ fontSize:8.5, fontFamily:'var(--mono)', color:typeColors[d.type]||'var(--blue-text)', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{d.type}</span>
                    <span style={{ fontSize:8, fontFamily:'var(--mono)', color:'var(--text3)', marginLeft:'auto' }}>{d.duration}</span>
                  </div>
                  <div style={{ fontSize:12, color:isSelected?'var(--amber2)':'var(--text)', lineHeight:1.35, paddingLeft:20 }}>{d.title}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* RIGHT PANEL ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â lesson content */}
      <div style={{ flex:1, overflowY:'auto' }}>
        {generating ? (
          <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', height:'100%', padding:32, textAlign:'center' }}>
            <div style={{ width:36, height:36, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 20px' }}/>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:6 }}>Generating your lesson</div>
            <div style={{ fontSize:13, color:'var(--text2)', marginBottom:20 }}>{selectedDay?.title}</div>
            {streamText && (
              <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', fontFamily:'var(--mono)', fontSize:10, color:'var(--text3)', maxWidth:400, width:'100%', textAlign:'left' as const, lineHeight:1.6, maxHeight:80, overflow:'hidden' }}>
                {streamText}
              </div>
            )}
          </div>
        ) : !selectedLesson || !lessonData ? (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
            <div style={{ textAlign:'center' as const, color:'var(--text3)', padding:32 }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:18, color:'var(--text2)', marginBottom:6 }}>Select a lesson</div>
              <div style={{ fontSize:13 }}>Pick any session from the left panel to begin.</div>
            </div>
          </div>
        ) : lessonData.error ? (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
            <div style={{ textAlign:'center' as const, padding:32 }}>
              <div style={{ fontSize:14, color:'var(--red-text)', marginBottom:12 }}>Failed to generate lesson</div>
              <button onClick={() => loadLesson(activeCurr, selectedLesson.wi, selectedLesson.di)} style={{ padding:'8px 18px', borderRadius:7, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Try again</button>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth:680, margin:'0 auto', padding:'24px 28px 80px' }}>

            {/* Header */}
            <div style={{ marginBottom:20, paddingBottom:16, borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:6 }}>
                {lessonData.eyebrow} ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· {lessonData.subject}
                {isComplete && <span style={{ marginLeft:8, color:'var(--green-text)' }}>ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· Complete</span>}
              </div>
              <h1 style={{ fontFamily:'var(--serif)', fontSize:26, color:'var(--text)', lineHeight:1.2, marginBottom:10 }}>{lessonData.title}</h1>
              <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, marginBottom:12 }}>{lessonData.intro}</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' as const }}>
                {(lessonData.keyPoints||[]).map((p: string, i: number) => (
                  <span key={i} style={{ fontSize:10, fontFamily:'var(--mono)', padding:'3px 9px', borderRadius:4, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)' }}>{p}</span>
                ))}
              </div>
            </div>

            {/* Audio bar */}
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, marginBottom:20 }}>
              <button onClick={toggleAudio} style={{ width:30, height:30, borderRadius:'50%', background:'var(--amber)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {audioPlaying ? <PauseIcon/> : <PlayIcon/>}
              </button>
              <div style={{ flex:1, height:3, background:'var(--bg5)', borderRadius:2 }}/>
              <div style={{ display:'flex', gap:3 }}>
                {[0.75,1,1.25,1.5].map(s => (
                  <button key={s} onClick={() => setAudioSpeed(s)} style={{ padding:'2px 6px', borderRadius:4, border:`1px solid ${audioSpeed===s?'var(--amber)':'var(--border2)'}`, background:audioSpeed===s?'var(--amber-bg)':'var(--bg4)', color:audioSpeed===s?'var(--amber)':'var(--text3)', fontSize:9, fontFamily:'var(--mono)', cursor:'pointer' }}>{s}x</button>
                ))}
              </div>
            </div>

            {/* Lesson content */}
            <div style={{ lineHeight:1.85 }}>
              {renderContent(lessonData.content || '')}
            </div>

            {/* Vocab */}
            {(lessonData.vocab||[]).length > 0 && <>
              {sectionLabel('Key Terms')}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:7, marginBottom:8 }}>
                {lessonData.vocab.map((v: any, i: number) => (
                  <div key={i} onClick={() => { if(window.speechSynthesis){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(v.word))} }} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 12px', cursor:'pointer' }}>
                    <div style={{ fontFamily:'var(--serif)', fontSize:14, color:'var(--text)', fontStyle:'italic', marginBottom:2 }}>{v.word}</div>
                    <div style={{ fontSize:10, color:'var(--amber)', fontFamily:'var(--mono)', marginBottom:4 }}>{v.reading}</div>
                    <div style={{ fontSize:10.5, color:'var(--text3)', lineHeight:1.45 }}>{v.example}</div>
                    <div style={{ fontSize:8.5, color:'var(--blue-text)', fontFamily:'var(--mono)', marginTop:3 }}>tap to hear</div>
                  </div>
                ))}
              </div>
            </>}

            {/* Exercises */}
            {(lessonData.exercises||[]).length > 0 && <>
              {sectionLabel('Practice')}
              <div style={{ display:'flex', flexDirection:'column' as const, gap:9 }}>
                {lessonData.exercises.map((ex: any, ei: number) => (
                  <div key={ei} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'14px 16px' }}>
                    <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:7 }}>{ex.type}</div>
                    <div style={{ fontSize:13.5, fontWeight:500, color:'var(--text)', marginBottom:10, lineHeight:1.5 }}>{ex.question}</div>
                    {ex.type === 'Fill in the Blank' ? (
                      <>
                        <input style={{ width:'100%', padding:'8px 11px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:13, outline:'none', marginBottom:7 }}
                          placeholder="Your answer..." value={exInputs[ei]||''} onChange={e => setExInputs(p=>({...p,[ei]:e.target.value}))}
                          disabled={exAnswers[ei]!==undefined}
                          onKeyDown={e => { if(e.key==='Enter'&&exAnswers[ei]===undefined){ const correct=(exInputs[ei]||'').trim().toLowerCase()===ex.answer.toLowerCase(); setExAnswers(p=>({...p,[ei]:correct?'correct':'wrong'})) } }}
                        />
                        {exAnswers[ei]===undefined && <button onClick={() => { const correct=(exInputs[ei]||'').trim().toLowerCase()===ex.answer.toLowerCase(); setExAnswers(p=>({...p,[ei]:correct?'correct':'wrong'})) }} style={{ padding:'6px 14px', borderRadius:6, background:'var(--bg4)', border:'1px solid var(--border2)', color:'var(--text2)', fontSize:12, cursor:'pointer', fontFamily:'var(--sans)' }}>Check</button>}
                        {exAnswers[ei]!==undefined && <div style={{ padding:'8px 12px', borderRadius:7, fontSize:12, lineHeight:1.6, background:exAnswers[ei]==='correct'?'var(--green-bg)':'var(--red-bg)', border:`1px solid ${exAnswers[ei]==='correct'?'var(--green-border)':'var(--red-border)'}`, color:exAnswers[ei]==='correct'?'var(--green-text)':'var(--red-text)', marginTop:6 }}>{exAnswers[ei]==='correct'?'Correct! ':`Answer: "${ex.answer}". `}{ex.explanation}</div>}
                      </>
                    ) : (
                      <>
                        <div style={{ display:'flex', flexDirection:'column' as const, gap:5 }}>
                          {(ex.opts||[]).map((opt: string, oi: number) => {
                            let bg='var(--bg3)', border='1px solid var(--border2)', color='var(--text2)'
                            if(exAnswers[ei]!==undefined){ if(oi===ex.correct){bg='var(--green-bg)';border='1px solid var(--green-border)';color='var(--green-text)'}else if(oi===exAnswers[ei]){bg='var(--red-bg)';border='1px solid var(--red-border)';color='var(--red-text)'} }
                            return <button key={oi} onClick={() => { if(exAnswers[ei]===undefined) setExAnswers(p=>({...p,[ei]:oi})) }} style={{ padding:'8px 12px', borderRadius:7, border, background:bg, color, cursor:'pointer', fontSize:13, textAlign:'left' as const, lineHeight:1.4 }}>{opt}</button>
                          })}
                        </div>
                        {exAnswers[ei]!==undefined && <div style={{ padding:'8px 12px', borderRadius:7, fontSize:12, lineHeight:1.6, background:exAnswers[ei]===ex.correct?'var(--green-bg)':'var(--red-bg)', border:`1px solid ${exAnswers[ei]===ex.correct?'var(--green-border)':'var(--red-border)'}`, color:exAnswers[ei]===ex.correct?'var(--green-text)':'var(--red-text)', marginTop:8 }}>{exAnswers[ei]===ex.correct?'Correct! ':'Not quite. '}{ex.explanation}</div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>}

            {/* Quiz */}
            {(lessonData.quiz||[]).length > 0 && <>
              {sectionLabel('Check Your Understanding')}
              <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'16px 18px', marginBottom:20 }}>
                {lessonData.quiz.map((q: any, qi: number) => (
                  <div key={qi} style={{ marginBottom:14, paddingBottom:14, borderBottom: qi<lessonData.quiz.length-1?'1px solid var(--border)':'none' }}>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:8, lineHeight:1.5 }}>{qi+1}. {q.q}</div>
                    <div style={{ display:'flex', flexDirection:'column' as const, gap:5 }}>
                      {(q.opts||[]).map((opt: string, oi: number) => {
                        let bg='var(--bg3)', border='1px solid var(--border2)', color='var(--text2)'
                        if(quizAnswers[qi]!==undefined){ if(oi===q.correct){bg='var(--green-bg)';border='1px solid var(--green-border)';color='var(--green-text)'}else if(oi===quizAnswers[qi]){bg='var(--red-bg)';border='1px solid var(--red-border)';color='var(--red-text)'} }
                        return <button key={oi} onClick={() => { if(quizAnswers[qi]===undefined) setQuizAnswers(p=>({...p,[qi]:oi})) }} style={{ padding:'7px 12px', borderRadius:7, border, background:bg, color, cursor:'pointer', fontSize:13, textAlign:'left' as const }}>{opt}</button>
                      })}
                    </div>
                    {quizAnswers[qi]!==undefined && <div style={{ fontSize:11, color:'var(--text2)', marginTop:5, padding:'6px 10px', background:'var(--bg4)', borderRadius:6, lineHeight:1.5 }}>{q.explanation}</div>}
                  </div>
                ))}
              </div>
            </>}

            {/* ELI5 / Go Deeper */}
            {lessonData && (
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <button onClick={() => { if(eliMode==='eli5'&&eliContent){setEliMode(null);setEliContent('')}else{fetchEli('eli5')} }} style={{ flex:1, padding:'8px', borderRadius:8, border:'1px solid var(--border2)', background:eliMode==='eli5'?'var(--amber-bg)':'var(--bg3)', color:eliMode==='eli5'?'var(--amber)':'var(--text2)', fontFamily:'var(--sans)', fontSize:12, fontWeight:500, cursor:'pointer' }}>ELI5 - Simplify</button>
                <button onClick={() => { if(eliMode==='deeper'&&eliContent){setEliMode(null);setEliContent('')}else{fetchEli('deeper')} }} style={{ flex:1, padding:'8px', borderRadius:8, border:'1px solid var(--border2)', background:eliMode==='deeper'?'var(--amber-bg)':'var(--bg3)', color:eliMode==='deeper'?'var(--amber)':'var(--text2)', fontFamily:'var(--sans)', fontSize:12, fontWeight:500, cursor:'pointer' }}>Go Deeper</button>
              </div>
            )}
            {(eliLoading || eliContent) && (
              <div style={{ background:'var(--bg3)', border:'1px solid var(--amber-bg)', borderRadius:10, padding:'14px 16px', marginBottom:12 }}>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>{eliMode==='eli5'?'Simplified':'Deeper Dive'}</div>
                {eliLoading && !eliContent && <div style={{ fontSize:13, color:'var(--text3)' }}>Claude is thinking...</div>}
                {eliContent && <div style={{ fontSize:14, color:'var(--text2)', lineHeight:1.8, whiteSpace:'pre-wrap' }}>{eliContent}</div>}
              </div>
            )}
            {/* Mark complete */}
            {isComplete ? (
              <div style={{ background:'var(--green-bg)', border:'1px solid var(--green-border)', borderRadius:8, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                <div>
                  <div style={{ fontSize:13, color:'var(--green-text)', fontWeight:500 }}>Lesson complete!</div>
                  <div style={{ fontSize:11, color:'var(--green-text)', marginTop:2 }}>Great work ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â keep going.</div>
                </div>
                <button onClick={() => {
                  // Auto-advance to next lesson
                  const weeks2 = activeCurr?.curriculum?.weeks || []
                  const progress2 = activeCurr?.progress || {}
                  for (let wi = 0; wi < weeks2.length; wi++) {
                    for (let di = 0; di < (weeks2[wi].days||[]).length; di++) {
                      if (!progress2[`${wi}-${di}`]) { setSelectedLesson({wi,di}); return }
                    }
                  }
                  router.push('/app')
                }} style={{ padding:'6px 14px', borderRadius:6, background:'var(--green-bg)', border:'1px solid var(--green-border)', color:'var(--green-text)', fontSize:12, cursor:'pointer', fontFamily:'var(--sans)', whiteSpace:'nowrap' as const }}>
                  Next Lesson
                </button>
              </div>
            ) : (
              <button onClick={markComplete} disabled={marking} style={{ width:'100%', padding:'13px', borderRadius:10, background:marking?'var(--bg4)':'var(--amber)', border:`1px solid ${marking?'var(--border2)':'var(--amber)'}`, color:marking?'var(--text2)':'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:marking?'not-allowed':'pointer' }}>
                {marking ? 'Saving...' : 'Mark Lesson Complete'}
              </button>
            )}
          </div>
        )}
      </div>
    {newBadges.length > 0 && !showLevelUp && (
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={() => setNewBadges([])}>
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'36px 40px', textAlign:'center', maxWidth:380, width:'90%' }} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize:40, marginBottom:12 }}>ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â </div>
          <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', marginBottom:8 }}>Badge{newBadges.length>1?'s':''} Earned!</div>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:8, marginBottom:24 }}>
            {newBadges.map(id => {
              const b = BADGES.find((x: any) => x.id === id)
              return b ? (
                <div key={id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'var(--bg3)', borderRadius:10, border:'1px solid var(--border)' }}>
                  <span style={{ fontSize:24 }}>{b.icon}</span>
                  <div style={{ textAlign:'left' as const }}>
                    <div style={{ fontSize:14, fontWeight:500, color:'var(--amber)' }}>{b.label}</div>
                    <div style={{ fontSize:12, color:'var(--text2)' }}>{b.desc}</div>
                  </div>
                </div>
              ) : null
            })}
          </div>
          <button onClick={() => setNewBadges([])} style={{ padding:'10px 28px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer' }}>Continue</button>
        </div>
      </div>
    )}
    {showLevelUp && (
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={() => setShowLevelUp(null)}>
        <div style={{ background:'var(--bg2)', border:'1px solid var(--amber)', borderRadius:18, padding:'40px', textAlign:'center', maxWidth:380, width:'90%' }} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize:48, marginBottom:16 }}>ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°</div>
          <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--amber)', marginBottom:8 }}>Level Up!</div>
          <div style={{ fontSize:16, color:'var(--text)', marginBottom:6 }}>You are now a</div>
          <div style={{ fontFamily:'var(--mono)', fontSize:22, color:'var(--amber2)', fontWeight:700, marginBottom:20 }}>{showLevelUp?.title}</div>
          <div style={{ fontSize:13, color:'var(--text2)', marginBottom:24 }}>Keep learning to reach the next level.</div>
          <button onClick={() => setShowLevelUp(null)} style={{ padding:'10px 28px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer' }}>Continue</button>
        </div>
      </div>
    )}
    </div>
  )
}




















