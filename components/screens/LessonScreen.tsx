'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { loadCurricula, updateCurriculumProgress, updateStreak, logActivity } from '@/lib/db'
import { useRouter } from 'next/navigation'

const LESSON = {
  eyebrow: 'Week 1 · Lesson 3',
  title: 'Numbers 1-100: Counting in Japanese',
  subject: 'Japanese Language',
  level: 'Beginner',
  duration: '11 min read',
  words: '1,240 words',
  heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
  content: `Numbers are the backbone of everyday communication in Japanese. Once you memorize ten words, you can construct any number up to 99 using simple arithmetic spoken aloud.

## The Core Pattern: 1 through 10

The magic of Japanese numbers lies in their elegant modularity. Learn ten words and you can count to 99.

ichi (1) · ni (2) · san (3) · yon (4) · go (5) · roku (6) · nana (7) · hachi (8) · kyuu (9) · juu (10)

Notice that 4 and 7 each have two readings. Yon and nana are preferred in most modern contexts because shi sounds like the word for death and shichi can be confused with ichi in fast speech.

## Building Teen Numbers and Tens

Japanese reveals its beautiful logic here. Unlike English which has irregular words like eleven and twelve, Japanese tens follow a strict additive formula.

juu + digit = teen number

So 11 is juu-ichi, 12 is juu-ni, and so on. For tens: 20 is ni-juu (two-ten), 30 is san-juu, and 100 is hyaku.

> A child who knows 1-10 can immediately count to 99. The system rewards the learner from day one.`,
  steps: [
    { num:1, title:'Learn the base 10 numbers cold', desc:'Write each number 5 times while saying it aloud. The muscle memory between hand and mouth accelerates retention.', img:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&q=75' },
    { num:2, title:'Practice the tens pattern aloud', desc:'Count by tens from 10 to 100 until it feels automatic. This pattern unlocks the rest.', img:'https://images.unsplash.com/photo-1483193722442-5422d99849bc?w=300&q=75' },
    { num:3, title:'Combine tens and units', desc:'Pick random numbers 11-99 and build them aloud. 47 = yon-juu nana. Keep going until you hit 10 in a row.', img:'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&q=75' },
  ],
  video: { id:'9-OTNX-rqA4', title:'Japanese Numbers 1-100' },
  vocab: [
    { word:'ichi', reading:'one', example:'ichi-ban = number one' },
    { word:'juu', reading:'ten', example:'juu-ichi = eleven' },
    { word:'hyaku', reading:'one hundred', example:'ni-hyaku = 200' },
    { word:'nana', reading:'seven', example:'nana preferred over shichi' },
    { word:'yon', reading:'four', example:'yon preferred over shi' },
    { word:'kazu', reading:'number/count', example:'kazu o kazoeru = to count' },
  ],
  exercises: [
    { type:'Multiple Choice', question:'What does ni-juu go mean?', opts:['Twenty','Fifteen','Twenty-five','Fifty-two'], correct:2, explanation:'Ni (2) + juu (10) = 20, plus go (5) = 25.' },
    { type:'Multiple Choice', question:'Which reading of 4 is preferred in modern Japanese?', opts:['shi','yon','either','yonn'], correct:1, explanation:'Yon is preferred because shi sounds like death.' },
    { type:'Fill in the Blank', question:'How do you say 83 in Japanese? hachi-juu ___', answer:'san', explanation:'83 = hachi-juu san. Eighty (8x10) + three.' },
  ],
  quiz: [
    { q:'What is the Sino-Japanese word for 100?', opts:['momo','hyaku','sen','juu-juu'], correct:1, explanation:'Hyaku is the Sino-Japanese reading for 100.' },
    { q:'How would you say 47 in Japanese?', opts:['shi-juu nana','yon-juu shichi','yon-juu nana','shichi-juu yon'], correct:2, explanation:'Yon-juu nana: yon (4) x juu (10) = 40, plus nana (7) = 47.' },
    { q:'The native Japanese number system is primarily used for:', opts:['All daily numbers','Counting objects casually','Phone numbers','Numbers above 1,000'], correct:1, explanation:'The native system is used casually for counting objects.' },
  ],
}

const LESSON_KEY = 'week_1_day_3'

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily:'var(--serif)', fontSize:21, color:'var(--text)', margin:'28px 0 10px', lineHeight:1.3 }}>{line.slice(3)}</h2>
    if (line.startsWith('> ')) return <blockquote key={i} style={{ borderLeft:'2px solid var(--amber)', padding:'10px 16px', background:'var(--amber-bg)', borderRadius:'0 8px 8px 0', margin:'14px 0', color:'var(--amber3)', fontStyle:'italic', fontSize:14 }}>{line.slice(2)}</blockquote>
    if (!line.trim()) return null
    return <p key={i} style={{ marginBottom:14 }}>{line}</p>
  })
}

export default function LessonScreen() {
  const [exAnswers, setExAnswers] = useState<Record<number,any>>({})
  const [exInputs, setExInputs] = useState<Record<number,string>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<number,number>>({})
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioSpeed, setAudioSpeed] = useState(1)
  const [audioProgress, setAudioProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [marking, setMarking] = useState(false)
  const [curriculumId, setCurriculumId] = useState<string|null>(null)
  const [userId, setUserId] = useState<string|null>(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await createClient().auth.getUser()
      if (!user) return
      setUserId(user.id)
      const currs = await loadCurricula(user.id)
      if (currs.length > 0) {
        const curr = currs[0]
        setCurriculumId(curr.id)
        const progress = curr.progress || {}
        setIsComplete(!!progress[LESSON_KEY])
      }
    }
    load()
  }, [])

  const markComplete = async () => {
    if (!curriculumId || !userId || isComplete) return
    setMarking(true)
    try {
      const currs = await loadCurricula(userId)
      const curr = currs.find((c: any) => c.id === curriculumId)
      const progress = curr?.progress || {}
      progress[LESSON_KEY] = true
      await updateCurriculumProgress(curriculumId, progress)
      await logActivity(userId, 'lesson', 11)
      await updateStreak(userId)
      setIsComplete(true)
    } catch(e) {
      console.error('Mark complete failed:', e)
    } finally {
      setMarking(false)
    }
  }

  const speak = (text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = audioSpeed
    u.onend = () => { setAudioPlaying(false); setAudioProgress(0) }
    window.speechSynthesis.speak(u)
    setAudioPlaying(true)
  }

  const toggleAudio = () => {
    if (audioPlaying) { window.speechSynthesis.cancel(); setAudioPlaying(false); setAudioProgress(0); return }
    speak(LESSON.title + '. ' + LESSON.content)
  }

  const quizScore = Object.keys(quizAnswers).filter(qi => quizAnswers[Number(qi)] === LESSON.quiz[Number(qi)]?.correct).length

  const sectionLabel = (label: string) => (
    <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.14em', margin:'24px 0 10px', display:'flex', alignItems:'center', gap:8 }}>
      {label}
      <div style={{ flex:1, height:1, background:'var(--border)' }}/>
    </div>
  )

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ width:'100%', height:280, position:'relative' as const, overflow:'hidden' }}>
        <img src={LESSON.heroImage} alt={LESSON.title} style={{ width:'100%', height:'100%', objectFit:'cover' as const }}/>
        <div style={{ position:'absolute' as const, inset:0, background:'linear-gradient(to top, rgba(10,11,15,0.9) 0%, transparent 60%)' }}/>
        <div style={{ position:'absolute' as const, bottom:20, left:28, display:'flex', gap:6 }}>
          <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'3px 8px', borderRadius:4, background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', color:'var(--amber2)', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{LESSON.eyebrow}</span>
          <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'3px 8px', borderRadius:4, background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{LESSON.duration}</span>
          {isComplete && <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'3px 8px', borderRadius:4, background:'var(--green-bg)', border:'1px solid var(--green-border)', color:'var(--green-text)', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>Complete</span>}
        </div>
      </div>

      <div style={{ maxWidth:740, margin:'0 auto', padding:'0 32px 80px' }}>
        <div style={{ padding:'22px 0 18px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:7 }}>{LESSON.subject} · {LESSON.level}</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:30, color:'var(--text)', lineHeight:1.18, marginBottom:12 }}>{LESSON.title}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' as const }}>
            <span style={{ fontSize:10.5, color:'var(--text3)', fontFamily:'var(--mono)' }}>{LESSON.words}</span>
            <div style={{ width:3, height:3, borderRadius:'50%', background:'var(--border3)' }}/>
            <span style={{ fontSize:10.5, color:'var(--text3)', fontFamily:'var(--mono)' }}>{LESSON.duration}</span>
            <div style={{ width:3, height:3, borderRadius:'50%', background:'var(--border3)' }}/>
            <span style={{ fontSize:10.5, color:'var(--text3)', fontFamily:'var(--mono)' }}>3 exercises · 3-question quiz</span>
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, margin:'16px 0' }}>
          <button onClick={toggleAudio} style={{ width:30, height:30, borderRadius:'50%', background:'var(--amber)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:12, color:'#0a0b0f', fontWeight:700 }}>
            {audioPlaying ? 'II' : 'P'}
          </button>
          <div style={{ flex:1, height:3, background:'var(--bg5)', borderRadius:2 }}>
            <div style={{ height:'100%', borderRadius:2, background:'var(--amber)', width:audioProgress+'%' }}/>
          </div>
          <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{LESSON.duration}</span>
          <div style={{ display:'flex', gap:3 }}>
            {[0.75,1,1.25,1.5].map(s => (
              <button key={s} onClick={() => setAudioSpeed(s)} style={{ padding:'2px 6px', borderRadius:4, border:`1px solid ${audioSpeed===s?'var(--amber)':'var(--border2)'}`, background:audioSpeed===s?'var(--amber-bg)':'var(--bg4)', color:audioSpeed===s?'var(--amber)':'var(--text3)', fontSize:9, fontFamily:'var(--mono)', cursor:'pointer' }}>{s}x</button>
            ))}
          </div>
        </div>

        <div style={{ fontSize:15, color:'var(--text2)', lineHeight:1.88, padding:'20px 0' }}>
          {renderContent(LESSON.content)}
        </div>

        {sectionLabel('Step-by-Step Instructions')}
        <div style={{ display:'flex', flexDirection:'column' as const, gap:10, margin:'14px 0' }}>
          {LESSON.steps.map(s => (
            <div key={s.num} style={{ display:'flex', gap:14, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
              <div style={{ width:130, flexShrink:0, background:'var(--bg4)' }}>
                <img src={s.img} alt={s.title} style={{ width:'100%', height:'100%', objectFit:'cover' as const, display:'block', minHeight:100 }}/>
              </div>
              <div style={{ padding:'13px 14px', flex:1 }}>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', background:'var(--amber-bg)', border:'1px solid var(--amber-bg2)', borderRadius:4, padding:'1px 6px', display:'inline-block', marginBottom:6 }}>Step {s.num}</div>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {sectionLabel('Video Walkthrough')}
        <div style={{ margin:'14px 0', borderRadius:10, overflow:'hidden', border:'1px solid var(--border)', background:'var(--bg2)' }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{LESSON.video.title}</div>
            <div style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--mono)' }}>YouTube · Visual Walkthrough</div>
          </div>
          <div style={{ position:'relative' as const, paddingBottom:'56.25%', height:0, overflow:'hidden' }}>
            <iframe src={`https://www.youtube.com/embed/${LESSON.video.id}`} style={{ position:'absolute' as const, inset:0, width:'100%', height:'100%', border:'none' }} allowFullScreen title={LESSON.video.title}/>
          </div>
        </div>

        {sectionLabel('Key Vocabulary')}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:7, margin:'12px 0' }}>
          {LESSON.vocab.map((v,i) => (
            <div key={i} onClick={() => { if(window.speechSynthesis){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(v.word))} }} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, padding:'11px 13px', cursor:'pointer' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:15, color:'var(--text)', fontStyle:'italic', marginBottom:2 }}>{v.word}</div>
              <div style={{ fontSize:10.5, color:'var(--amber)', fontWeight:500, fontFamily:'var(--mono)', marginBottom:4 }}>{v.reading}</div>
              <div style={{ fontSize:11, color:'var(--text3)', lineHeight:1.45 }}>{v.example}</div>
              <div style={{ fontSize:9, color:'var(--blue-text)', fontFamily:'var(--mono)', marginTop:4 }}>tap to hear</div>
            </div>
          ))}
        </div>

        {sectionLabel('Practice Exercises')}
        <div style={{ display:'flex', flexDirection:'column' as const, gap:9, margin:'14px 0' }}>
          {LESSON.exercises.map((ex, ei) => (
            <div key={ei} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'14px 16px' }}>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:7 }}>{ex.type}</div>
              <div style={{ fontSize:13.5, fontWeight:500, color:'var(--text)', marginBottom:10, lineHeight:1.5 }}>{ex.question}</div>
              {ex.type === 'Fill in the Blank' ? (
                <>
                  <input style={{ width:'100%', padding:'8px 11px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:13.5, outline:'none', marginBottom:7 }}
                    placeholder="Your answer..." value={exInputs[ei]||''} onChange={e => setExInputs(p=>({...p,[ei]:e.target.value}))}
                    disabled={exAnswers[ei]!==undefined}
                    onKeyDown={e => { if(e.key==='Enter'&&exAnswers[ei]===undefined){ const correct=(exInputs[ei]||'').trim().toLowerCase()===ex.answer.toLowerCase(); setExAnswers(p=>({...p,[ei]:correct?'correct':'wrong'})) } }}
                  />
                  {exAnswers[ei]===undefined && <button onClick={() => { const correct=(exInputs[ei]||'').trim().toLowerCase()===ex.answer.toLowerCase(); setExAnswers(p=>({...p,[ei]:correct?'correct':'wrong'})) }} style={{ padding:'7px 14px', borderRadius:6, background:'var(--bg4)', border:'1px solid var(--border2)', color:'var(--text2)', fontSize:12, cursor:'pointer', fontFamily:'var(--sans)' }}>Check</button>}
                  {exAnswers[ei]!==undefined && <div style={{ marginTop:8, padding:'8px 12px', borderRadius:7, fontSize:12, lineHeight:1.6, background:exAnswers[ei]==='correct'?'var(--green-bg)':'var(--red-bg)', border:`1px solid ${exAnswers[ei]==='correct'?'var(--green-border)':'var(--red-border)'}`, color:exAnswers[ei]==='correct'?'var(--green-text)':'var(--red-text)' }}>{exAnswers[ei]==='correct'?'Correct! ':(`The answer is "${ex.answer}". `)}{ex.explanation}</div>}
                </>
              ) : (
                <>
                  <div style={{ display:'flex', flexDirection:'column' as const, gap:5 }}>
                    {ex.opts.map((opt, oi) => {
                      let bg='var(--bg3)', border='1px solid var(--border2)', color='var(--text2)'
                      if(exAnswers[ei]!==undefined){ if(oi===ex.correct){bg='var(--green-bg)';border='1px solid var(--green-border)';color='var(--green-text)'}else if(oi===exAnswers[ei]){bg='var(--red-bg)';border='1px solid var(--red-border)';color='var(--red-text)'} }
                      return <button key={oi} onClick={() => { if(exAnswers[ei]===undefined) setExAnswers(p=>({...p,[ei]:oi})) }} style={{ padding:'8px 12px', borderRadius:7, border, background:bg, color, cursor:'pointer', fontSize:13, textAlign:'left' as const, lineHeight:1.4 }}>{opt}</button>
                    })}
                  </div>
                  {exAnswers[ei]!==undefined && <div style={{ marginTop:8, padding:'8px 12px', borderRadius:7, fontSize:12, lineHeight:1.6, background:exAnswers[ei]===ex.correct?'var(--green-bg)':'var(--red-bg)', border:`1px solid ${exAnswers[ei]===ex.correct?'var(--green-border)':'var(--red-border)'}`, color:exAnswers[ei]===ex.correct?'var(--green-text)':'var(--red-text)' }}>{exAnswers[ei]===ex.correct?'Correct! ':'Not quite. '}{ex.explanation}</div>}
                </>
              )}
            </div>
          ))}
        </div>

        {sectionLabel('Check Your Understanding')}
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'18px 20px', margin:'14px 0' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <div style={{ fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>3-Question Quiz</div>
            {Object.keys(quizAnswers).length===LESSON.quiz.length && <div style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--amber)' }}>{quizScore}/{LESSON.quiz.length} correct</div>}
          </div>
          {LESSON.quiz.map((q, qi) => (
            <div key={qi} style={{ marginBottom:14, paddingBottom:14, borderBottom: qi<LESSON.quiz.length-1?'1px solid var(--border)':'none' }}>
              <div style={{ fontSize:13.5, fontWeight:500, color:'var(--text)', marginBottom:8, lineHeight:1.5 }}>{qi+1}. {q.q}</div>
              <div style={{ display:'flex', flexDirection:'column' as const, gap:5 }}>
                {q.opts.map((opt, oi) => {
                  let bg='var(--bg3)', border='1px solid var(--border2)', color='var(--text2)'
                  if(quizAnswers[qi]!==undefined){ if(oi===q.correct){bg='var(--green-bg)';border='1px solid var(--green-border)';color='var(--green-text)'}else if(oi===quizAnswers[qi]){bg='var(--red-bg)';border='1px solid var(--red-border)';color='var(--red-text)'} }
                  return <button key={oi} onClick={() => { if(quizAnswers[qi]===undefined) setQuizAnswers(p=>({...p,[qi]:oi})) }} style={{ padding:'8px 12px', borderRadius:7, border, background:bg, color, cursor:'pointer', fontSize:13, textAlign:'left' as const }}>{opt}</button>
                })}
              </div>
              {quizAnswers[qi]!==undefined && <div style={{ fontSize:11.5, color:'var(--text2)', marginTop:5, padding:'6px 10px', background:'var(--bg4)', borderRadius:6, lineHeight:1.5 }}>{q.explanation}</div>}
            </div>
          ))}
        </div>

        {isComplete ? (
          <div style={{ background:'var(--green-bg)', border:'1px solid var(--green-border)', borderRadius:8, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, margin:'20px 0' }}>
            <div>
              <div style={{ fontSize:13, color:'var(--green-text)', fontWeight:500 }}>Lesson complete!</div>
              <div style={{ fontSize:11, color:'var(--green-text)', marginTop:2 }}>These words have been added to your flashcard deck.</div>
            </div>
            <button onClick={() => router.push('/app')} style={{ padding:'6px 14px', borderRadius:6, background:'var(--green-bg)', border:'1px solid var(--green-border)', color:'var(--green-text)', fontSize:12, cursor:'pointer', fontFamily:'var(--sans)', whiteSpace:'nowrap' as const }}>Back to Home</button>
          </div>
        ) : (
          <button onClick={markComplete} disabled={marking} style={{ width:'100%', padding:'14px', borderRadius:10, background:marking?'var(--bg4)':'var(--amber)', border:`1px solid ${marking?'var(--border2)':'var(--amber)'}`, color:marking?'var(--text2)':'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:500, cursor:marking?'not-allowed':'pointer', margin:'20px 0', transition:'all 0.13s' }}>
            {marking ? 'Saving...' : 'Mark Lesson Complete'}
          </button>
        )}
      </div>
    </div>
  )
}
