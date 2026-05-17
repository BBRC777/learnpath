'use client' // build-0153
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { loadCurricula, loadStreak, loadWeekActivity } from '@/lib/db'
import { useRouter } from 'next/navigation'

const DAY_LABELS = ['M','T','W','T','F','S','S']

function heatColor(val: number) {
  if (val===0) return 'var(--bg4)'
  if (val<=20) return 'rgba(212,133,58,0.25)'
  if (val<=40) return 'rgba(212,133,58,0.55)'
  return 'var(--amber)'
}

export default function ProgressScreen() {
  const [curricula, setCurricula] = useState<any[]>([])
  const [streak, setStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [activityData, setActivityData] = useState<number[]>([0,0,0,0,0,0,0])
  const [heatmap, setHeatmap] = useState<number[]>(Array(28).fill(0))
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState('')
  const [summaryLoading, setSummaryLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await createClient().auth.getUser()
        if (!user) return
        const supabase = createClient()

        const [currs, streakData, activity, profileData, activityHistory] = await Promise.all([
          loadCurricula(user.id),
          (supabase.from('streaks') as any).select('*').eq('user_id', user.id).single(),
          loadWeekActivity(user.id),
          (supabase.from('profiles') as any).select('*').eq('id', user.id).single(),
          (supabase.from('activity') as any).select('*').eq('user_id', user.id).order('date', { ascending: false }).limit(28),
        ])

        setCurricula(currs)
        setStreak(streakData.data?.current_streak || 0)
        setLongestStreak(streakData.data?.longest_streak || 0)
        setActivityData(activity)
        setProfile(profileData.data)

        // Build 28-day heatmap
        const acts = activityHistory.data || []
        const heat = Array(28).fill(0)
        const today = new Date()
        for (let i = 0; i < 28; i++) {
          const d = new Date(today)
          d.setDate(d.getDate() - (27 - i))
          const dateStr = d.toISOString().split('T')[0]
          const found = acts.find((a: any) => a.date === dateStr)
          heat[i] = found?.count || 0
        }
        setHeatmap(heat)
      } catch(e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const generateSummary = async () => {
    setSummaryLoading(true)
    setShowSummary(true)
    setSummary('')
    const totalMinsVal = activityData.reduce((a,b)=>a+b,0)
    const doneLessonsVal = curricula.reduce((a, c) => a + Object.values(c.progress||{}).filter(Boolean).length, 0)
    const pathNames = curricula.map(c => c.curriculum?.title || c.topic).join(', ')
    const prompt = `You are a learning coach. Give a warm, encouraging end-of-week summary for a student.

Their stats this week:
- Study time:  minutes across 7 days
- Lessons completed: 
- Current streak:  days
- Learning paths: 
- XP earned: 
- Level: 

Write a 3-paragraph summary:
1. Celebrate what they accomplished this week (specific, warm)
2. Identify one area to focus on next week based on their paths
3. An encouraging closing that motivates them to keep going

Keep it personal, concise, and motivating. No bullet points - flowing prose only.

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stream: true, messages: [{ role: 'user', content: prompt }] })
      })
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try { const p = JSON.parse(data); if (p.text) { full += p.text; setSummary(full) } } catch {}
        }
      }
    } catch(e) { setSummary('Unable to generate summary. Please try again.') }
    finally { setSummaryLoading(false) }
  }

  const totalMins = activityData.reduce((a,b)=>a+b,0)
  const maxAct = Math.max(...activityData, 1)
  const totalLessons = curricula.reduce((a, c) => {
    const weeks = c.curriculum?.weeks || []
    return a + weeks.reduce((b: number, w: any) => b + (w.days?.length||0), 0)
  }, 0)
  const doneLessons = curricula.reduce((a, c) => a + Object.values(c.progress||{}).filter(Boolean).length, 0)

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  )

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:740, margin:'0 auto', padding:'24px 28px 60px' }}>

        {/* Weekly Summary Button */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)' }}>Your Progress</div>
          <button onClick={generateSummary} disabled={summaryLoading} style={{ padding:'8px 16px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>
            {summaryLoading ? 'Generating...' : '* Weekly Summary'}
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9, marginBottom:22 }}>
          {[
            { v: streak,                    l:'Day streak',      c:'var(--amber)' },
            { v: totalMins+'m',             l:'This week',       c:'var(--blue-text)' },
            { v: doneLessons,               l:'Lessons done',    c:'var(--green-text)' },
            { v: profile?.cards_reviewed??0, l:'Cards reviewed', c:'var(--purple-text)' },
          ].map((s,i) => (
            <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 16px' }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:24, fontWeight:500, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:16, marginBottom:20 }}>

          {/* Left col */}
          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>

            {/* Activity chart */}
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em' }}>This week</div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{totalMins} min total</div>
              </div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:80 }}>
                {activityData.map((m,i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column' as const, alignItems:'center', gap:3 }}>
                    <div style={{ width:'100%', flex:1, background:'var(--bg4)', borderRadius:3, position:'relative' as const, overflow:'hidden', minHeight:60 }}>
                      <div style={{ position:'absolute' as const, bottom:0, left:0, right:0, borderRadius:3, height:(Math.round((m/maxAct)*100))+'%', background:i===6?'var(--amber)':m>0?'var(--blue-text)':'transparent', opacity:i===6?1:0.55 }}/>
                    </div>
                    <div style={{ fontSize:8, fontFamily:'var(--mono)', color:i===6?'var(--amber)':'var(--text3)' }}>{DAY_LABELS[i]}</div>
                    {m>0 && <div style={{ fontSize:7.5, fontFamily:'var(--mono)', color:'var(--text3)' }}>{m}m</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Learning paths progress */}
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em', marginBottom:14 }}>Learning Paths</div>
              {curricula.length === 0 ? (
                <div style={{ fontSize:13, color:'var(--text3)', textAlign:'center' as const, padding:'16px 0' }}>No paths yet</div>
              ) : curricula.map((c,i) => {
                const weeks = c.curriculum?.weeks || []
                const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
                const done = Object.values(c.progress||{}).filter(Boolean).length
                const pct = total ? Math.round((done/total)*100) : 0
                const colors = ['#d4853a','#7aacef','#b090f0','#6abf8a','#ef7a7a']
                const color = colors[i % colors.length]
                return (
                  <div key={c.id} style={{ marginBottom:14, cursor:'pointer' }} onClick={() => router.push('/app/lesson?id='+c.id)}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                        <div style={{ width:8, height:8, borderRadius:'50%', background:color }}/>
                        <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{c.curriculum?.title || c.topic}</div>
                      </div>
                      <div style={{ fontSize:10, fontFamily:'var(--mono)', color }}>{pct}%</div>
                    </div>
                    <div style={{ height:4, background:'var(--bg5)', borderRadius:2 }}>
                      <div style={{ height:'100%', borderRadius:2, background:color, width:pct+'%', transition:'width 0.5s' }}/>
                    </div>
                    <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:4 }}>{done}/{total} sessions - {c.level} - {c.dur_label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right col */}
          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>

            {/* Streak */}
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
                <div>
                  <div style={{ fontFamily:'var(--mono)', fontSize:36, color:'var(--amber)', fontWeight:500, lineHeight:1 }}>{streak}</div>
                  <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>Day streak</div>
                </div>
                <div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:3 }}>Best: {longestStreak} days</div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>Total: {profile?.total_days||0} days studied</div>
                  <div style={{ fontSize:10, color: streak>0?'var(--amber)':'var(--text3)', marginTop:4 }}>{streak>0?'Keep going!':'Start your streak today'}</div>
                </div>
              </div>

              {/* 28-day heatmap */}
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:6, letterSpacing:'0.06em' }}>LAST 4 WEEKS</div>
              <div style={{ display:'flex', justifyContent:'space-around', marginBottom:4 }}>
                {DAY_LABELS.map((d,i) => <div key={i} style={{ fontSize:7.5, fontFamily:'var(--mono)', color:'var(--text3)', textAlign:'center' as const, flex:1 }}>{d}</div>)}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
                {heatmap.map((v,i) => (
                  <div key={i} style={{ aspectRatio:'1', borderRadius:3, background:heatColor(v) }} title={v>0?v+'min':''} />
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:8 }}>
                <span style={{ fontSize:8, fontFamily:'var(--mono)', color:'var(--text3)' }}>Less</span>
                {[0,15,30,60].map(v => <div key={v} style={{ width:9, height:9, borderRadius:2, background:heatColor(v) }}/>)}
                <span style={{ fontSize:8, fontFamily:'var(--mono)', color:'var(--text3)' }}>More</span>
              </div>
            </div>

            {/* Flashcard health */}
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em', marginBottom:12 }}>Flashcard Health</div>
              {[
                { label:'Cards reviewed', v: profile?.cards_reviewed??0, c:'var(--amber)',        bg:'var(--amber-bg)',   b:'var(--amber-bg2)' },
                { label:'Lessons done',   v: doneLessons,                 c:'var(--green-text)',  bg:'var(--green-bg)',   b:'var(--green-border)' },
                { label:'Active paths',   v: curricula.length,            c:'var(--blue-text)',   bg:'var(--blue-bg)',    b:'var(--blue-border)' },
                { label:'Study days',     v: profile?.total_days??0,      c:'var(--purple-text)', bg:'var(--purple-bg)',  b:'var(--purple-border)' },
              ].map((s,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:9 }}>
                  <span style={{ fontSize:12, color:'var(--text2)' }}>{s.label}</span>
                  <span style={{ fontSize:11, fontFamily:'var(--mono)', padding:'2px 8px', borderRadius:4, background:s.bg, border:'1px solid '+s.b, color:s.c }}>{s.v}</span>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em', marginBottom:12 }}>Recent Activity</div>
              {curricula.slice(0,4).map((c,i) => {
                const done = Object.values(c.progress||{}).filter(Boolean).length
                return (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:i<3?'1px solid var(--border)':'none' }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{c.curriculum?.title||c.topic}</div>
                      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:1 }}>{done} sessions complete</div>
                    </div>
                    <span style={{ fontSize:10, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:4, background: done>0?'var(--green-bg)':'var(--bg4)', border:'1px solid '+(done>0?'var(--green-border)':'var(--border2)'), color:done>0?'var(--green-text)':'var(--text3)', whiteSpace:'nowrap' as const }}>
                      {done>0?'In Progress':'Not started'}
                    </span>
                  </div>
                )
              })}
              {curricula.length === 0 && <div style={{ fontSize:13, color:'var(--text3)', textAlign:'center' as const, padding:'8px 0' }}>No activity yet</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Summary Modal */}
      {showSummary && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={() => setShowSummary(false)}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'32px 36px', width:'100%', maxWidth:560, maxHeight:'80vh', overflowY:'auto' as const }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)' }}>* Weekly Summary</div>
              <button onClick={() => setShowSummary(false)} style={{ background:'none', border:'none', color:'var(--text3)', fontSize:18, cursor:'pointer' }}>x</button>
            </div>
            {summaryLoading && !summary && (
              <div style={{ display:'flex', alignItems:'center', gap:10, color:'var(--text2)', fontSize:13 }}>
                <div style={{ width:16, height:16, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                Claude is writing your summary...
              </div>
            )}
            {summary && (
              <div style={{ fontSize:14.5, color:'var(--text2)', lineHeight:1.85, whiteSpace:'pre-wrap' as const }}>{summary}</div>
            )}
            {!summaryLoading && summary && (
              <button onClick={() => setShowSummary(false)} style={{ marginTop:24, padding:'10px 24px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Done</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}




        {showSummary && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={() => setShowSummary(false)}>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'32px 36px', width:'100%', maxWidth:560, maxHeight:'80vh', overflowY:'auto' as const }} onClick={e => e.stopPropagation()}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)' }}>* Weekly Summary</div>
                <button onClick={() => setShowSummary(false)} style={{ background:'none', border:'none', color:'var(--text3)', fontSize:18, cursor:'pointer' }}>x</button>
              </div>
              {summaryLoading && !summary && (
                <div style={{ display:'flex', alignItems:'center', gap:10, color:'var(--text2)', fontSize:13 }}>
                  <div style={{ width:16, height:16, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                  Claude is writing your summary...
                </div>
              )}
              {summary && (
                <div style={{ fontSize:14.5, color:'var(--text2)', lineHeight:1.85, whiteSpace:'pre-wrap' as const }}>{summary}</div>
              )}
              {!summaryLoading && summary && (
                <button onClick={() => setShowSummary(false)} style={{ marginTop:24, padding:'10px 24px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Done</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
