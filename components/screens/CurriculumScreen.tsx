'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveCurriculum } from '@/lib/db'
import { useRouter, useSearchParams } from 'next/navigation'

const TOPICS = ['Spanish','Japanese','Python','Guitar','Drawing','Calculus','Photography','Chess','Public Speaking','Investing Basics','Creative Writing','Music Theory']
const LEVEL_OPTS = ['Complete Beginner','Beginner','Intermediate','Advanced']
const DUR_OPTS = [{ label:'2 Weeks', weeks:2 },{ label:'4 Weeks', weeks:4 },{ label:'6 Weeks', weeks:6 },{ label:'8 Weeks', weeks:8 },{ label:'12 Weeks', weeks:12 }]
const TIME_OPTS = ['15 min','20 min','30 min','45 min','60 min']
const DAY_LABELS = ['M','T','W','T','F','S','S']
const STYLE_OPTS = [
  { v:'visual',label:'Visual',desc:'Images, diagrams, examples' },
  { v:'structured',label:'Structured',desc:'Lists, frameworks, steps' },
  { v:'storytelling',label:'Story-driven',desc:'Narrative and context' },
  { v:'practical',label:'Hands-on',desc:'Exercises and doing' },
  { v:'mixed',label:'Mixed',desc:'Variety each session' },
]
const TYPE_COLORS: Record<string,string> = { lesson:'var(--blue-text)',flashcards:'var(--purple-text)',exercise:'var(--green-text)',review:'var(--amber2)',practice:'var(--green-text)' }
const TYPE_BGS: Record<string,string> = { lesson:'var(--blue-bg)',flashcards:'var(--purple-bg)',exercise:'var(--green-bg)',review:'var(--amber-bg)',practice:'var(--green-bg)' }
const FREE_MAX_PATHS = 2
const FREE_MAX_WEEKS = 4

function StepProgress({ step }: { step: number }) {
  const steps = ['Topic','Schedule','Style','Review']
  return (
    <div style={{ display:'flex', alignItems:'center', marginBottom:36 }}>
      {steps.map((s,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', flex: i<steps.length-1?1:undefined }}>
          <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'center' }}>
            <div style={{ width:28, height:28, borderRadius:'50%', border:`1px solid ${step>i?'var(--green-border)':step===i?'var(--amber)':'var(--border2)'}`, background:step>i?'var(--green-bg)':step===i?'var(--amber-bg2)':'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontFamily:'var(--mono)', color:step>i?'var(--green-text)':step===i?'var(--amber)':'var(--text3)' }}>
              {step>i?'+':i+1}
            </div>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', color:step===i?'var(--amber)':'var(--text3)', marginTop:4, whiteSpace:'nowrap' as const }}>{s}</div>
          </div>
          {i<steps.length-1 && <div style={{ flex:1, height:1, background:step>i?'var(--green-border)':'var(--border2)', margin:'0 4px', marginBottom:14 }}/>}
        </div>
      ))}
    </div>
  )
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

export default function CurriculumScreen() {
  const [mode, setMode] = useState<'scratch'|'file'|'youtube'>('scratch')
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
  const [isPro, setIsPro] = useState(false)
  const [pathCount, setPathCount] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const [showProTab, setShowProTab] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<number|null>(null)
  const [selectedDay, setSelectedDay] = useState<number|null>(null)

  // PDF state
  const [pdfText, setPdfText] = useState('')
  const [pdfName, setPdfName] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // YouTube state
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [youtubeLoading, setYoutubeLoading] = useState(false)
  const [youtubeTranscript, setYoutubeTranscript] = useState('')
  const [youtubeTitle, setYoutubeTitle] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Pre-fill topic from URL param (e.g. from related topics suggester)
    const t = searchParams.get('topic')
    if (t) setTopic(decodeURIComponent(t))

    createClient().auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
        const supabase = createClient()
        const [profileRes, currRes] = await Promise.all([
          (supabase.from('profiles') as any).select('is_pro').eq('id', data.user.id).single(),
          (supabase.from('curricula') as any).select('id').eq('user_id', data.user.id)
        ])
        setIsPro(profileRes.data?.is_pro || false)
        setPathCount(currRes.data?.length || 0)
      }
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

  const handleFileUpload = async (file: File) => {
    if (!isPro) { setShowPaywall(true); return }
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
        const arrayBuffer2 = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer2) }).promise
        let pdfText2 = ''
        for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          pdfText2 += content.items.map((item: any) => ('str' in item ? item.str : '')).join(' ') + '\n'
        }
        text = pdfText2
      }
      setPdfText(text.slice(0, 12000))
      setTopic(file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
    } catch(e: any) { setError('Could not read file. Please upload a PDF, Word document (.docx), or text file (.txt).') }
    finally { setPdfLoading(false) }
  }
  const fetchYouTubeTranscript = async () => {
    if (!isPro) { setShowPaywall(true); return }
    const videoId = extractYouTubeId(youtubeUrl)
    if (!videoId) { setError('Could not find a YouTube video ID in that URL.'); return }
    setYoutubeLoading(true)
    setError('')
    try {
      const res = await fetch('/api/youtube-transcript?videoId=' + videoId)
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Could not fetch transcript')
      setYoutubeTranscript(data.transcript)
      setYoutubeTitle('YouTube video ' + videoId)
      setTopic('YouTube: ' + videoId)
    } catch(e: any) {
      setError(e.message || 'Could not fetch transcript. The video may not have captions.')
    } finally {
      setYoutubeLoading(false)
    }
  }

  const generate = async () => {
    if (!topic.trim()) { setError('Enter a topic first'); return }
    if (!isPro && pathCount >= FREE_MAX_PATHS) { setShowPaywall(true); return }
    setError(''); setGenerating(true); setStreamText(''); setCurriculum(null); setSavedId(null)

    let prompt = ''
    if (mode === 'file' && pdfText) {
      prompt = `You are an expert educator. A user has uploaded a document and wants to learn from it. Extract the key topics and create a structured learning curriculum as a single valid JSON object. No markdown. No explanation.\n\nDocument content (excerpt):\n${pdfText}\n\nLevel: ${level}\nDuration: ${duration.weeks} weeks\nDays per week: ${activeDays.length} (${daysLabel})\nSession length: ${sessionTime}\nLearning style: ${styles.join(', ')}\n\nReturn ONLY valid JSON:\n{\n  "title": "Curriculum title based on document",\n  "subtitle": "One-line subtitle",\n  "overview": "2-3 sentence overview of what this curriculum covers.",\n  "totalWeeks": ${duration.weeks},\n  "daysPerWeek": ${activeDays.length},\n  "sessionTime": "${sessionTime}",\n  "level": "${level}",\n  "weeks": [{"week": 1,"theme": "Week theme","milestone": "By end of week you can...","days": [{"day": 1,"title": "Day title","description": "One sentence.","type": "lesson","duration": "${sessionTime}"}],"quizCount": 3}]\n}\n\nRules: Exactly ${duration.weeks} weeks, exactly ${activeDays.length} days each. Base everything on the document content. Vary types: lesson, flashcards, exercise, review, practice.`
    } else if (mode === 'youtube' && youtubeTranscript) {
      prompt = `You are an expert educator. A user has provided a YouTube video transcript and wants to learn from it. Extract the key topics and create a structured learning curriculum as a single valid JSON object. No markdown. No explanation.\n\nVideo transcript (excerpt):\n${youtubeTranscript}\n\nLevel: ${level}\nDuration: ${duration.weeks} weeks\nDays per week: ${activeDays.length} (${daysLabel})\nSession length: ${sessionTime}\nLearning style: ${styles.join(', ')}\n\nReturn ONLY valid JSON:\n{\n  "title": "Curriculum title based on video content",\n  "subtitle": "One-line subtitle",\n  "overview": "2-3 sentence overview of what this curriculum covers.",\n  "totalWeeks": ${duration.weeks},\n  "daysPerWeek": ${activeDays.length},\n  "sessionTime": "${sessionTime}",\n  "level": "${level}",\n  "weeks": [{"week": 1,"theme": "Week theme","milestone": "By end of week you can...","days": [{"day": 1,"title": "Day title","description": "One sentence.","type": "lesson","duration": "${sessionTime}"}],"quizCount": 3}]\n}\n\nRules: Exactly ${duration.weeks} weeks, exactly ${activeDays.length} days each. Base everything on the video content. Vary types: lesson, flashcards, exercise, review, practice.`
    } else {
      prompt = `Create a personalised learning curriculum as a single valid JSON object. No markdown. No explanation.\n\nTopic: "${topic}"\nGoal: "${goal||'Build solid proficiency'}"\nLevel: ${level}\nDuration: ${duration.weeks} weeks\nDays per week: ${activeDays.length} (${daysLabel})\nSession length: ${sessionTime}\nLearning style: ${styles.join(', ')}\n${extra?`Special requests: ${extra}`:''}\n\nReturn ONLY valid JSON:\n{\n  "title": "Engaging curriculum title",\n  "subtitle": "One-line subtitle",\n  "overview": "2-3 sentence overview.",\n  "totalWeeks": ${duration.weeks},\n  "daysPerWeek": ${activeDays.length},\n  "sessionTime": "${sessionTime}",\n  "level": "${level}",\n  "weeks": [{\n    "week": 1,\n    "theme": "Week theme title",\n    "milestone": "By end of this week you can...",\n    "days": [{ "day": 1, "title": "Day activity title", "description": "One sentence.", "type": "lesson", "duration": "${sessionTime}" }],\n    "quizCount": 3\n  }]\n}\n\nRules: Exactly ${duration.weeks} weeks, exactly ${activeDays.length} days each. Vary types: lesson, flashcards, exercise, review, practice.`
    }

    try {
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ type:'curriculum', stream:true, messages:[{ role:'user', content:prompt }] }) })
      if (!res.ok) { const e = await res.json(); throw new Error(e.error||'API error') }
      const reader = res.body!.getReader(); const decoder = new TextDecoder(); let full = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        const chunk = decoder.decode(value)
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim(); if (data==='[DONE]') break
          try { const p = JSON.parse(data); if(p.text){ full+=p.text; setStreamText(full.slice(-400)) } } catch {}
        }
      }
      const match = full.match(/\{[\s\S]*\}/); if (!match) throw new Error('Could not parse curriculum')
      const parsed = JSON.parse(match[0]); setCurriculum(parsed); setOpenWeeks({0:true})
      if (userId) {
        setSaving(true)
        const topicLabel = mode === 'file' ? (pdfName || topic) : mode === 'youtube' ? (youtubeTitle || topic) : topic
        try { const saved = await saveCurriculum(userId,{topic:topicLabel,level,durLabel:duration.label,days:activeDays.length,time:sessionTime,style:styles.join(', '),curriculum:parsed}); setSavedId(saved.id); setPathCount(c=>c+1) }
        catch(e: any) { console.error('Save failed:',e.message) } finally { setSaving(false) }
      }
    } catch(e: any) { setError(e.message) } finally { setGenerating(false); setStreamText('') }
  }

  if (showPaywall) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', padding:24 }}>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'36px 40px', width:'100%', maxWidth:460, textAlign:'center' as const }}>
        <div style={{ width:56, height:56, borderRadius:14, background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'var(--amber)' }}>PRO</div>
        <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', marginBottom:8 }}>Unlock unlimited paths</div>
        <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.65, marginBottom:24 }}>You have used your {FREE_MAX_PATHS} free learning paths. Upgrade to Pro for unlimited curricula, PDF uploads, YouTube imports, Study Mode, and the AI Tutor.</div>
        <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 18px', marginBottom:24, textAlign:'left' as const }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:10 }}>Pro includes</div>
          {['Unlimited learning paths','PDF → Curriculum','YouTube → Curriculum','Study Mode','AI Tutor','Priority support'].map((f,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7, fontSize:13, color:'var(--text2)' }}>
              <span style={{ color:'var(--green-text)', fontSize:12 }}>+</span> {f}
            </div>
          ))}
        </div>
        <button onClick={()=>window.open(`https://pay.rev.cat/sffmwnoklfherqwk/${userId||''}`,`_blank`)} style={{ width:'100%', padding:'13px', borderRadius:10, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer', marginBottom:10 }}>Upgrade to Pro — $9.99/mo</button>
        <button onClick={() => setShowPaywall(false)} style={{ width:'100%', padding:'11px', borderRadius:10, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Back</button>
      </div>
    </div>
  )

  if (generating) return (
    <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'center', paddingTop:60, padding:32, textAlign:'center' as const }}>
      <div style={{ width:40, height:40, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 24px' }}/>
      <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:8 }}>Claude is designing your path</div>
      <div style={{ fontSize:13, color:'var(--text2)', marginBottom:24 }}>
        {mode === 'file' ? 'Building curriculum from ' + pdfName : mode === 'youtube' ? 'Building curriculum from YouTube video' : 'Building a ' + duration.weeks + '-week curriculum for ' + topic}
      </div>
      {streamText && <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'12px 14px', fontFamily:'var(--mono)', fontSize:10.5, color:'var(--text3)', lineHeight:1.6, maxHeight:120, overflow:'hidden', maxWidth:440, width:'100%', textAlign:'left' as const }}>{streamText}</div>}
    </div>
  )

  if (curriculum) return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:740, margin:'0 auto', padding:'28px 32px 80px' }}>
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'24px 26px', marginBottom:20 }}>
          <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:6 }}>{level} · {duration.label} Path {mode === 'file' ? '· From File' : mode === 'youtube' ? '· From YouTube' : ''}</div>
          <div style={{ fontFamily:'var(--serif)', fontSize:26, color:'var(--text)', marginBottom:6, lineHeight:1.2 }}>{curriculum.title}</div>
          <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.65, marginBottom:16 }}>{curriculum.overview}</div>
          <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6, marginBottom:savedId?12:0 }}>
            {[`${curriculum.totalWeeks} weeks`,`${curriculum.daysPerWeek} days/week`,sessionTime+'/session',`${totalLessons} total sessions`].map((chip,i) => (
              <span key={i} style={{ fontSize:10, fontFamily:'var(--mono)', padding:'3px 9px', borderRadius:4, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)' }}>{chip}</span>
            ))}
            <span style={{ fontSize:10, fontFamily:'var(--mono)', padding:'3px 9px', borderRadius:4, border:'1px solid rgba(212,133,58,0.3)', background:'var(--amber-bg)', color:'var(--amber2)' }}>Generated by Claude</span>
          </div>
          {saving && <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:8 }}>Saving...</div>}
          {savedId && <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--green-text)', marginTop:8 }}>Saved to your account</div>}
        </div>
        <div style={{ display:'flex', gap:10, marginBottom:24 }}>
          <button onClick={() => router.push('/app/lesson?id='+savedId)} style={{ flex:2, padding:13, borderRadius:10, border:'1px solid var(--amber)', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Start Learning</button>
          <button onClick={() => router.push('/app')} style={{ flex:1, padding:13, borderRadius:10, border:'1px solid var(--border)', background:'var(--bg2)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Go to Home</button>
          <button onClick={() => { setCurriculum(null); setSavedId(null); setStep(0); setPdfText(''); setPdfName(''); setYoutubeTranscript(''); setYoutubeUrl('') }} style={{ flex:1, padding:13, borderRadius:10, border:'1px solid var(--border)', background:'var(--bg2)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Build Another</button>
        </div>
        {selectedWeek!==null && selectedDay!==null && (() => {
          const wk = curriculum.weeks[selectedWeek]; const d = wk?.days[selectedDay]; if (!d) return null
          return (
            <div style={{ background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.3)', borderRadius:10, padding:'14px 18px', marginBottom:16, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:4 }}>Selected · Week {selectedWeek+1}, Day {selectedDay+1}</div>
                <div style={{ fontSize:14, fontWeight:500, color:'var(--text)' }}>{d.title}</div>
              </div>
              <button onClick={() => router.push('/app/lesson?id='+savedId)} style={{ padding:'9px 18px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap' as const }}>Start this lesson</button>
            </div>
          )
        })()}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{(curriculum.weeks||[]).length} Weeks · Click any lesson to start</div>
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
                  {wk.milestone && <div style={{ padding:'10px 16px', background:'var(--amber-bg)', borderBottom:'1px solid rgba(212,133,58,0.15)' }}><span style={{ fontSize:11.5, color:'var(--amber2)', lineHeight:1.4 }}><strong>Goal:</strong> {wk.milestone}</span></div>}
                  <div style={{ borderTop:'1px solid var(--border)', padding:'12px 14px' }}>
                    <div style={{ display:'flex', flexDirection:'column' as const, gap:7 }}>
                      {(wk.days||[]).map((d: any, di: number) => {
                        const isSelected = selectedWeek===wi && selectedDay===di
                        return (
                          <div key={di} onClick={() => { setSelectedWeek(wi); setSelectedDay(di) }} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 12px', background:isSelected?'var(--amber-bg)':'var(--bg3)', border:`1px solid ${isSelected?'rgba(212,133,58,0.4)':'var(--border)'}`, borderRadius:8, cursor:'pointer', transition:'all 0.13s' }}>
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

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:680, margin:'0 auto', padding:'32px 32px 80px' }}>
        {!isPro && (
          <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', marginBottom:20, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
            <div style={{ fontSize:12, color:'var(--text2)' }}>Free plan: <span style={{ color:'var(--amber)', fontFamily:'var(--mono)' }}>{pathCount}/{FREE_MAX_PATHS}</span> paths · Max {FREE_MAX_WEEKS} weeks</div>
            <button onClick={()=>window.open('https://pay.rev.cat/sffmwnoklfherqwk/'+(userId||''),'_blank')} style={{ padding:'4px 10px', borderRadius:5, background:'var(--amber)', border:'none', color:'#0a0b0f', fontSize:11, fontFamily:'var(--sans)', fontWeight:500, cursor:'pointer', whiteSpace:'nowrap' as const }}>Upgrade</button>
          </div>
        )}

        {/* Mode tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:28, background:'var(--bg3)', padding:4, borderRadius:10, border:'1px solid var(--border)' }}>
          {[
            { v:'scratch', label:'✦ From Scratch', desc:'Type a topic' },
            { v:'file', label:'📁 From File', desc:'PDF, Word, or Text', pro:true },
            { v:'youtube', label:'▶ From YouTube', desc:'Paste a URL', pro:true },
          ].map(tab => (
                <button key={tab.v} onClick={() => { if((tab as any).pro && !isPro){ setShowProTab(true); return }; setMode(tab.v as any); setError('') }} style={{ flex:1, padding:'8px 10px', borderRadius:7, border:'none', background:mode===tab.v?'var(--bg2)':'transparent', color:(tab as any).pro && !isPro?'var(--text3)':mode===tab.v?'var(--amber)':'var(--text2)', fontFamily:'var(--sans)', fontSize:12, fontWeight:mode===tab.v?500:400, cursor:'pointer', transition:'all 0.15s', position:'relative' as const, opacity:(tab as any).pro && !isPro?0.6:1 }}>
              {tab.label}
              {tab.pro && !isPro && <span style={{ marginLeft:4, fontSize:8, fontFamily:'var(--mono)', padding:'1px 4px', borderRadius:3, background:'var(--amber-bg)', color:'var(--amber)', border:'1px solid rgba(212,133,58,0.3)' }}>PRO</span>}
            </button>
          ))}
        </div>

        {/* PDF MODE */}
        {mode === 'file' && (
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>Upload a document</div>
            <div style={{ fontSize:12.5, color:'var(--text3)', marginBottom:20 }}>Upload a PDF and Claude will extract the key topics and build a curriculum from it.</div>
            <input ref={fileRef} type='file' accept='.pdf,.docx,.txt' style={{ display:'none' }} onChange={e => { if(e.target.files?.[0]) handleFileUpload(e.target.files[0]) }}/>
            {!pdfText ? (
              <div onClick={() => { if(!isPro){setShowPaywall(true);return}; fileRef.current?.click() }} style={{ border:`2px dashed ${pdfLoading?'var(--amber)':'var(--border2)'}`, borderRadius:12, padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', background:'var(--bg3)', transition:'all 0.15s' }}>
                {pdfLoading ? (
                  <>
                    <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }}/>
                    <div style={{ fontSize:13, color:'var(--text2)' }}>Reading PDF...</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize:32, marginBottom:12 }}>📄</div>
                    <div style={{ fontSize:14, fontWeight:500, color:'var(--text)', marginBottom:6 }}>Click to upload a file</div>
                    <div style={{ fontSize:12, color:'var(--text3)' }}>Supported: PDF, Word (.docx), Text (.txt)</div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ background:'var(--bg3)', border:'1px solid var(--green-border)', borderRadius:10, padding:'14px 16px', marginBottom:16 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--green-text)', marginBottom:2 }}>File loaded</div>
                    <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)' }}>{pdfName} · {pdfText.length.toLocaleString()} characters extracted</div>
                  </div>
                  <button onClick={() => { setPdfText(''); setPdfName(''); setTopic('') }} style={{ fontSize:11, padding:'4px 9px', borderRadius:5, border:'1px solid var(--border2)', background:'var(--bg4)', color:'var(--text3)', cursor:'pointer', fontFamily:'var(--sans)' }}>Remove</button>
                </div>
              </div>
            )}
            {pdfText && (
              <div style={{ marginTop:16 }}>
                <label style={lbl}>Topic name (auto-filled from filename)</label>
                <input style={inp} value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. Machine Learning Fundamentals"/>
              </div>
            )}
          </div>
        )}

        {/* YOUTUBE MODE */}
        {mode === 'youtube' && (
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>Learn from a YouTube video</div>
            <div style={{ fontSize:12.5, color:'var(--text3)', marginBottom:20 }}>Paste a YouTube URL and Claude will turn the video transcript into a full curriculum.</div>
            <div style={{ marginBottom:12 }}>
              <label style={lbl}>YouTube URL</label>
              <div style={{ display:'flex', gap:8 }}>
                <input style={{ ...inp, flex:1 }} placeholder="https://youtube.com/watch?v=..." value={youtubeUrl} onChange={e=>setYoutubeUrl(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') fetchYouTubeTranscript() }}/>
                <button onClick={fetchYouTubeTranscript} disabled={youtubeLoading||!youtubeUrl.trim()} style={{ padding:'10px 16px', borderRadius:8, border:'none', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap' as const, flexShrink:0 }}>
                  {youtubeLoading ? 'Loading...' : 'Fetch'}
                </button>
              </div>
            </div>
            {youtubeTranscript && (
              <div style={{ background:'var(--bg3)', border:'1px solid var(--green-border)', borderRadius:10, padding:'14px 16px', marginBottom:16 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--green-text)', marginBottom:2 }}>✓ Transcript loaded</div>
                    <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)' }}>{youtubeTranscript.length.toLocaleString()} characters · Ready to generate</div>
                  </div>
                  <button onClick={() => { setYoutubeTranscript(''); setYoutubeUrl(''); setYoutubeTitle(''); setTopic('') }} style={{ fontSize:11, padding:'4px 9px', borderRadius:5, border:'1px solid var(--border2)', background:'var(--bg4)', color:'var(--text3)', cursor:'pointer', fontFamily:'var(--sans)' }}>Remove</button>
                </div>
              </div>
            )}
            {youtubeTranscript && (
              <div style={{ marginTop:16 }}>
                <label style={lbl}>Topic name</label>
                <input style={inp} value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. Machine Learning with Andrew Ng"/>
              </div>
            )}
          </div>
        )}

        {/* FROM SCRATCH — step wizard */}
        {mode === 'scratch' && (
          <>
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
                  <label style={lbl}>Your Goal (optional)</label>
                  <textarea style={{ ...inp, minHeight:56, resize:'vertical' as const, lineHeight:1.6 }} placeholder="e.g. Hold a basic conversation before my trip to Japan..." value={goal} onChange={e=>setGoal(e.target.value)}/>
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
                    {DUR_OPTS.map(d => {
                      const locked = !isPro && d.weeks > FREE_MAX_WEEKS
                      return <div key={d.weeks} onClick={() => { if(!locked) setDuration(d) }} style={{ padding:'7px 13px', borderRadius:20, border:`1px solid ${duration.weeks===d.weeks?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:duration.weeks===d.weeks?'var(--amber-bg2)':'var(--bg3)', color:locked?'var(--text3)':duration.weeks===d.weeks?'var(--amber2)':'var(--text2)', fontSize:12, cursor:locked?'not-allowed':'pointer', opacity:locked?0.4:1 }}>{d.label}{locked?' (Pro)':''}</div>
                    })}
                  </div>
                  {!isPro && <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:6 }}>Free: max {FREE_MAX_WEEKS} weeks. Upgrade for longer paths.</div>}
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
                <div style={{ fontSize:12.5, color:'var(--text3)', marginBottom:20 }}>Pick all that fit.</div>
                <div style={{ display:'flex', flexDirection:'column' as const, gap:8, marginBottom:20 }}>
                  {STYLE_OPTS.map(s => <div key={s.v} onClick={()=>toggleStyle(s.v)} style={{ padding:'10px 14px', borderRadius:9, border:`1px solid ${styles.includes(s.v)?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:styles.includes(s.v)?'var(--amber-bg2)':'var(--bg3)', cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:500, color:styles.includes(s.v)?'var(--amber2)':'var(--text)', marginBottom:1 }}>{s.label}</div><div style={{ fontSize:11, color:'var(--text3)' }}>{s.desc}</div></div>
                    {styles.includes(s.v) && <span style={{ color:'var(--amber)', fontSize:14 }}>+</span>}
                  </div>)}
                </div>
                <div style={{ marginBottom:20 }}>
                  <label style={lbl}>Anything else? (optional)</label>
                  <textarea style={{ ...inp, minHeight:64, resize:'vertical' as const, lineHeight:1.6 }} placeholder="e.g. Focus on Latin American Spanish..." value={extra} onChange={e=>setExtra(e.target.value)}/>
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
                  <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:4 }}>{topic||'Your Learning Path'}</div>
                  {goal && <div style={{ fontSize:13, color:'var(--text2)', marginBottom:16, fontStyle:'italic' }}>"{goal}"</div>}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                    {[{label:'Level',value:level},{label:'Duration',value:duration.label},{label:'Per session',value:sessionTime},{label:'Days/week',value:`${activeDays.length} (${daysLabel})`},{label:'Total sessions',value:`${totalLessons}`},{label:'Style',value:styles.join(', ')}].map((r,i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', background:'var(--bg3)', borderRadius:7 }}>
                        <div><div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{r.label}</div><div style={{ fontSize:12.5, color:'var(--text)', fontWeight:500 }}>{r.value}</div></div>
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
          </>
        )}

        {/* Schedule + Style for PDF/YouTube modes */}
        {(mode === 'file' || mode === 'youtube') && (pdfText || youtubeTranscript) && (
          <div>
            <div style={{ marginBottom:14 }}>
              <label style={lbl}>Your level</label>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:7, marginBottom:14 }}>
                {LEVEL_OPTS.map(l => <div key={l} onClick={()=>setLevel(l)} style={{ padding:'7px 13px', borderRadius:20, border:`1px solid ${level===l?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:level===l?'var(--amber-bg2)':'var(--bg3)', color:level===l?'var(--amber2)':'var(--text2)', fontSize:12, cursor:'pointer' }}>{l}</div>)}
              </div>
              <label style={lbl}>Path length</label>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:7, marginBottom:14 }}>
                {DUR_OPTS.map(d => {
                  const locked = !isPro && d.weeks > FREE_MAX_WEEKS
                  return <div key={d.weeks} onClick={() => { if(!locked) setDuration(d) }} style={{ padding:'7px 13px', borderRadius:20, border:`1px solid ${duration.weeks===d.weeks?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:duration.weeks===d.weeks?'var(--amber-bg2)':'var(--bg3)', color:locked?'var(--text3)':duration.weeks===d.weeks?'var(--amber2)':'var(--text2)', fontSize:12, cursor:locked?'not-allowed':'pointer', opacity:locked?0.4:1 }}>{d.label}{locked?' (Pro)':''}</div>
                })}
              </div>
              <label style={lbl}>Session length</label>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:7, marginBottom:14 }}>
                {TIME_OPTS.map(t => <div key={t} onClick={()=>setSessionTime(t)} style={{ padding:'7px 13px', borderRadius:20, border:`1px solid ${sessionTime===t?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:sessionTime===t?'var(--amber-bg2)':'var(--bg3)', color:sessionTime===t?'var(--amber2)':'var(--text2)', fontSize:12, cursor:'pointer' }}>{t}</div>)}
              </div>
              <label style={lbl}>Study days</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:5, marginBottom:8 }}>
                {DAY_LABELS.map((d,i) => <div key={i} onClick={()=>toggleDay(i)} style={{ aspectRatio:'1', borderRadius:7, border:`1px solid ${activeDays.includes(i)?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:activeDays.includes(i)?'var(--amber-bg2)':'var(--bg3)', color:activeDays.includes(i)?'var(--amber2)':'var(--text3)', cursor:'pointer', fontSize:10, fontFamily:'var(--mono)', display:'flex', alignItems:'center', justifyContent:'center' }}>{d}</div>)}
              </div>
            </div>
            {error && <div style={{ padding:'9px 12px', borderRadius:7, fontSize:12, marginBottom:12, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>{error}</div>}
            <div style={{ paddingTop:20, borderTop:'1px solid var(--border)' }}>
              <button style={{ ...nextBtn, width:'100%', padding:'12px' }} onClick={generate}>Generate curriculum with Claude</button>
            </div>
          </div>
        )}

        {/* Show prompt to upload/fetch if nothing loaded yet in PDF/YouTube mode */}
        {(mode === 'file' && !pdfText && !pdfLoading) && error && (
          <div style={{ padding:'9px 12px', borderRadius:7, fontSize:12, marginTop:12, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>{error}</div>
        )}
        {(mode === 'youtube' && !youtubeTranscript) && error && (
          <div style={{ padding:'9px 12px', borderRadius:7, fontSize:12, marginTop:12, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>{error}</div>
        )}

      </div>
      {showProTab && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={() => setShowProTab(false)}>
          <div style={{ background:'var(--bg2)', border:'1px solid rgba(212,133,58,0.3)', borderRadius:20, padding:'36px 32px', maxWidth:400, width:'100%', textAlign:'center' as const }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:32, marginBottom:16 }}>◆</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:8 }}>Pro Feature</div>
            <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.7, marginBottom:28 }}>PDF and YouTube curriculum generation is a Learnpath Pro feature. Upgrade to unlock unlimited paths, AI Tutor, Study Mode, and more.</div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:10 }}>
              <button onClick={() => window.open('https://pay.rev.cat/sffmwnoklfherqwk/'+(userId||''), '_blank')} style={{ padding:'12px', borderRadius:9, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer' }}>Upgrade to Pro</button>
              <button onClick={() => setShowProTab(false)} style={{ padding:'11px', borderRadius:9, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Back to builder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
