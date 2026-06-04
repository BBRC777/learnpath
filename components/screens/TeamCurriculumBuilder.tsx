'use client'
import { useState, useRef } from 'react'
import { saveTeamCurriculum, saveAssessment } from '@/lib/db'

const TOPICS = ['Onboarding','Compliance Training','Data Privacy','Leadership','Sales Skills','Python','Excel','Project Management','Public Speaking','Customer Service','Cybersecurity','Finance Basics']
const LEVEL_OPTS = ['Complete Beginner','Beginner','Intermediate','Advanced']
const TRAINING_MODES = [
  { v:'quick',     label:'Quick',      desc:'15 min – 8 hrs total',    icon:'⚡' },
  { v:'multiday',  label:'Multi-day',  desc:'2 – 5 days',              icon:'📅' },
  { v:'multiweek', label:'Multi-week', desc:'2 – 12 weeks',            icon:'📚' },
]
const QUICK_OPTS  = ['15 min','30 min','1 hr','2 hrs','4 hrs','8 hrs']
const MDAY_OPTS   = [{ label:'2 Days', days:2 },{ label:'3 Days', days:3 },{ label:'4 Days', days:4 },{ label:'5 Days', days:5 }]
const DUR_OPTS    = [{ label:'2 Weeks', weeks:2 },{ label:'4 Weeks', weeks:4 },{ label:'6 Weeks', weeks:6 },{ label:'8 Weeks', weeks:8 },{ label:'12 Weeks', weeks:12 }]
const TIME_OPTS = ['15 min','20 min','30 min','45 min','60 min']
const DAY_LABELS = ['M','T','W','T','F','S','S']
const STYLE_OPTS = [
  { v:'structured', label:'Structured', desc:'Lists, frameworks, steps' },
  { v:'practical',  label:'Hands-on',   desc:'Exercises and doing' },
  { v:'visual',     label:'Visual',     desc:'Images, diagrams, examples' },
  { v:'storytelling',label:'Story-driven',desc:'Narrative and context' },
  { v:'mixed',      label:'Mixed',      desc:'Variety each session' },
]

function extractYouTubeId(url: string): string | null {
  const patterns = [/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,/youtu\.be\/([a-zA-Z0-9_-]{11})/]
  for (const p of patterns) { const m = url.match(p); if (m) return m[1] }
  return null
}

interface Props {
  userId: string
  teamId: string
  onClose: () => void
  onSaved: (curr: any) => void
}

export default function TeamCurriculumBuilder({ userId, teamId, onClose, onSaved }: Props) {
  const [mode, setMode] = useState<'scratch'|'file'|'youtube'>('scratch')
  const [step, setStep] = useState(0)
  const [topic, setTopic] = useState('')
  const [goal, setGoal] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [duration, setDuration] = useState(DUR_OPTS[1])
  const [trainingMode, setTrainingMode] = useState<'quick'|'multiday'|'multiweek'>('multiweek')
  const [quickDuration, setQuickDuration] = useState('1 hr')
  const [multiDayCount, setMultiDayCount] = useState(MDAY_OPTS[0])
  const [sessionTime, setSessionTime] = useState('30 min')
  const [activeDays, setActiveDays] = useState([0,1,2,3,4])
  const [styles, setStyles] = useState(['structured'])
  const [extra, setExtra] = useState('')
  const [generating, setGenerating] = useState(false)
  const [streamText, setStreamText] = useState('')
  const [curriculum, setCurriculum] = useState<any>(null)
  const [savedId, setSavedId] = useState<string|null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [addAssessment, setAddAssessment] = useState(false)
  const [passThreshold, setPassThreshold] = useState(70)
  const [numQuestions, setNumQuestions] = useState(5)
  const [pdfText, setPdfText] = useState('')
  const [pdfName, setPdfName] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [youtubeLoading, setYoutubeLoading] = useState(false)
  const [youtubeTranscript, setYoutubeTranscript] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const accent = '#4a7fd4'
  const accentBg = 'rgba(74,127,212,0.12)'
  const accentBorder = 'rgba(74,127,212,0.3)'

  const toggleDay = (i: number) => setActiveDays(d => d.includes(i)?d.filter(x=>x!==i):[...d,i].sort())
  const toggleStyle = (v: string) => setStyles(s => s.includes(v)?(s.length>1?s.filter(x=>x!==v):s):[...s,v])
  const daysLabel = activeDays.map(i => DAY_LABELS[i]).join(', ')
  const totalLessons = trainingMode === 'quick' ? 1 : trainingMode === 'multiday' ? multiDayCount.days : duration.weeks * activeDays.length

  const inp: React.CSSProperties = { width:'100%', padding:'9px 12px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text)', fontFamily:'var(--sans)', fontSize:13, outline:'none', boxSizing:'border-box' as const }
  const lbl: React.CSSProperties = { display:'block', fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase' as const, letterSpacing:'0.1em', color:'var(--text3)', marginBottom:6 }
  const btnPrimary: React.CSSProperties = { padding:'9px 20px', borderRadius:8, border:'none', background:accent, color:'#fff', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }
  const btnSecondary: React.CSSProperties = { padding:'9px 16px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }

  const handleFileUpload = async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    const accepted = ['pdf','docx','txt']
    if (!ext || !accepted.includes(ext)) { setError('Unsupported file type. Please upload a PDF, Word document (.docx), or text file (.txt).'); return }
    setPdfLoading(true); setPdfName(file.name); setError('')
    try {
      let text = ''
      if (ext === 'txt') {
        text = await file.text()
      } else if (ext === 'docx') {
        const mammoth = await import('mammoth')
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        text = result.value
      } else {
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@' + pdfjsLib.version + '/build/pdf.worker.min.mjs'
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
        for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          text += content.items.map((item: any) => ('str' in item ? item.str : '')).join(' ') + '\n'
        }
      }
      setPdfText(text.slice(0, 12000))
      setTopic(file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
    } catch { setError('Could not read file. Make sure it is a valid PDF, Word document, or text file.') }
    finally { setPdfLoading(false) }
  }

  const fetchYouTubeTranscript = async () => {
    const videoId = extractYouTubeId(youtubeUrl)
    if (!videoId) { setError('Could not find a YouTube video ID.'); return }
    setYoutubeLoading(true); setError('')
    try {
      const res = await fetch('/api/youtube-transcript?videoId=' + videoId)
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Could not fetch transcript')
      setYoutubeTranscript(data.transcript)
      setTopic('YouTube: ' + videoId)
    } catch(e: any) { setError(e.message) }
    finally { setYoutubeLoading(false) }
  }

  const generate = async () => {
    if (!topic.trim()) { setError('Enter a topic first'); return }
    setError(''); setGenerating(true); setStreamText(''); setCurriculum(null)

    let prompt = ''
    if (mode === 'file' && pdfText) {
      prompt = 'You are an expert corporate trainer. Build a team learning curriculum from the document below. Return ONLY a valid JSON object: {title,subtitle,overview,totalWeeks,daysPerWeek,sessionTime,level,weeks:[{week,theme,milestone,days:[{day,title,description,type,duration}],quizCount}]}.' + ' Document: ' + pdfText.slice(0,5000) + ' Duration:' + (trainingMode==='quick' ? quickDuration+' total (single session)' : trainingMode==='multiday' ? multiDayCount.label : duration.weeks+' weeks') + ' Level:' + level + '. Now return the JSON.';
    } else if (mode === 'youtube' && youtubeTranscript) {
      prompt = 'You are an expert corporate trainer. Build a team learning curriculum from this video transcript. Return ONLY a valid JSON object: {title,subtitle,overview,totalWeeks,daysPerWeek,sessionTime,level,weeks:[{week,theme,milestone,days:[{day,title,description,type,duration}],quizCount}]}.' + ' Transcript: ' + youtubeTranscript.slice(0,5000) + ' Duration:' + (trainingMode==='quick' ? quickDuration+' total (single session)' : trainingMode==='multiday' ? multiDayCount.label : duration.weeks+' weeks') + '. Now return the JSON.';
    } else {
      const goalText = goal || 'Build team proficiency';
      prompt = 'You are an expert corporate trainer. Build a team learning curriculum. Return ONLY a valid JSON object: {title,subtitle,overview,totalWeeks,daysPerWeek,sessionTime,level,weeks:[{week,theme,milestone,days:[{day,title,description,type,duration}],quizCount}]}.' + ' Topic:' + topic + ' Goal:' + goalText + ' Level:' + level + ' Duration:' + (trainingMode==='quick' ? quickDuration+' total (single session)' : trainingMode==='multiday' ? multiDayCount.label : duration.weeks+' weeks, '+activeDays.length+' days/week') + ' Style:' + styles.join(',') + '. Now return the JSON.';
    }
    try {
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ stream:true, messages:[{ role:'user', content:prompt }] }) })
      if (!res.ok) throw new Error('API error')
      const reader = res.body!.getReader(); const decoder = new TextDecoder(); let full = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim(); if (data==='[DONE]') break
          try { const p = JSON.parse(data); if(p.text){ full+=p.text; setStreamText(full.slice(-300)) } } catch {}
        }
      }
      const match = full.match(/\{[\s\S]*\}/); if (!match) throw new Error('Could not parse curriculum - raw: ' + full.slice(0,200))
      const parsed = JSON.parse(match[0]); setCurriculum(parsed)
    } catch(e: any) { setError(e.message) }
    finally { setGenerating(false); setStreamText('') }
  }

  const stepLabels = ['Topic','Schedule','Style','Review','Assessment']

  const handleSave = async () => {
    if (!curriculum) return
    setSaving(true); setError('')
    try {
      const topicLabel = mode === 'file' ? (pdfName || topic) : topic
      const saved = await saveTeamCurriculum(userId, teamId, { topic:topicLabel, level, durLabel: trainingMode === 'quick' ? quickDuration : trainingMode === 'multiday' ? multiDayCount.label : duration.label, days:activeDays.length, time:sessionTime, style:styles.join(', '), curriculum })
      setSavedId(saved.id)
      // Generate and save assessment questions if requested
      if (addAssessment) {
        try {
          const themes = (curriculum.weeks || []).map((w: any) => w.theme).join(', ')
          const prompt = `Generate exactly ${numQuestions} assessment questions for this training. Return ONLY a JSON array, no other text.\nFormat: [{"q":"...","opts":["A","B","C","D"],"correct":0,"explanation":"..."}]\n\nTitle: ${curriculum.title}\nTopics covered: ${themes}`
          const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:[{ role:'user', content:prompt }] }) })
          if (res.ok) {
            const data = await res.json()
            const text = data.content?.[0]?.text || ''
            const match = text.match(/\[[\s\S]*\]/)
            if (match) await saveAssessment(saved.id, teamId, JSON.parse(match[0]), passThreshold)
          }
        } catch(e) { console.error('Assessment generation failed:', e) }
      }
      onSaved(saved)
    } catch(e: any) { setError('Save failed — please try again.'); console.error(e) }
    finally { setSaving(false) }
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={onClose}>
      <div style={{ background:'var(--bg2)', border:'1px solid '+accentBorder, borderRadius:16, width:'100%', maxWidth:620, maxHeight:'90vh', overflowY:'auto', position:'relative' as const }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky' as const, top:0, background:'var(--bg2)', zIndex:10 }}>
          <div>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', color:accent, textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:2 }}>Team Library</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:18, color:'var(--text)' }}>Build a Team Path</div>
          </div>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>x</button>
        </div>

        <div style={{ padding:'20px 24px 28px' }}>

          {/* Mode tabs */}
          <div style={{ display:'flex', gap:6, marginBottom:24, background:'var(--bg3)', padding:4, borderRadius:10, border:'1px solid var(--border)' }}>
            {[{v:'scratch',label:'From Scratch'},{v:'file',label:'From File'},{v:'youtube',label:'From YouTube'}].map(tab => (
              <button key={tab.v} onClick={() => { setMode(tab.v as any); setError('') }} style={{ flex:1, padding:'7px 10px', borderRadius:7, border:'none', background:mode===tab.v?'var(--bg2)':'transparent', color:mode===tab.v?accent:'var(--text2)', fontFamily:'var(--sans)', fontSize:12, fontWeight:mode===tab.v?500:400, cursor:'pointer' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Generating state */}
          {generating && (
            <div style={{ textAlign:'center' as const, padding:'40px 0' }}>
              <div style={{ width:36, height:36, border:'2px solid var(--border2)', borderTopColor:accent, borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}/>
              <div style={{ fontFamily:'var(--serif)', fontSize:18, color:'var(--text)', marginBottom:6 }}>Building your team path</div>
              <div style={{ fontSize:12, color:'var(--text2)' }}>{topic}</div>
              {streamText && <div style={{ marginTop:16, background:'var(--bg3)', borderRadius:8, padding:'10px 14px', fontFamily:'var(--mono)', fontSize:10, color:'var(--text3)', lineHeight:1.6, textAlign:'left' as const }}>{streamText}</div>}
            </div>
          )}

          {/* Review state — full curriculum tree shown before finalizing */}
          {!generating && curriculum && !savedId && (
            <div>
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:accent, textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:8 }}>Review before saving</div>
                <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>{curriculum.title}</div>
                {curriculum.overview && <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, marginBottom:12 }}>{curriculum.overview}</div>}
                <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6 }}>
                  {[`${curriculum.totalWeeks} weeks`,`${curriculum.daysPerWeek} days/week`,`${curriculum.sessionTime}/session`].map((chip:string,i:number) => (
                    <span key={i} style={{ fontSize:10, fontFamily:'var(--mono)', padding:'3px 9px', borderRadius:4, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)' }}>{chip}</span>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column' as const, gap:8, marginBottom:24, maxHeight:340, overflowY:'auto' as const }}>
                {(curriculum.weeks||[]).map((wk:any, wi:number) => (
                  <div key={wi} style={{ background:'var(--bg3)', border:`1px solid ${wi===0?accentBorder:'var(--border)'}`, borderRadius:10, overflow:'hidden' }}>
                    <div style={{ padding:'11px 14px', display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:28, height:28, borderRadius:6, background:accentBg, border:'1px solid '+accentBorder, fontFamily:'var(--mono)', fontSize:10, color:accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>W{wi+1}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{wk.theme}</div>
                        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:1 }}>{(wk.days||[]).length} sessions</div>
                      </div>
                    </div>
                    <div style={{ borderTop:'1px solid var(--border)', padding:'8px 12px', display:'flex', flexDirection:'column' as const, gap:5 }}>
                      {(wk.days||[]).map((d:any, di:number) => (
                        <div key={di} style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'7px 10px', background:'var(--bg2)', borderRadius:7 }}>
                          <div style={{ width:18, height:18, borderRadius:4, background:'var(--bg4)', fontFamily:'var(--mono)', fontSize:8, color:'var(--text3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>D{di+1}</div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', marginBottom:1 }}>{d.title}</div>
                            <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5 }}>{d.description}</div>
                          </div>
                          <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', flexShrink:0 }}>{d.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {error && <div style={{ padding:'8px 12px', borderRadius:7, fontSize:12, marginBottom:12, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>{error}</div>}
              <div style={{ display:'flex', gap:8, paddingTop:16, borderTop:'1px solid var(--border)' }}>
                <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex:2 }}>{saving ? 'Saving...' : 'Finalize & Save to Library'}</button>
                <button onClick={() => { setCurriculum(null); setError('') }} style={{ ...btnSecondary, flex:1 }}>Regenerate</button>
                <button onClick={onClose} style={{ ...btnSecondary, flex:1 }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Builder form */}
          {!generating && !curriculum && (
            <>
              {/* FILE MODE */}
              {mode === 'file' && (
                <div style={{ marginBottom:20 }}>
                  <input ref={fileRef} type='file' accept='.pdf,.docx,.txt' style={{ display:'none' }} onChange={e => { if(e.target.files?.[0]) handleFileUpload(e.target.files[0]) }}/>
                  {!pdfText ? (
                    <div onClick={() => fileRef.current?.click()} style={{ border:'2px dashed '+accentBorder, borderRadius:12, padding:'40px 24px', textAlign:'center' as const, cursor:'pointer', background:'var(--bg3)' }}>
                      {pdfLoading ? <div style={{ fontSize:13, color:'var(--text2)' }}>Reading file...</div> : <><div style={{ fontSize:28, marginBottom:8 }}>📁</div><div style={{ fontSize:13, color:'var(--text)' }}>Click to upload a file</div><div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>Supported: PDF, Word (.docx), Text (.txt)</div></>}
                    </div>
                  ) : (
                    <div style={{ background:'var(--bg3)', border:'1px solid #3fb95044', borderRadius:8, padding:'12px 14px', marginBottom:12 }}>
                      <div style={{ fontSize:12, color:'#3fb950', marginBottom:2 }}>File loaded: {pdfName}</div>
                      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{pdfText.length.toLocaleString()} characters</div>
                    </div>
                  )}
                  {pdfText && <div style={{ marginTop:12 }}><label style={lbl}>Topic name</label><input style={inp} value={topic} onChange={e=>setTopic(e.target.value)} /></div>}
                </div>
              )}

              {/* YOUTUBE MODE */}
              {mode === 'youtube' && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                    <input style={{ ...inp, flex:1 }} placeholder='https://youtube.com/watch?v=...' value={youtubeUrl} onChange={e=>setYoutubeUrl(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') fetchYouTubeTranscript() }}/>
                    <button onClick={fetchYouTubeTranscript} disabled={youtubeLoading||!youtubeUrl.trim()} style={{ ...btnPrimary, whiteSpace:'nowrap' as const }}>{youtubeLoading ? 'Loading...' : 'Fetch'}</button>
                  </div>
                  {youtubeTranscript && <><div style={{ fontSize:12, color:'#3fb950', marginBottom:12 }}>Transcript loaded · {youtubeTranscript.length.toLocaleString()} characters</div><label style={lbl}>Topic name</label><input style={inp} value={topic} onChange={e=>setTopic(e.target.value)} /></>}
                </div>
              )}

              {/* SCRATCH MODE - step wizard */}
              {mode === 'scratch' && (
                <>
                  {/* Step indicator */}
                  <div style={{ display:'flex', gap:4, marginBottom:20 }}>
                    {stepLabels.map((s,i) => (
                      <div key={i} style={{ flex:1, height:3, borderRadius:2, background: step>i?accent:step===i?accentBg:'var(--bg4)' }}/>
                    ))}
                  </div>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:16 }}>Step {step+1} of 5 — {stepLabels[step]}</div>

                  {step===0 && (
                    <div>
                      <label style={lbl}>Training Topic</label>
                      <input style={{ ...inp, marginBottom:10 }} placeholder='e.g. Data Privacy Compliance, Sales Fundamentals...' value={topic} onChange={e=>setTopic(e.target.value)} autoFocus/>
                      <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6, marginBottom:16 }}>
                        {TOPICS.map(t => <div key={t} onClick={()=>setTopic(t)} style={{ padding:'3px 10px', borderRadius:12, fontSize:11, border:'1px solid var(--border)', background:'var(--bg3)', color:'var(--text3)', cursor:'pointer' }}>{t}</div>)}
                      </div>
                      <label style={lbl}>Learning Goal (optional)</label>
                      <textarea style={{ ...inp, minHeight:56, resize:'vertical' as const, lineHeight:1.6, marginBottom:16 }} placeholder='e.g. All staff pass the compliance exam by Q3...' value={goal} onChange={e=>setGoal(e.target.value)}/>
                      <label style={lbl}>Level</label>
                      <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6 }}>
                        {LEVEL_OPTS.map(l => <div key={l} onClick={()=>setLevel(l)} style={{ padding:'6px 12px', borderRadius:16, border:'1px solid '+(level===l?accentBorder:'var(--border2)'), background:level===l?accentBg:'var(--bg3)', color:level===l?accent:'var(--text2)', fontSize:12, cursor:'pointer' }}>{l}</div>)}
                      </div>
                    </div>
                  )}

                  {step===1 && (
                    <div>
                      <label style={lbl}>Path Length</label>
                      <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6, marginBottom:16 }}>
                        {DUR_OPTS.map(d => <div key={d.weeks} onClick={()=>setDuration(d)} style={{ padding:'6px 12px', borderRadius:16, border:'1px solid '+(duration.weeks===d.weeks?accentBorder:'var(--border2)'), background:duration.weeks===d.weeks?accentBg:'var(--bg3)', color:duration.weeks===d.weeks?accent:'var(--text2)', fontSize:12, cursor:'pointer' }}>{d.label}</div>)}
                      </div>
                      <label style={lbl}>Session Length</label>
                      <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6, marginBottom:16 }}>
                        {TIME_OPTS.map(t => <div key={t} onClick={()=>setSessionTime(t)} style={{ padding:'6px 12px', borderRadius:16, border:'1px solid '+(sessionTime===t?accentBorder:'var(--border2)'), background:sessionTime===t?accentBg:'var(--bg3)', color:sessionTime===t?accent:'var(--text2)', fontSize:12, cursor:'pointer' }}>{t}</div>)}
                      </div>
                      <label style={lbl}>Study Days</label>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:5, marginBottom:8 }}>
                        {DAY_LABELS.map((d,i) => <div key={i} onClick={()=>toggleDay(i)} style={{ aspectRatio:'1', borderRadius:7, border:'1px solid '+(activeDays.includes(i)?accentBorder:'var(--border2)'), background:activeDays.includes(i)?accentBg:'var(--bg3)', color:activeDays.includes(i)?accent:'var(--text3)', cursor:'pointer', fontSize:10, fontFamily:'var(--mono)', display:'flex', alignItems:'center', justifyContent:'center' }}>{d}</div>)}
                      </div>
                      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{activeDays.length} days/week · {totalLessons} total sessions</div>
                    </div>
                  )}

                  {step===2 && (
                    <div>
                      <label style={lbl}>Learning Style</label>
                      <div style={{ display:'flex', flexDirection:'column' as const, gap:8, marginBottom:16 }}>
                        {STYLE_OPTS.map(s => <div key={s.v} onClick={()=>toggleStyle(s.v)} style={{ padding:'10px 14px', borderRadius:8, border:'1px solid '+(styles.includes(s.v)?accentBorder:'var(--border2)'), background:styles.includes(s.v)?accentBg:'var(--bg3)', cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ flex:1 }}><div style={{ fontSize:13, color:styles.includes(s.v)?accent:'var(--text)' }}>{s.label}</div><div style={{ fontSize:11, color:'var(--text3)' }}>{s.desc}</div></div>
                          {styles.includes(s.v) && <span style={{ color:accent }}>+</span>}
                        </div>)}
                      </div>
                      <label style={lbl}>Additional Notes (optional)</label>
                      <textarea style={{ ...inp, minHeight:56, resize:'vertical' as const, lineHeight:1.6 }} placeholder='e.g. Focus on practical scenarios, avoid jargon...' value={extra} onChange={e=>setExtra(e.target.value)}/>
                    </div>
                  )}

                  {step===3 && (
                    <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:10, padding:'16px 18px' }}>
                      <div style={{ fontFamily:'var(--serif)', fontSize:16, color:'var(--text)', marginBottom:12 }}>{topic || 'Your Team Path'}</div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                        {[{label:'Level',value:level},{label:'Duration',value: trainingMode==='quick' ? quickDuration : trainingMode==='multiday' ? multiDayCount.label : duration.label},{label:'Per session',value:sessionTime},{label:'Days/week',value:activeDays.length+' ('+daysLabel+')'},{label:'Total sessions',value:String(totalLessons)},{label:'Style',value:styles.join(', ')}].map((r,i) => (
                          <div key={i} style={{ padding:'8px 10px', background:'var(--bg2)', borderRadius:7 }}>
                            <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{r.label}</div>
                            <div style={{ fontSize:12, color:'var(--text)', fontWeight:500, marginTop:2 }}>{r.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step===4 && (
                    <div>
                      <label style={lbl}>Include a final test for members?</label>
                      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
                        <div onClick={() => setAddAssessment(true)} style={{ flex:1, padding:'14px', borderRadius:9, border:'1px solid '+(addAssessment?accentBorder:'var(--border2)'), background:addAssessment?accentBg:'var(--bg3)', color:addAssessment?accent:'var(--text2)', cursor:'pointer', textAlign:'center' as const, fontSize:13, fontWeight:addAssessment?600:400 }}>
                          ✓ Yes — include a test
                        </div>
                        <div onClick={() => setAddAssessment(false)} style={{ flex:1, padding:'14px', borderRadius:9, border:'1px solid '+(!addAssessment?accentBorder:'var(--border2)'), background:!addAssessment?accentBg:'var(--bg3)', color:!addAssessment?accent:'var(--text2)', cursor:'pointer', textAlign:'center' as const, fontSize:13, fontWeight:!addAssessment?600:400 }}>
                          Skip — no test
                        </div>
                      </div>
                      {addAssessment && (
                        <>
                          <label style={lbl}>Number of questions</label>
                          <div style={{ display:'flex', gap:6, marginBottom:16 }}>
                            {[5,10,15,20].map(n => (
                              <div key={n} onClick={() => setNumQuestions(n)} style={{ padding:'6px 16px', borderRadius:16, border:'1px solid '+(numQuestions===n?accentBorder:'var(--border2)'), background:numQuestions===n?accentBg:'var(--bg3)', color:numQuestions===n?accent:'var(--text2)', fontSize:12, cursor:'pointer' }}>{n}</div>
                            ))}
                          </div>
                          <label style={lbl}>Pass threshold</label>
                          <div style={{ display:'flex', gap:6 }}>
                            {[60,70,80,90].map(p => (
                              <div key={p} onClick={() => setPassThreshold(p)} style={{ padding:'6px 16px', borderRadius:16, border:'1px solid '+(passThreshold===p?accentBorder:'var(--border2)'), background:passThreshold===p?accentBg:'var(--bg3)', color:passThreshold===p?accent:'var(--text2)', fontSize:12, cursor:'pointer' }}>{p}%</div>
                            ))}
                          </div>
                          <div style={{ marginTop:12, fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)' }}>
                            Members must score {passThreshold}% or above to pass. Results are posted to your admin dashboard.
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}

              {error && <div style={{ padding:'8px 12px', borderRadius:7, fontSize:12, marginTop:12, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>{error}</div>}

              {/* Footer buttons */}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:24, paddingTop:16, borderTop:'1px solid var(--border)' }}>
                <button onClick={() => { if(mode !== 'scratch' || step === 0) onClose(); else setStep(s => s-1) }} style={btnSecondary}>
                  {mode !== 'scratch' || step === 0 ? 'Cancel' : 'Back'}
                </button>
                {mode === 'scratch' && step < 4 && (
                  <button onClick={() => {
                    if(step===0 && !topic.trim()) { setError('Enter a topic'); return }
                    if(step===1 && activeDays.length===0) { setError('Pick at least one day'); return }
                    setError(''); setStep(s => s+1)
                  }} style={btnPrimary}>Next</button>
                )}
                {((mode === 'scratch' && step === 4) || (mode === 'file' && pdfText) || (mode === 'youtube' && youtubeTranscript)) && (
                  <button onClick={generate} style={btnPrimary}>Generate with Claude</button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}