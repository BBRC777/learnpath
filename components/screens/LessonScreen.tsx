'use client'
import { getUpgradeUrl } from '@/lib/upgrade'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import posthog from 'posthog-js'
import { BADGES, loadCurricula, updateCurriculumProgress, updateStreak, logActivity, getCachedLesson, cacheLesson, clearCachedLesson, completeLessonAndAwardXP, loadStreak, checkAndAwardBadges, getGlobalCachedLesson, setGlobalCachedLesson, getProfile, getAssessment, saveAssessmentResult, isProActive, markUpsellShown, getLessonUsageToday, incrementLessonUsage, FREE_DAILY_LESSONS } from '@/lib/db'
import { useRouter, useSearchParams } from 'next/navigation'
import WeekQuizOverlay from '@/components/screens/WeekQuizOverlay'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

async function fetchPexelsImage(query: string): Promise<string|null> {
  try {
    const key = process.env.NEXT_PUBLIC_PEXELS_API_KEY
    if (!key) return null
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`, {
      headers: { Authorization: key }
    })
    if (!res.ok) return null
    const data = await res.json()
    const photos = data?.photos || []
    if (photos.length === 0) return null
    // Pick a random photo from top 5 for variety
    const photo = photos[Math.floor(Math.random() * Math.min(photos.length, 5))]
    return photo?.src?.large || photo?.src?.medium || null
  } catch { return null }
}

async function fetchUnsplashImage(query: string): Promise<string|null> {
  try {
    const key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    if (!key) return null
    const res = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${key}`)
    if (!res.ok) return null
    const data = await res.json()
    return data?.urls?.regular || null
  } catch { return null }
}

async function fetchGeneratedImage(query: string): Promise<string|null> {
  try {
    const res = await fetch('/api/lesson-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.url || null
  } catch { return null }
}

async function fetchBestImage(query: string): Promise<string|null> {
  const gen = await fetchGeneratedImage(query)
  if (gen) return gen
  const pexels = await fetchPexelsImage(query)
  if (pexels) return pexels
  return fetchUnsplashImage(query)
}

function extractYouTubeId(url: string): string | null {
  const patterns = [/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/, /youtu\.be\/([a-zA-Z0-9_-]{11})/]
  for (const p of patterns) { const m = url.match(p); if (m) return m[1] }
  return null
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div style={{ position:'relative' as const, paddingBottom:'56.25%', height:0, overflow:'hidden', borderRadius:10, marginBottom:16, border:'1px solid var(--border)' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{ position:'absolute' as const, top:0, left:0, width:'100%', height:'100%', border:'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

function PlayIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="#0a0b0f"><polygon points="2,1 11,6 2,11"/></svg>
}
function PauseIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="#0a0b0f"><rect x="1" y="1" width="4" height="10"/><rect x="7" y="1" width="4" height="10"/></svg>
}

function InlineImage({ query }: { query: string }) {
  const [src, setSrc] = useState<string|null>(null)
  useEffect(() => {
    fetchBestImage(query).then(url => { if (url) setSrc(url) })
  }, [query])
  if (!src) return <div style={{ height:200, background:'var(--bg3)', borderRadius:10, marginBottom:16, display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:12, color:'var(--text3)', fontFamily:'var(--mono)' }}>Loading image...</span></div>
  return (
    <div style={{ marginBottom:16, borderRadius:10, overflow:'hidden', position:'relative' as const }}>
      <img src={src} alt={query} style={{ width:'100%', height:220, objectFit:'cover' as const, display:'block' }} />
      <div style={{ position:'absolute' as const, bottom:6, right:10, fontSize:9, color:'rgba(255,255,255,0.7)', fontFamily:'var(--mono)', background:'rgba(0,0,0,0.4)', padding:'2px 6px', borderRadius:4 }}>{query}</div>
    </div>
  )
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', margin:'24px 0 8px', lineHeight:1.3 }}>{line.slice(3)}</h2>
    if (line.startsWith('# ')) return <h1 key={i} style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', margin:'28px 0 10px', lineHeight:1.2 }}>{line.slice(2)}</h1>
    if (line.startsWith('> ')) return <blockquote key={i} style={{ borderLeft:'2px solid var(--amber)', padding:'10px 16px', background:'var(--amber-bg)', borderRadius:'0 8px 8px 0', margin:'14px 0', color:'var(--amber3)', fontStyle:'italic', fontSize:14 }}>{line.slice(2)}</blockquote>
    if (line.startsWith('- ') || line.startsWith('* ')) return <div key={i} style={{ display:'flex', gap:8, marginBottom:6, paddingLeft:8 }}><span style={{ color:'var(--amber)', flexShrink:0 }}>-</span><span style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7 }}>{line.slice(2)}</span></div>
    if (!line.trim()) return <div key={i} style={{ height:10 }}/>
    const ytMatch = line.match(/https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (ytMatch) return <YouTubeEmbed key={i} videoId={ytMatch[3]} />
    const imgMatch = line.match(/^\[IMG:(.+?)\]$/)
    if (imgMatch) return <InlineImage key={i} query={imgMatch[1]} />
    const vidMatch = line.match(/^\[VID:(.+?)\]$/)
    if (vidMatch) return (
      <div key={i} style={{ marginBottom:16, padding:'12px 14px', background:'var(--bg3)', borderRadius:10, border:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ fontSize:20, flexShrink:0 }}>▶</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:4 }}>VIDEO DEMONSTRATION</div>
          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(vidMatch[1])}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:'var(--amber)', textDecoration:'none', fontWeight:500 }}>{vidMatch[1]}</a>
        </div>
        <div style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--mono)' }}>YouTube →</div>
      </div>
    )
    const imgMatch2 = line.match(/^\[IMG:(.+?)\]$/)
    if (imgMatch) return <InlineImage key={i} query={imgMatch[1]} />
    return <p key={i} style={{ fontSize:14.5, color:'var(--text2)', lineHeight:1.85, marginBottom:12 }}>{line}</p>
  })
}

export default function LessonScreen() {
  const [curricula, setCurricula] = useState<any[]>([])
  const [activeCurrId, setActiveCurrId] = useState<string|null>(null)
  const [selectedLesson, setSelectedLesson] = useState<{wi:number,di:number}|null>(null)
  const [lessonData, setLessonData] = useState<any>(null)
  const [fromCache, setFromCache] = useState<'local'|'remote'|'global'|null>(null)
  const [heroImage, setHeroImage] = useState<string|null>(null)
  const [lessonImage, setLessonImage] = useState<string|null>(null)
  const [preloadedLessons, setPreloadedLessons] = useState<Record<string,any>>({})
  const [generating, setGenerating] = useState(false)
  const [streamText, setStreamText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [marking, setMarking] = useState(false)
  const [skipping, setSkipping] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)
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
  const [eliMode, setEliMode] = useState<'eli5'|null>(null)
  const [eliContent, setEliContent] = useState('')
  const [eliLoading, setEliLoading] = useState(false)
  const [tutorOpen, setTutorOpen] = useState(false)
  const [tutorMessages, setTutorMessages] = useState<{role:'user'|'assistant',content:string}[]>([])
  const [tutorInput, setTutorInput] = useState('')
  const [tutorLoading, setTutorLoading] = useState(false)
  const [newBadges, setNewBadges] = useState<string[]>([])
  const [mnemonics, setMnemonics] = useState<Record<number,string>>({})
  const [mnemonicLoading, setMnemonicLoading] = useState<Record<number,boolean>>({})
  const [adaptiveMode, setAdaptiveMode] = useState<'easier'|'harder'|null>(null)
  const [adaptiveContent, setAdaptiveContent] = useState('')
  const [adaptiveLoading, setAdaptiveLoading] = useState(false)
  const [relatedTopics, setRelatedTopics] = useState<string[]>([])
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [upsellShown, setUpsellShown] = useState(false)
  const [lessonUsageToday, setLessonUsageToday] = useState(0)
  const [showDailyLimit, setShowDailyLimit] = useState(false)
  const [showUpsell, setShowUpsell] = useState(false)
  const [showProGate, setShowProGate] = useState(false)
  const [weekQuiz, setWeekQuiz] = useState<{ wi: number; isFinal: boolean; questions: any[] } | null>(null)
  const [formalAssessment, setFormalAssessment] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && readingMode) setReadingMode(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [readingMode])
  const urlCurrId = searchParams.get('id')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await createClient().auth.getUser()
      if (!user) return
      setUserId(user.id)
      getProfile().then(p => { setIsPro(isProActive(p)); setUpsellShown(!!(p as any)?.upsell_shown) }).catch(() => {})
      getLessonUsageToday(user.id).then(setLessonUsageToday).catch(() => {})
      loadStreak(user.id).then(s => setStreak(s?.current_streak || 0)).catch(() => {})
      const currs = await loadCurricula(user.id)
      setCurricula(currs)
      if (currs.length > 0) {
        const targetId = urlCurrId || currs[0].id
        const targetCurr = currs.find((c: any) => c.id === targetId) || currs[0]
        setActiveCurrId(targetCurr.id)
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
      const key = selectedLesson.wi + '-' + selectedLesson.di
      const done = !!(activeCurr.progress || {})[key]
      setIsComplete(done)
      setExAnswers({})
      setExInputs({})
      setQuizAnswers({})
      setShowSkipConfirm(false)
    setMnemonics({})
    setMnemonicLoading({})
    setAdaptiveMode(null)
    setAdaptiveContent('')
    setRelatedTopics([])
      setLessonData(null)
      loadLesson(activeCurr, selectedLesson.wi, selectedLesson.di)
    }
  }, [selectedLesson, activeCurrId])

  const loadLesson = async (curr: any, wi: number, di: number) => {
    const key = wi + '-' + di
    const lsKey = 'lp_lesson_' + curr.id + '_' + key
    try { const lsCached = localStorage.getItem(lsKey); if (lsCached) { setLessonData(JSON.parse(lsCached)); setFromCache('local'); const lsParsed = JSON.parse(lsCached); fetchUnsplashImage((lsParsed?.title||'') + ' ' + (curr?.topic||'')).then(url => { if (url) setHeroImage(url) }); setTimeout(() => backgroundGenerateAll(curr, wi, di), 2000); return } } catch {}
    const cached = await getCachedLesson(curr.id, key)
    if (cached) {
      setLessonData(cached)
      try { localStorage.setItem(lsKey, JSON.stringify(cached)) } catch {}
      fetchBestImage(curr?.topic || '').then(url => { if (url) setHeroImage(url) })
      return
    }
    const week = curr.curriculum?.weeks?.[wi]
    const day = week?.days?.[di]
    if (!day) return
    const gcached = await getGlobalCachedLesson(curr.topic, curr.level, wi + 1, di + 1, day.title)
    if (gcached) {
      setLessonData(gcached)
      try { localStorage.setItem(lsKey, JSON.stringify(gcached)) } catch {}
      fetchBestImage(curr?.topic || '').then(url => { if (url) setHeroImage(url) })
      setTimeout(() => backgroundGenerateAll(curr, wi, di), 2000)
      return
    }
    // Free-tier daily lesson cap — only fires when all caches miss (real generation).
    // Cached lessons (popular topics) are always free; this only gates uncached ones.
    // Pro users are exempt. Resets at midnight UTC.
    if (!isPro && userId && lessonUsageToday >= FREE_DAILY_LESSONS) {
      posthog.capture('lesson-daily-limit-hit')
      setShowDailyLimit(true)
      return
    }
    setGenerating(true)
    setStreamText('')
    const prompt = "You are an expert educator. Generate a complete, engaging lesson as a single valid JSON object. Return ONLY the JSON, no markdown, no explanation.\n\nTopic: " + curr.topic + "\nLevel: " + curr.level + "\nWeek " + (wi+1) + " Theme: " + week.theme + "\nSession: " + day.title + "\nType: " + day.type + "\nDuration: " + day.duration + "\nDescription: " + day.description + "\n\nGenerate this JSON:\n{\n  \"title\": \"Engaging lesson title\",\n  \"subject\": \"" + curr.topic + "\",\n  \"level\": \"" + curr.level + "\",\n  \"duration\": \"" + day.duration + "\",\n  \"eyebrow\": \"Week " + (wi+1) + " - Day " + (di+1) + "\",\n  \"intro\": \"2-3 sentence introduction.\",\n  \"content\": \"Full lesson in markdown, 600-900 words. Use ## headers and > for insights.\",\n  \"keyPoints\": [\"Point 1\", \"Point 2\", \"Point 3\"],\n  \"vocab\": [{\"word\": \"term\", \"reading\": \"type\", \"example\": \"usage\"}],\n  \"exercises\": [{\"type\": \"Multiple Choice\", \"question\": \"Question?\", \"opts\": [\"A\",\"B\",\"C\",\"D\"], \"correct\": 0, \"explanation\": \"Why.\"}],\n  \"quiz\": [{\"q\": \"Question?\", \"opts\": [\"A\",\"B\",\"C\",\"D\"], \"correct\": 0, \"explanation\": \"Why.\"}]\n}\nRules: vocab 4-8 terms, exercises 2-3 mixed types, quiz 3 questions, content rich and specific. CRITICAL MEDIA: Embed media tags in the content field, each on its own line. IMAGE TAGS: [IMG:specific query matched to the exact concept on surrounding lines] — add 3-5 per lesson. Each image must illustrate the specific idea being explained, not the topic in general. Match the query to the content type: for a diagram use [IMG:amino acid zwitterion structure labeled diagram], for a process use [IMG:glycolysis pathway ATP production steps], for a real-world scene use [IMG:Spanish cafe menu ordering food scene], for code use [IMG:Python dictionary comprehension syntax example], for anatomy use [IMG:neuron synapse structure labeled cross section]. Never use generic queries — every query must be specific to this lesson. VIDEO TAGS: [VID:specific youtube search] — add 1-2 for demonstrations e.g. [VID:enzyme active site lock and key mechanism animation]. Both tags replaced with real media."
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
      if (parsed.content) parsed.content = parsed.content.replace(/\\n/g, '\n')
      setLessonData(parsed)
      fetchUnsplashImage((parsed?.title || '') + ' ' + (curr?.topic || '')).then(url => { if (url) setHeroImage(url) })
      if (activeCurrId) await cacheLesson(activeCurrId, key, parsed)
      setGlobalCachedLesson(curr.topic, curr.level, wi + 1, di + 1, week.theme, day.title, day.type, parsed)
      setTimeout(() => backgroundGenerateAll(curr, wi, di), 2000)
      try { localStorage.setItem(lsKey, JSON.stringify(parsed)) } catch {}
      // Count this real generation against the daily free limit
      if (!isPro && userId) { incrementLessonUsage(); setLessonUsageToday(n => n + 1) }
    } catch(e: any) {
      console.error('Lesson generation failed:', e)
      setLessonData({ error: e.message })
    } finally {
      setGenerating(false)
      setStreamText('')
    }
  }
  const bgGenerating = useRef(false)

  const generateLessonSilent = async (curr: any, wi: number, di: number): Promise<boolean> => {
    const key = wi + '-' + di
    const lsKey = 'lp_lesson_' + curr.id + '_' + key
    // Skip if already cached
    try { if (localStorage.getItem(lsKey)) return true } catch {}
    const cached = await getCachedLesson(curr.id, key)
    if (cached) { try { localStorage.setItem(lsKey, JSON.stringify(cached)) } catch {}; return true }
    // Generate silently
    const week = curr.curriculum?.weeks?.[wi]
    const day = week?.days?.[di]
    if (!day) return false
    const gcached = await getGlobalCachedLesson(curr.topic, curr.level, wi + 1, di + 1, day.title)
    if (gcached) {
      try { localStorage.setItem(lsKey, JSON.stringify(gcached)) } catch {}
      return true
    }
    try {
      const prompt = "You are an expert educator. Generate a complete, engaging lesson as a single valid JSON object. Return ONLY the JSON, no markdown, no explanation.\n\nTopic: " + curr.topic + "\nLevel: " + curr.level + "\nWeek " + (wi+1) + " Theme: " + week.theme + "\nSession: " + day.title + "\nType: " + day.type + "\nDuration: " + day.duration + "\nDescription: " + day.description + "\n\nGenerate this JSON:\n{\n  \"title\": \"Engaging lesson title\",\n  \"subject\": \"" + curr.topic + "\",\n  \"level\": \"" + curr.level + "\",\n  \"duration\": \"" + day.duration + "\",\n  \"eyebrow\": \"Week " + (wi+1) + " - Day " + (di+1) + "\",\n  \"intro\": \"2-3 sentence introduction.\",\n  \"content\": \"Full lesson in markdown, 600-900 words. Use ## headers and > for insights.\",\n  \"keyPoints\": [\"Point 1\", \"Point 2\", \"Point 3\"],\n  \"vocab\": [{\"word\": \"term\", \"reading\": \"type\", \"example\": \"usage\"}],\n  \"exercises\": [{\"type\": \"Multiple Choice\", \"question\": \"Question?\", \"opts\": [\"A\",\"B\",\"C\",\"D\"], \"correct\": 0, \"explanation\": \"Why.\"}],\n  \"quiz\": [{\"q\": \"Question?\", \"opts\": [\"A\",\"B\",\"C\",\"D\"], \"correct\": 0, \"explanation\": \"Why.\"}]\n}\nRules: vocab 4-8 terms, exercises 2-3 mixed types, quiz 3 questions, content rich and specific."
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ stream: false, messages: [{ role:'user', content: prompt }] }) })
      if (!res.ok) return false
      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) return false
      const parsed = JSON.parse(match[0])
      if (parsed.content) parsed.content = parsed.content.replace(/\\n/g, '\n')
      try { localStorage.setItem(lsKey, JSON.stringify(parsed)) } catch {}
      if (curr.id) await cacheLesson(curr.id, key, parsed)
      setGlobalCachedLesson(curr.topic, curr.level, wi + 1, di + 1, week.theme, day.title, day.type, parsed)
      return true
    } catch { return false }
  }

  const backgroundGenerateAll = async (curr: any, skipWi: number, skipDi: number) => {
    if (bgGenerating.current) return
    bgGenerating.current = true
    const weeks = curr.curriculum?.weeks || []
    for (let wi = 0; wi < weeks.length; wi++) {
      const days = weeks[wi]?.days || []
      for (let di = 0; di < days.length; di++) {
        if (wi === skipWi && di === skipDi) continue // skip current lesson
        if (!bgGenerating.current) return // cancelled
        await generateLessonSilent(curr, wi, di)
        await new Promise(r => setTimeout(r, 500)) // small delay between generations
      }
    }
    bgGenerating.current = false
  }


  // Push toolbar into AppShell topbar whenever relevant state changes
  useEffect(() => {
    const setToolbar = (window as any).__learnpath_setToolbar
    if (!setToolbar) return
    if (!lessonData || readingMode) { setToolbar(null); return }
    setToolbar(
      <div style={{ display:'flex', gap:6, alignItems:'center', flex:'1 1 auto', flexWrap:'wrap' }}>
        <button onClick={() => { if(eliMode==='eli5'&&eliContent){setEliMode(null);setEliContent('')}else{fetchEli()} }} style={{ padding:'5px 12px', borderRadius:7, border:'1px solid var(--border2)', background:eliMode==='eli5'?'var(--amber-bg)':'var(--bg3)', color:eliMode==='eli5'?'var(--amber)':'var(--text2)', fontFamily:'var(--sans)', fontSize:11, fontWeight:500, cursor:'pointer' }}>ELI5</button>

        <button onClick={() => { if (!isPro) { setShowProGate(true); return }; setTutorOpen(o => !o); if(!tutorOpen && tutorMessages.length===0) setTutorMessages([{role:'assistant',content:'Hi! Ask me anything about this lesson.'}]) }} style={{ padding:'5px 12px', borderRadius:7, border:'1px solid var(--border2)', background:tutorOpen?'var(--amber-bg)':'var(--bg3)', color:tutorOpen?'var(--amber)':'var(--text2)', fontFamily:'var(--sans)', fontSize:11, fontWeight:500, cursor:'pointer' }}>AI Tutor</button>
                {!isComplete && (showSkipConfirm ? (
          <div style={{ display:'flex', gap:4 }}>
            <button onClick={skipLesson} disabled={skipping} style={{ padding:'5px 12px', borderRadius:7, border:'1px solid var(--amber-bg2)', background:'var(--amber-bg)', color:'var(--amber2)', fontFamily:'var(--sans)', fontSize:11, fontWeight:500, cursor:'pointer' }}>{skipping ? 'Saving...' : 'Yes, skip it'}</button>
            <button onClick={() => setShowSkipConfirm(false)} style={{ padding:'5px 10px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer' }}>Cancel</button>
          </div>
        ) : (
          <>
            <button onClick={() => { if (!isPro) { setShowProGate(true); return }; regenLesson() }} disabled={regenerating||generating} style={{ padding:'5px 12px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:10, fontStyle:'italic', cursor:'pointer' }}>{regenerating ? 'Regenerating...' : '\u21ba Regenerate'}</button>
            <button onClick={() => setShowSkipConfirm(true)} style={{ padding:'5px 12px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:10, fontStyle:'italic', cursor:'pointer' }}>Skip</button>
          </>
        ))}
      </div>
    )
  }, [lessonData, isComplete, marking, skipping, showSkipConfirm, eliMode, eliContent, tutorOpen, tutorMessages, regenerating, generating, readingMode])

  // Clear toolbar when leaving lesson screen
  useEffect(() => {
    return () => {
      const setToolbar = (window as any).__learnpath_setToolbar
      if (setToolbar) setToolbar(null)
    }
  }, [])

  const PREFETCH_WINDOW = 3
  useEffect(() => {
    if (!lessonData || !activeCurr || !selectedLesson) return
    let cancelled = false
    const weeks = activeCurr.curriculum?.weeks || []
    const flat: { wi: number; di: number }[] = []
    for (let wi = 0; wi < weeks.length; wi++) {
      for (let di = 0; di < (weeks[wi]?.days?.length || 0); di++) flat.push({ wi, di })
    }
    const curIdx = flat.findIndex(p => p.wi === selectedLesson.wi && p.di === selectedLesson.di)
    if (curIdx === -1) return
    const ahead = flat.slice(curIdx + 1, curIdx + 1 + PREFETCH_WINDOW)
    ;(async () => {
      for (const { wi, di } of ahead) {
        if (cancelled) return
        await generateLessonSilent(activeCurr, wi, di)
        await new Promise(r => setTimeout(r, 300))
      }
    })()
    return () => { cancelled = true }
  }, [lessonData]) // eslint-disable-line react-hooks/exhaustive-deps

  const markComplete = async () => {
    if (!activeCurrId || !userId || isComplete) return
    setMarking(true)
    try {
      const currs = await loadCurricula(userId)
      const curr = currs.find((c: any) => c.id === activeCurrId)
      const progress = { ...(curr?.progress || {}) }
      const key = selectedLesson!.wi + '-' + selectedLesson!.di
      progress[key] = true
      await updateCurriculumProgress(activeCurrId, progress)
      await logActivity(userId, 'lesson', 20)
      posthog.capture('lesson-completed')
      await updateStreak(userId)
      const xpResult = await completeLessonAndAwardXP(activeCurrId, key, streak)
      if (xpResult && xpResult.leveledUp) { setShowLevelUp(xpResult.levelInfo as Record<string,any>) }
      if (userId && xpResult) {
        const earned = await checkAndAwardBadges(userId, { xp: xpResult.newXP, streak })
        if (earned.length > 0) setNewBadges(earned)
      }
      ;(window as any).__learnpath_refreshProfile?.()
      setIsComplete(true)
      const totalDoneBeforeThis = currs.reduce((n: number, c: any) => n + Object.values(c.progress || {}).filter(Boolean).length, 0)
      if (totalDoneBeforeThis === 0 && !isPro && !upsellShown) {
        setUpsellShown(true)         // optimistic — prevents double-fire this session
        markUpsellShown(userId!)     // persist to DB — survives device/browser change
        posthog.capture('upsell-shown', { trigger: 'first_lesson' })
        setShowUpsell(true)
      }
      setCurricula(cs => cs.map(c => c.id === activeCurrId ? { ...c, progress } : c))
      fetchRelatedTopics()
      await checkAndTriggerQuiz(progress, selectedLesson!.wi)
    } catch(e) { console.error(e) }
    finally { setMarking(false) }
  }

  const skipLesson = async () => {
    if (!activeCurrId || !userId || isComplete) return
    setSkipping(true)
    setShowSkipConfirm(false)
    try {
      const currs = await loadCurricula(userId)
      const curr = currs.find((c: any) => c.id === activeCurrId)
      const progress = { ...(curr?.progress || {}) }
      const key = selectedLesson!.wi + '-' + selectedLesson!.di
      progress[key] = true
      await updateCurriculumProgress(activeCurrId, progress)
      await logActivity(userId, 'lesson_skip', 5)
      posthog.capture('lesson-skipped')
      await updateStreak(userId)
      const xpResult = await completeLessonAndAwardXP(activeCurrId, key, streak)
      if (xpResult && xpResult.leveledUp) { setShowLevelUp(xpResult.levelInfo as Record<string,any>) }
      if (userId && xpResult) {
        const earned = await checkAndAwardBadges(userId, { xp: xpResult.newXP, streak })
        if (earned.length > 0) setNewBadges(earned)
      }
      ;(window as any).__learnpath_refreshProfile?.()
      setIsComplete(true)
      fetchRelatedTopics()
      setCurricula(cs => cs.map(c => c.id === activeCurrId ? { ...c, progress } : c))
    } catch(e) { console.error(e) }
    finally { setSkipping(false) }
  }

  const getNextLesson = (): { wi: number; di: number } | null => {
    if (!selectedLesson || !activeCurr) return null
    const weeks = activeCurr.curriculum?.weeks || []
    const { wi, di } = selectedLesson
    if (di + 1 < (weeks[wi]?.days?.length || 0)) return { wi, di: di + 1 }
    if (wi + 1 < weeks.length && (weeks[wi + 1]?.days?.length || 0) > 0) return { wi: wi + 1, di: 0 }
    return null
  }

  const checkAndTriggerQuiz = async (progress: Record<string, boolean>, wi: number) => {
    const weeks = activeCurr?.curriculum?.weeks || []
    const week = weeks[wi]
    if (!week || !activeCurrId) return
    // Only fire when every day in this week is now complete
    const allDone = (week.days || []).every((_: any, di: number) => progress[`${wi}-${di}`])
    if (!allDone) return
    // Load lesson cache to collect quiz questions
    const supabase = createClient()
    const { data } = await (supabase as any).from('curricula')
      .select('lesson_cache').eq('id', activeCurrId).single()
    const cache: Record<string, any> = data?.lesson_cache || {}
    const isFinal = wi === weeks.length - 1
    let questions: any[] = []
    if (isFinal) {
      // Final exam: up to 3 random questions per week from all weeks, max 15
      for (let w = 0; w < weeks.length; w++) {
        const wDays = weeks[w]?.days || []
        const wQs: any[] = []
        for (let d = 0; d < wDays.length; d++) {
          const ld = cache[`${w}-${d}`]
          if (ld?.quiz) wQs.push(...ld.quiz.map((q: any) => ({ ...q, lessonTitle: ld.title })))
        }
        questions.push(...shuffle(wQs).slice(0, 3))
      }
    } else {
      // Pop quiz: all questions from this week's lessons, shuffled, max 10
      for (let d = 0; d < (week.days || []).length; d++) {
        const ld = cache[`${wi}-${d}`]
        if (ld?.quiz) questions.push(...ld.quiz.map((q: any) => ({ ...q, lessonTitle: ld.title })))
      }
      questions = shuffle(questions).slice(0, 10)
    }
    if (questions.length === 0) return // No cached questions yet — skip
    // For the final week, check if there's a formal team assessment first
    if (isFinal) {
      try {
        const assessment = await getAssessment(activeCurrId)
        if (assessment?.questions?.length > 0) {
          setFormalAssessment(assessment)
          return  // Formal assessment takes precedence over auto-generated final
        }
      } catch { /* no formal assessment — fall through */ }
    }
    setWeekQuiz({ wi, isFinal, questions })
  }

  const regenLesson = async () => {
    if (!activeCurrId || !selectedLesson) return
    setRegenerating(true)
    try {
      const key = selectedLesson.wi + '-' + selectedLesson.di
      await clearCachedLesson(activeCurrId, key)
      try { localStorage.removeItem('lp_lesson_' + activeCurrId + '_' + key) } catch {}
      setLessonData(null)
      await loadLesson(activeCurr, selectedLesson.wi, selectedLesson.di)
    } catch(e) { console.error(e) }
    finally { setRegenerating(false) }
  }

  const fetchMnemonic = async (word: string, example: string, idx: number) => {
    setMnemonicLoading(p => ({...p,[idx]:true}))
    const prompt = 'Create a single vivid, memorable mnemonic or memory trick to remember this vocabulary word. Be creative, funny, or surprising. Keep it to 1-2 sentences.\n\nWord: ' + word + '\nUsage example: ' + example
    try {
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ stream:true, messages:[{ role:'user', content:prompt }] }) })
      const reader = res.body!.getReader(); const decoder = new TextDecoder(); let full = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim(); if (data === '[DONE]') break
          try { const p = JSON.parse(data); if (p.text) { full += p.text; setMnemonics(m => ({...m,[idx]:full})) } } catch {}
        }
      }
    } catch(e) { setMnemonics(m => ({...m,[idx]:'Could not generate. Try again.'})) }
    finally { setMnemonicLoading(p => ({...p,[idx]:false})) }
  }

  const fetchAdaptive = async (mode: 'easier'|'harder') => {
    if (!lessonData) return
    setAdaptiveMode(mode); setAdaptiveLoading(true); setAdaptiveContent('')
    const modePrompt = mode === 'easier'
      ? 'The student struggled with this lesson (scored below 60%). Create a simplified version of this lesson using simpler language, more analogies, and a slower pace. Focus on the core concept only.'
      : 'The student aced this lesson (100% score). Create an advanced follow-up lesson that goes deeper, adds complexity, and challenges them further on this topic.'
    const prompt = modePrompt + '\n\nOriginal lesson title: ' + (lessonData.title||'') + '\n\nOriginal lesson content:\n' + (lessonData.content||'')
    try {
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ stream:true, messages:[{ role:'user', content:prompt }] }) })
      const reader = res.body!.getReader(); const decoder = new TextDecoder(); let full = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim(); if (data === '[DONE]') break
          try { const p = JSON.parse(data); if (p.text) { full += p.text; setAdaptiveContent(full) } } catch {}
        }
      }
    } catch(e) { setAdaptiveContent('Could not generate. Please try again.') }
    finally { setAdaptiveLoading(false) }
  }

  const fetchRelatedTopics = async () => {
    if (!lessonData || relatedTopics.length > 0) return
    setRelatedLoading(true)
    const prompt = 'Based on this lesson, suggest exactly 3 related topics the student could explore next. Return ONLY a JSON array of 3 short topic strings, no explanation.\n\nLesson: ' + (lessonData.title||'')
    try {
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ stream:false, messages:[{ role:'user', content:prompt }] }) })
      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      const match = text.match(/\[[\s\S]*\]/)
      if (match) { const topics = JSON.parse(match[0]); if (Array.isArray(topics)) setRelatedTopics(topics.slice(0,3)) }
    } catch(e) { console.error('Related topics error:', e) }
    finally { setRelatedLoading(false) }
  }

  const fetchEli = async () => {
    if (!lessonData) return
    setEliMode('eli5'); setEliLoading(true); setEliContent('')
    const prompt = 'Explain this lesson like I am 5 years old. Use simple words, analogies, and short sentences. No jargon.' + '\n\nLesson title: ' + (lessonData.title||'') + '\n\nLesson content:\n' + (lessonData.content||'')
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

  const askTutor = async (question: string) => {
    if (!question.trim() || !lessonData) return
    const userMsg = { role: 'user' as const, content: question }
    setTutorMessages(m => [...m, userMsg])
    setTutorInput('')
    setTutorLoading(true)
    const context = 'Lesson: ' + (lessonData.title||'') + '\n\n' + (lessonData.content||'')
    const systemPrompt = 'You are a helpful tutor. Answer questions about this lesson concisely and clearly. Lesson context:\n\n' + context
    const allMessages = [...tutorMessages, userMsg].map(m => ({ role: m.role, content: m.content }))
    try {
      const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ stream:true, system:systemPrompt, messages:allMessages }) })
      const reader = res.body!.getReader(); const decoder = new TextDecoder(); let full = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim(); if (data === '[DONE]') break
          try { const p = JSON.parse(data); if (p.text) { full += p.text; setTutorMessages(m => [...m.slice(0,-1), { role:'assistant', content: full }]) } } catch {}
        }
      }
      if (!full) setTutorMessages(m => [...m, { role:'assistant', content:'Sorry, I could not generate a response.' }])
    } catch(e) { setTutorMessages(m => [...m, { role:'assistant', content:'Error connecting to tutor.' }]) }
    finally { setTutorLoading(false) }
  }

  const toggleAudio = () => {
    if (!lessonData) return
    if (audioPlaying) { window.speechSynthesis?.cancel(); setAudioPlaying(false); return }
    const text = lessonData.title + '. ' + lessonData.intro + ' ' + (lessonData.content?.replace(/#{1,3} /g,'').replace(/>/g,'') || '')
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
  const lessonKey = selectedLesson ? (selectedLesson.wi + '-' + selectedLesson.di) : null

  return (
    <div style={{ display:'flex', height:'100%', overflow:'hidden', position:'relative' as const }}>

      {/* Mobile sidebar toggle button */}
      {isMobile && !readingMode && (
        <button onClick={() => setMobileSidebarOpen(o => !o)} style={{ position:'fixed', bottom:20, left:20, zIndex:300, width:48, height:48, borderRadius:'50%', background:'var(--amber)', border:'none', color:'#0a0b0f', fontSize:20, cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {mobileSidebarOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Reading mode exit button */}
      {readingMode && (
        <button onClick={() => setReadingMode(false)} style={{ position:'fixed', top:14, right:14, zIndex:400, padding:'7px 14px', borderRadius:20, background:'var(--bg3)', border:'1px solid var(--border2)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:12, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
          <span>✕</span>
          <span>Exit reading</span>
        </button>
      )}
      {/* Mobile overlay */}
      {isMobile && mobileSidebarOpen && (
        <div onClick={() => setMobileSidebarOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:200 }} />
      )}
      {/* Floating Mark Complete button */}
      {weekQuiz && activeCurr && (
        <WeekQuizOverlay
          title={weekQuiz.isFinal ? 'Final Exam' : `Week ${weekQuiz.wi + 1} Pop Quiz`}
          topic={activeCurr.topic}
          questions={weekQuiz.questions}
          isFinal={weekQuiz.isFinal}
          onContinue={() => {
            setWeekQuiz(null)
            if (weekQuiz.isFinal) { router.push('/app/paths') }
            else { const next = getNextLesson(); if (next) setSelectedLesson(next) }
          }}
          onSkip={() => {
            setWeekQuiz(null)
            if (weekQuiz.isFinal) { router.push('/app/paths') }
            else { const next = getNextLesson(); if (next) setSelectedLesson(next) }
          }}
        />
      )}
      {formalAssessment && activeCurr && (
        <WeekQuizOverlay
          title="Final Assessment"
          topic={activeCurr.topic}
          questions={formalAssessment.questions}
          isFinal={true}
          passThreshold={formalAssessment.pass_threshold}
          onSaveResult={async (scorePct, passed) => {
            if (userId) {
              await saveAssessmentResult(formalAssessment.id, userId, formalAssessment.team_id, activeCurrId!, scorePct, passed, [])
            }
          }}
          onContinue={() => { setFormalAssessment(null); router.push('/app/paths') }}
          onSkip={() => { setFormalAssessment(null); router.push('/app/paths') }}
        />
      )}
      {lessonData && !readingMode && (
        <div style={{ position:'fixed', bottom:20, right:20, zIndex:300, display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end' }}>
          {isComplete && !weekQuiz && (() => { const next = getNextLesson(); return next ? (
            <button onClick={() => setSelectedLesson(next)} style={{ padding:'12px 22px', borderRadius:28, border:'none', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 14px rgba(0,0,0,0.35)', whiteSpace:'nowrap' }}>
              Next Lesson →
            </button>
          ) : null; })()}
          <button onClick={markComplete} disabled={marking||isComplete} style={{ padding:'12px 22px', borderRadius:28, border:'none', background:isComplete?'#6abf8a':marking?'var(--bg4)':'var(--amber)', color:isComplete?'#0a0b0f':marking?'var(--text2)':'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:600, cursor:marking||isComplete?'default':'pointer', boxShadow:'0 4px 14px rgba(0,0,0,0.35)', whiteSpace:'nowrap' }}>
            {isComplete?'✓ Complete':marking?'Saving...':'Mark Complete'}
          </button>
        </div>
      )}
      {/* LEFT PANEL - lesson picker */}
      {!readingMode && (
      <div style={{ width:isMobile?0:260, flexShrink:0, borderRight:'1px solid var(--border)', overflowY:'auto', background:'var(--bg2)', ...(isMobile ? { position:'fixed' as const, left:mobileSidebarOpen?0:-260, top:0, height:'100%', zIndex:250, transition:'left 0.25s ease', width:260 } : {}), ...(isMobile ? { flexShrink:0 } : {}) }}>

        {/* Home button */}
        <div onClick={() => router.push('/app')} style={{ padding:'12px 14px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:8, cursor:'pointer', background:'var(--bg3)' }}>
          <span style={{ fontSize:13 }}>⊞</span>
          <span style={{ fontSize:12, color:'var(--text2)', fontFamily:'var(--sans)' }}>Home</span>
        </div>
        {curricula.length > 1 && (
          <div style={{ padding:'12px 14px', borderBottom:'1px solid var(--border)' }}>
            <select value={activeCurrId||''} onChange={e => { setActiveCurrId(e.target.value); setSelectedLesson(null); setLessonData(null) }}
              style={{ width:'100%', padding:'7px 10px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:12, outline:'none' }}>
              {curricula.map(c => <option key={c.id} value={c.id}>{c.curriculum?.title || c.topic}</option>)}
            </select>
          </div>
        )}

        {activeCurr && (
          <div style={{ padding:'14px', borderBottom:'1px solid var(--border)' }}>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:4 }}>{activeCurr.topic}</div>
            <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:8, lineHeight:1.3 }}>{activeCurr.curriculum?.title}</div>
            <div style={{ height:3, background:'var(--bg5)', borderRadius:2, marginBottom:5 }}>
              <div style={{ height:'100%', borderRadius:2, background:'var(--amber)', width:currPct+'%' }}/>
            </div>
            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{doneSessions}/{totalSessions} sessions - {currPct}%</div>
          </div>
        )}

        {weeks.map((wk: any, wi: number) => (
          <div key={wi}>
            <div style={{ padding:'8px 14px 4px', fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.1em', background:'var(--bg3)', borderBottom:'1px solid var(--border)' }}>
              Week {wi+1} - {wk.theme}
            </div>
            {(wk.days||[]).map((d: any, di: number) => {
              const key = wi + '-' + di
              const done = !!progress[key]
              const isSelected = selectedLesson?.wi===wi && selectedLesson?.di===di
              const typeColors: Record<string,string> = { lesson:'var(--blue-text)', flashcards:'var(--purple-text)', exercise:'var(--green-text)', review:'var(--amber2)', practice:'var(--green-text)' }
              return (
                <div key={di} onClick={() => { setSelectedLesson({wi,di}); setView('lesson') }}
                  style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', cursor:'pointer', background:isSelected?'var(--amber-bg)':'transparent', borderLeft:`2px solid ${isSelected?'var(--amber)':'transparent'}`, transition:'all 0.12s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                    <div style={{ width:14, height:14, borderRadius:'50%', border:`1px solid ${done?'var(--green-border)':'var(--border2)'}`, background:done?'var(--green-bg)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      {done && <span style={{ fontSize:8, color:'var(--green-text)' }}>+</span>}
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
      )}

      {/* RIGHT PANEL - lesson content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column' as const, overflow:'hidden', minWidth:0, width:'100%' }}>

        {/* ELI5 — fixed sticky strip, always visible below topbar */}
      {lessonData && (eliLoading || eliContent) && (
        <div style={{ position:'fixed' as const, top:56, left:isMobile?0:260, right:0, zIndex:150, background:'var(--bg2)', borderBottom:'1px solid rgba(212,133,58,0.25)', padding:'10px 18px', boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, maxWidth:860, margin:'0 auto' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:5 }}>Simplified</div>
              {eliLoading && !eliContent && <div style={{ fontSize:12, color:'var(--text3)' }}>Claude is thinking...</div>}
              {eliContent && <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, maxHeight:130, overflowY:'auto' as const, whiteSpace:'pre-wrap' as const }}>{eliContent}</div>}
            </div>
            <button onClick={() => { setEliMode(null); setEliContent('') }} style={{ background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:16, lineHeight:1, flexShrink:0, padding:'2px 4px', marginTop:2 }}>✕</button>
          </div>
        </div>
      )}

      {/* AI Tutor — fixed chat widget, bottom-right above Mark Complete */}
      {tutorOpen && (
        <div style={{ position:'fixed' as const, bottom:76, right:20, width:isMobile?'calc(100vw - 40px)':'360px', maxHeight:420, zIndex:250, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', display:'flex', flexDirection:'column' as const, boxShadow:'0 8px 28px rgba(0,0,0,0.45)' }}>
          <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--bg3)', flexShrink:0 }}>
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>AI Tutor</div>
            <button onClick={() => setTutorOpen(false)} style={{ background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:16, lineHeight:1, padding:'2px 4px' }}>✕</button>
          </div>
          <div style={{ flex:1, overflowY:'auto' as const, padding:'8px 10px', display:'flex', flexDirection:'column' as const, gap:6, minHeight:0 }}>
            {tutorMessages.map((msg, i) => (
              <div key={i} style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start' }}>
                <div style={{ maxWidth:'85%', padding:'7px 11px', borderRadius:8, background:msg.role==='user'?'var(--amber)':'var(--bg3)', color:msg.role==='user'?'#0a0b0f':'var(--text2)', fontSize:12.5, lineHeight:1.5 }}>{msg.content}</div>
              </div>
            ))}
            {tutorLoading && <div style={{ fontSize:11, color:'var(--text3)', fontStyle:'italic', padding:'4px 0' }}>Tutor is thinking...</div>}
          </div>
          <div style={{ padding:'8px 10px', borderTop:'1px solid var(--border)', display:'flex', gap:6, flexShrink:0, background:'var(--bg2)' }}>
            <input value={tutorInput} onChange={e => setTutorInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'&&!tutorLoading) askTutor(tutorInput) }} placeholder='Ask anything about this lesson...' style={{ flex:1, padding:'7px 10px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:12, outline:'none' }}/>
            <button onClick={() => askTutor(tutorInput)} disabled={tutorLoading||!tutorInput.trim()} style={{ padding:'7px 14px', borderRadius:7, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:11, fontWeight:500, cursor:'pointer' }}>Ask</button>
          </div>
        </div>
      )}

        {/* SCROLLABLE LESSON CONTENT */}
        <div style={{ flex:1, overflowY:'auto', overflowX:'hidden', width:'100%', maxWidth:'100vw' }}>
          {generating ? (
                <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'center', paddingTop:60, padding:32, textAlign:'center' }}>
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
            <div style={{ maxWidth: readingMode ? 760 : (isMobile ? 'none' : 680), margin:'0 auto', padding: readingMode ? '40px 24px 60px' : (isMobile ? '16px 14px 80px' : '24px 28px 40px'), boxSizing:'border-box' as const, width:'100%', overflowX:'hidden' }}>

              {/* Header */}
              <div style={{ marginBottom:20, paddingBottom:16, borderBottom:'1px solid var(--border)' }}>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:6 }}>
                  {(lessonData.eyebrow||'').replace(/#\S+/g,'').trim()} · {lessonData.subject}
                  {isComplete && <span style={{ marginLeft:8, color:'var(--green-text)' }}>- Complete</span>}
                </div>
                <h1 style={{ fontFamily:'var(--serif)', fontSize:26, color:'var(--text)', lineHeight:1.2, marginBottom:10 }}>{lessonData.title}</h1>
                <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, marginBottom:12 }}>{lessonData.intro}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' as const }}>
                  {(lessonData.keyPoints||[]).map((p: string, i: number) => (
                    <span key={i} style={{ fontSize:10, fontFamily:'var(--mono)', padding:'3px 9px', borderRadius:4, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text)' }}>{p}</span>
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

              {/* Hero image */}
              {heroImage && (
                <div style={{ width:'100%', height:200, borderRadius:12, overflow:'hidden', marginBottom:20, position:'relative' as const }}>
                  <img src={heroImage} alt={lessonData?.title||''} style={{ width:'100%', height:'100%', objectFit:'cover' as const }} />
                </div>
              )}
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
                          {!mnemonics[i] && <button onClick={e => { e.stopPropagation(); fetchMnemonic(v.word, v.example, i) }} disabled={mnemonicLoading[i]} style={{ marginTop:6, width:'100%', padding:'4px', borderRadius:5, border:'1px solid var(--border2)', background:'var(--bg4)', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:9, cursor:'pointer' }}>{mnemonicLoading[i] ? 'Generating...' : '✦ Remember it'}</button>}
                          {mnemonics[i] && <div style={{ marginTop:6, fontSize:10, color:'var(--amber2)', lineHeight:1.5, fontStyle:'italic', borderTop:'1px solid var(--border)', paddingTop:5 }}>{mnemonics[i]}</div>}
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
                    {/* Adaptive Difficulty */}
                    {lessonData.quiz && lessonData.quiz.length > 0 && Object.keys(quizAnswers).length === lessonData.quiz.length && (() => {
                    const total = lessonData.quiz.length
                    const correct = lessonData.quiz.filter((_: any, qi: number) => quizAnswers[qi] === lessonData.quiz[qi].correct).length
                    const pct = Math.round((correct/total)*100)
                    return (
                      <div style={{ marginTop:16, padding:'14px 16px', borderRadius:10, border:'1px solid var(--border)', background:'var(--bg2)' }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                          <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>Quiz Score: {correct}/{total} ({pct}%)</div>
                          <div style={{ fontFamily:'var(--mono)', fontSize:11, color:pct===100?'var(--green-text)':pct<60?'var(--red-text)':'var(--amber2)' }}>{pct===100?'Perfect!':pct<60?'Keep going':'Good work'}</div>
                        </div>
                        {pct < 60 && !adaptiveContent && <div style={{ fontSize:12, color:'var(--text2)', marginBottom:8 }}>This one was tough. Want a simpler version to reinforce the basics?
                          <button onClick={() => fetchAdaptive('easier')} disabled={adaptiveLoading} style={{ marginLeft:10, padding:'4px 12px', borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer' }}>{adaptiveLoading && adaptiveMode==='easier' ? 'Generating...' : 'Simplify it'}</button></div>}
                        {pct === 100 && !adaptiveContent && <div style={{ fontSize:12, color:'var(--text2)', marginBottom:8 }}>Perfect score! Ready for a harder challenge?
                          <button onClick={() => fetchAdaptive('harder')} disabled={adaptiveLoading} style={{ marginLeft:10, padding:'4px 12px', borderRadius:6, border:'1px solid var(--border2)', background:'var(--amber-bg)', color:'var(--amber)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer' }}>{adaptiveLoading && adaptiveMode==='harder' ? 'Generating...' : 'Challenge me'}</button></div>}
                        {adaptiveLoading && !adaptiveContent && <div style={{ fontSize:12, color:'var(--text3)', fontStyle:'italic' }}>Claude is generating your lesson...</div>}
                        {adaptiveContent && <div style={{ marginTop:8, paddingTop:8, borderTop:'1px solid var(--border)' }}>
                          <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:6 }}>{adaptiveMode==='easier'?'Simplified Lesson':'Advanced Challenge'}</div>
                          <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.8, whiteSpace:'pre-wrap' as const, maxHeight:300, overflowY:'auto' as const }}>{adaptiveContent}</div>
                        </div>}
                      </div>
                    )
                  })()}
                  {/* References */}
              {(lessonData.references||[]).length > 0 && (
                <div style={{ marginTop:20, paddingTop:16, borderTop:'1px solid var(--border)' }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:10 }}>Further reading</div>
                  <div style={{ display:'flex', flexDirection:'column' as const, gap:6 }}>
                    {lessonData.references.map((ref: any, i: number) => (
                      <a key={i} href={ref.url} target='_blank' rel='noopener noreferrer' style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', borderRadius:7, border:'1px solid var(--border)', background:'var(--bg2)', textDecoration:'none' }}>
                        <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--amber)', padding:'2px 6px', borderRadius:4, background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.3)', flexShrink:0 }}>{ref.type||'link'}</span>
                        <span style={{ fontSize:12, color:'var(--text)', flex:1 }}>{ref.title}</span>
                        <span style={{ fontSize:10, color:'var(--text3)' }}>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Topics */}
                  {isComplete && (
                    <div style={{ marginTop:20, paddingTop:16, borderTop:'1px solid var(--border)' }}>
                      <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:12 }}>What to explore next</div>
                      {relatedLoading && <div style={{ fontSize:12, color:'var(--text3)', fontStyle:'italic' }}>Finding related topics...</div>}
                      {relatedTopics.length > 0 && <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
                        {relatedTopics.map((topic, i) => (
                          <div key={i} onClick={() => router.push('/app/curriculum?topic=' + encodeURIComponent(topic))} style={{ padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--bg3)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                            <span style={{ fontSize:13, color:'var(--text)' }}>{topic}</span>
                            <span style={{ fontSize:11, color:'var(--amber)', fontFamily:'var(--mono)' }}>Explore →</span>
                          </div>
                        ))}
                      </div>}
                    </div>
                  )}
              </>}
            </div>
          )}
        </div>
      </div>

      {newBadges.length > 0 && !showLevelUp && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={() => setNewBadges([])}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'36px 40px', textAlign:'center', maxWidth:380, width:'90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:40, marginBottom:12 }}>🏆</div>
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
            <div style={{ fontSize:48, marginBottom:16 }}>⭐</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--amber)', marginBottom:8 }}>Level Up!</div>
            <div style={{ fontSize:16, color:'var(--text)', marginBottom:6 }}>You are now a</div>
            <div style={{ fontFamily:'var(--mono)', fontSize:22, color:'var(--amber2)', fontWeight:700, marginBottom:20 }}>{showLevelUp?.title}</div>
            <div style={{ fontSize:13, color:'var(--text2)', marginBottom:24 }}>Keep learning to reach the next level.</div>
            <button onClick={() => setShowLevelUp(null)} style={{ padding:'10px 28px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer' }}>Continue</button>
          </div>
        </div>
      )}
      {showDailyLimit && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={() => setShowDailyLimit(false)}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'36px 32px', textAlign:'center' as const, maxWidth:400, width:'90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ width:52, height:52, borderRadius:14, background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:22 }}>⏱</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', marginBottom:8 }}>Daily limit reached</div>
            <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.65, marginBottom:24 }}>You've generated your {FREE_DAILY_LESSONS} free lessons for today. Upgrade to Pro for unlimited lessons, the AI Tutor, and spaced review that sticks.</div>
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              <div style={{ flex:1, padding:'12px 10px', borderRadius:10, background:'rgba(212,133,58,0.15)', border:'2px solid var(--amber)', textAlign:'center' as const, position:'relative' as const }}>
                <div style={{ position:'absolute' as const, top:-10, left:'50%', transform:'translateX(-50%)', background:'var(--amber)', color:'#0a0b0f', fontSize:8, fontFamily:'var(--mono)', fontWeight:700, padding:'2px 10px', borderRadius:10, textTransform:'uppercase' as const, letterSpacing:'0.08em', whiteSpace:'nowrap' as const }}>Best value</div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--amber)', marginBottom:4 }}>Annual</div>
                <div style={{ fontSize:19, fontWeight:600, color:'var(--text)' }}>$6.67<span style={{ fontSize:11, color:'var(--text2)', fontWeight:400 }}>/mo</span></div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>$79.99/yr · save 33%</div>
              </div>
              <div style={{ flex:1, padding:'12px 10px', borderRadius:10, background:'var(--bg3)', border:'1px solid var(--border)', textAlign:'center' as const }}>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:4 }}>Monthly</div>
                <div style={{ fontSize:19, fontWeight:600, color:'var(--text)' }}>$9.99<span style={{ fontSize:11, color:'var(--text2)', fontWeight:400 }}>/mo</span></div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>billed monthly</div>
              </div>
            </div>
            <button onClick={() => { setShowDailyLimit(false); window.open(getUpgradeUrl(userId), '_blank') }} style={{ width:'100%', padding:'13px', borderRadius:10, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer', marginBottom:10 }}>Unlock unlimited lessons →</button>
            <button onClick={() => setShowDailyLimit(false)} style={{ width:'100%', padding:'10px', borderRadius:10, border:'none', background:'transparent', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Come back tomorrow</button>
          </div>
        </div>
      )}
      {showUpsell && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={() => setShowUpsell(false)}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'36px 32px', textAlign:'center' as const, maxWidth:400, width:'90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ width:52, height:52, borderRadius:14, background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontFamily:'var(--mono)', fontSize:18, color:'var(--amber)' }}>✦</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', marginBottom:8 }}>First lesson done.</div>
            <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.65, marginBottom:24 }}>You've started something. Upgrade to Pro to keep going — unlimited paths, the AI Tutor, and spaced review that makes it stick.</div>
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              <div style={{ flex:1, padding:'12px 10px', borderRadius:10, background:'rgba(212,133,58,0.15)', border:'2px solid var(--amber)', textAlign:'center' as const, position:'relative' as const }}>
                <div style={{ position:'absolute' as const, top:-10, left:'50%', transform:'translateX(-50%)', background:'var(--amber)', color:'#0a0b0f', fontSize:8, fontFamily:'var(--mono)', fontWeight:700, padding:'2px 10px', borderRadius:10, textTransform:'uppercase' as const, letterSpacing:'0.08em', whiteSpace:'nowrap' as const }}>Best value</div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--amber)', marginBottom:4 }}>Annual</div>
                <div style={{ fontSize:19, fontWeight:600, color:'var(--text)' }}>$6.67<span style={{ fontSize:11, color:'var(--text2)', fontWeight:400 }}>/mo</span></div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>$79.99/yr · save 33%</div>
              </div>
              <div style={{ flex:1, padding:'12px 10px', borderRadius:10, background:'var(--bg3)', border:'1px solid var(--border)', textAlign:'center' as const }}>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:4 }}>Monthly</div>
                <div style={{ fontSize:19, fontWeight:600, color:'var(--text)' }}>$9.99<span style={{ fontSize:11, color:'var(--text2)', fontWeight:400 }}>/mo</span></div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>billed monthly</div>
              </div>
            </div>
            <button onClick={() => { setShowUpsell(false); window.open(getUpgradeUrl(userId), '_blank') }} style={{ width:'100%', padding:'13px', borderRadius:10, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer', marginBottom:10 }}>Start Annual Pro — $6.67/mo →</button>
            <button onClick={() => setShowUpsell(false)} style={{ width:'100%', padding:'10px', borderRadius:10, border:'none', background:'transparent', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Continue for free</button>
          </div>
        </div>
      )}
      {showProGate && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={() => setShowProGate(false)}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'36px 32px', textAlign:'center' as const, maxWidth:400, width:'90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ width:52, height:52, borderRadius:14, background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'var(--amber)' }}>PRO</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', marginBottom:8 }}>Unlock the AI Tutor</div>
            <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.65, marginBottom:24 }}>The AI Tutor and lesson regeneration are Pro features. Upgrade to ask unlimited questions and keep your lessons fresh.</div>
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              <div style={{ flex:1, padding:'12px 10px', borderRadius:10, background:'rgba(212,133,58,0.15)', border:'2px solid var(--amber)', textAlign:'center' as const, position:'relative' as const }}>
                <div style={{ position:'absolute' as const, top:-10, left:'50%', transform:'translateX(-50%)', background:'var(--amber)', color:'#0a0b0f', fontSize:8, fontFamily:'var(--mono)', fontWeight:700, padding:'2px 10px', borderRadius:10, textTransform:'uppercase' as const, letterSpacing:'0.08em', whiteSpace:'nowrap' as const }}>Best value</div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--amber)', marginBottom:4 }}>Annual</div>
                <div style={{ fontSize:19, fontWeight:600, color:'var(--text)' }}>$6.67<span style={{ fontSize:11, color:'var(--text2)', fontWeight:400 }}>/mo</span></div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>$79.99/yr · save 33%</div>
              </div>
              <div style={{ flex:1, padding:'12px 10px', borderRadius:10, background:'var(--bg3)', border:'1px solid var(--border)', textAlign:'center' as const }}>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:4 }}>Monthly</div>
                <div style={{ fontSize:19, fontWeight:600, color:'var(--text)' }}>$9.99<span style={{ fontSize:11, color:'var(--text2)', fontWeight:400 }}>/mo</span></div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>billed monthly</div>
              </div>
            </div>
            <button onClick={() => { setShowProGate(false); window.open(getUpgradeUrl(userId), '_blank') }} style={{ width:'100%', padding:'13px', borderRadius:10, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:'pointer', marginBottom:10 }}>Start Annual Pro — $6.67/mo →</button>
            <button onClick={() => setShowProGate(false)} style={{ width:'100%', padding:'10px', borderRadius:10, border:'none', background:'transparent', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>Maybe later</button>
          </div>
        </div>
      )}
    </div>
  )
}