'use client'
import { getUpgradeUrl } from '@/lib/upgrade'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { loadCurricula, loadStreak, loadWeekActivity, isProActive } from '@/lib/db'
import { useRouter } from 'next/navigation'

const DAY_LABELS = ['M','T','W','T','F','S','S']
const COLORS = ['#d4853a','#7aacef','#b090f0','#6abf8a','#ef7a7a','#e8a55a']

function getGreeting(): string {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

function getDisplayName(profile: any): string {
  if (profile?.display_name) return profile.display_name.split(' ')[0]
  if (profile?.email) return profile.email.split('@')[0]
  return 'Learner'
}

const VOCAB_DUE = [
  { w:'ichi', o:true },{ w:'juu', o:true },{ w:'hyaku', o:false },
  { w:'nana', o:false },{ w:'print()', o:true },{ w:'def', o:false },
]

export default function HomeScreen({ profile }: { profile: any }) {
  const [curricula, setCurricula] = useState<any[]>([])
  const [streak, setStreak] = useState(0)
  const [activityData, setActivityData] = useState<number[]>([0,0,0,0,0,0,0])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string>('')
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await createClient().auth.getUser()
        if (!user) return
        setUserId(user.id)
        const [currs, streakData, activity] = await Promise.all([
          loadCurricula(user.id),
          loadStreak(user.id),
          loadWeekActivity(user.id),
        ])
        setCurricula(currs)
        setStreak(streakData.current_streak || 0)
        setActivityData(activity)
              if (currs.length === 0 && !localStorage.getItem('lp_welcomed')) setShowWelcome(true)
      } catch(e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const name = getDisplayName(profile)
  const isPro = isProActive(profile)
  const maxAct = Math.max(...activityData, 1)
  const totalMins = activityData.reduce((a,b)=>a+b,0)
  const activeCurr = curricula[0]
  const currProgress = activeCurr?.progress || {}
  const currWeeks = activeCurr?.curriculum?.weeks || []
  const totalSessions = currWeeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
  const doneSessions = Object.values(currProgress).filter(Boolean).length
  const pct = totalSessions ? Math.round((doneSessions/totalSessions)*100) : 0

  const GRID3: React.CSSProperties = { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:8 }
  const CARD: React.CSSProperties = { background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:9, padding:'12px 14px' , minWidth: 0 }

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:740, margin:'0 auto', padding:'22px 16px 60px', boxSizing:'border-box' as const, overflowX:'hidden' as const, width:'100%' }}>

        {/* Pro banner */}
        {!isPro && (
          <div style={{ background:'linear-gradient(135deg,rgba(212,133,58,0.12),rgba(212,133,58,0.05))', border:'1px solid rgba(212,133,58,0.25)', borderRadius:10, padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:18 }}>
            <div>
              <div style={{ fontSize:12.5, fontWeight:500, color:'var(--amber2)', marginBottom:2 }}>Unlock Learnpath Pro</div>
              <div style={{ fontSize:11, color:'var(--text2)' }}>Unlimited paths, AI Tutor, Study Mode — $9.99/mo or $79.99/yr</div>
            </div>
            <button onClick={() => window.open(getUpgradeUrl(userId), '_blank')} style={{ padding:'7px 14px', borderRadius:7, background:'var(--amber)', border:'none', color:'#0a0b0f', fontSize:11.5, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap' as const, fontFamily:'var(--sans)' }}>Upgrade</button>
          </div>
        )}

        {/* 1. GREETING */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.12em', textTransform:'uppercase' as const, marginBottom:3 }}>
            {new Date().toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric' })}
          </div>
          <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', marginBottom:3 }}>{getGreeting()}, {name}</div>
          <div style={{ fontSize:13, color:'var(--text2)' }}>
            {loading ? 'Loading...' : curricula.length === 0 ? 'Build your first learning path to get started.' : `${curricula.length} active path${curricula.length!==1?'s':''} · ${streak > 0 ? streak+' day streak' : 'Start your streak today'}`}
          </div>
        </div>

        {/* 2. CONTINUE CARD */}
        {activeCurr ? (
          <div onClick={() => router.push('/app/lesson?id=' + activeCurr.id)} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', display:'flex', cursor:'pointer', marginBottom:18 }}>
            <div style={{ width:120, flexShrink:0, background:'var(--bg4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--amber)', opacity:0.35 }}>LP</div>
            </div>
            <div style={{ flex:1, padding:'16px 18px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between', minWidth:0 }}>
              <div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:4 }}>Continue · {activeCurr.topic}</div>
                <div style={{ fontFamily:'var(--serif)', fontSize:17, color:'var(--text)', marginBottom:4 }}>{activeCurr.curriculum?.title || activeCurr.topic}</div>
                <div style={{ fontSize:12, color:'var(--text2)' }}>{activeCurr.level} · {activeCurr.dur_label} · {pct}% complete</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:10 }}>
                <div style={{ flex:1, height:2, background:'var(--bg5)', borderRadius:1 }}>
                  <div style={{ height:'100%', borderRadius:1, background:'var(--amber)', width:pct+'%' }}/>
                </div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--amber)' }}>{pct}%</div>
                <button style={{ padding:'5px 13px', borderRadius:5, background:'var(--amber)', border:'none', color:'#0a0b0f', fontSize:11.5, fontWeight:500, cursor:'pointer', fontFamily:'var(--sans)' }}>Continue</button>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={() => router.push('/app/curriculum')} style={{ ...CARD, borderStyle:'dashed', borderColor:'var(--border2)', padding:'28px', marginBottom:18, textAlign:'center' as const, cursor:'pointer' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:18, color:'var(--text2)', marginBottom:6 }}>No learning paths yet</div>
            <div style={{ fontSize:13, color:'var(--text3)', marginBottom:14 }}>Build your first AI-generated curriculum — takes 30 seconds.</div>
            <button style={{ padding:'9px 20px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Build my first path</button>
          </div>
        )}

        {/* 3. PATH TILES — same grid as stats */}
        {curricula.length > 0 && (
          <div style={{ marginBottom:18 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em' }}>My Paths</div>
              <div onClick={() => router.push('/app/paths')} style={{ fontSize:10, color:'var(--amber)', cursor:'pointer', fontFamily:'var(--mono)' }}>View all</div>
            </div>
            <div style={GRID3}>
              {curricula.slice(0,6).map((c,i) => {
                const weeks = c.curriculum?.weeks || []
                const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
                const done = Object.values(c.progress||{}).filter(Boolean).length
                const p = total ? Math.round((done/total)*100) : 0
                const color = COLORS[i % COLORS.length]
                return (
                  <div key={c.id} onClick={() => router.push('/app/lesson?id=' + c.id)} style={{ ...CARD, cursor:'pointer' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
                      <div style={{ width:7, height:7, borderRadius:'50%', background:color, flexShrink:0 }}/>
                      <div style={{ fontSize:11, fontWeight:500, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, minWidth:0, flex:1 }}>{c.curriculum?.title || c.topic}</div>
                    </div>
                    <div style={{ height:3, background:'var(--bg5)', borderRadius:2, marginBottom:5 }}>
                      <div style={{ height:'100%', borderRadius:2, background:color, width:p+'%' }}/>
                    </div>
                    <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--text3)' }}>{c.level} · {p}%</div>
                  </div>
                )
              })}
            </div>
            {curricula.length > 6 && (
              <div onClick={() => router.push('/app/paths')} style={{ fontSize:11, color:'var(--amber)', fontFamily:'var(--mono)', textAlign:'center' as const, cursor:'pointer', padding:'8px', marginTop:4 }}>
                +{curricula.length-6} more paths
              </div>
            )}
          </div>
        )}

        {/* 4. STATS — exact same grid */}
        <div style={{ ...GRID3, marginBottom:18 }}>
          {[
            { v: streak,                                l:'Day streak',     c:'var(--amber)' },
            { v: totalMins > 0 ? totalMins+'m' : '0m', l:'This week',      c:'var(--blue-text)' },
            { v: profile?.cards_reviewed ?? 0,          l:'Cards reviewed', c:'var(--green-text)' },
          ].map((s,i) => (
            <div key={i} style={CARD}>
              <div style={{ fontFamily:'var(--mono)', fontSize:21, fontWeight:500, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* 5. ACTIVITY + FLASHCARDS */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:14 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em' }}>This week</div>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{totalMins} min</div>
            </div>
            <div style={{ ...CARD, padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:64 }}>
                {activityData.map((m,i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column' as const, alignItems:'center', gap:3 }}>
                    <div style={{ width:'100%', flex:1, background:'var(--bg4)', borderRadius:3, position:'relative' as const, overflow:'hidden', minHeight:48 }}>
                      <div style={{ position:'absolute' as const, bottom:0, left:0, right:0, borderRadius:3, height:`${(m/maxAct)*100}%`, background:i===6?'var(--amber)':m>0?'var(--blue-text)':'transparent', opacity:i===6?1:0.55 }}/>
                    </div>
                    <div style={{ fontSize:8, fontFamily:'var(--mono)', color:i===6?'var(--amber)':'var(--text3)' }}>{DAY_LABELS[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em' }}>Flashcards due</div>
              <div onClick={() => router.push('/app/flashcards')} style={{ fontSize:10, color:'var(--amber)', cursor:'pointer', fontFamily:'var(--mono)' }}>Review all</div>
            </div>
            <div style={{ ...CARD, padding:'14px 16px' }}>
              <div style={{ fontSize:11, color:'var(--text2)', marginBottom:8 }}>
                <span style={{ color:'var(--red-text)', fontFamily:'var(--mono)', fontWeight:500 }}>3 overdue</span>
                <span style={{ color:'var(--text3)', margin:'0 4px' }}>·</span>
                <span style={{ color:'var(--amber)', fontFamily:'var(--mono)' }}>6 due</span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap' as const, gap:5, marginBottom:11 }}>
                {VOCAB_DUE.map((v,i) => (
                  <div key={i} style={{ padding:'3px 9px', borderRadius:10, fontSize:10.5, fontFamily:'var(--mono)', cursor:'pointer', background:v.o?'var(--red-bg)':'var(--amber-bg)', border:`1px solid ${v.o?'var(--red-border)':'var(--amber-bg2)'}`, color:v.o?'var(--red-text)':'var(--amber2)' }}>
                    {v.w}
                  </div>
                ))}
              </div>
              <button onClick={() => router.push('/app/flashcards')} style={{ width:'100%', padding:8, borderRadius:7, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:12, fontWeight:500, cursor:'pointer' }}>
                Start review
              </button>
      {showWelcome && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={() => { setShowWelcome(false); localStorage.setItem('lp_welcomed','1') }}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:20, padding:'40px 36px', maxWidth:480, width:'100%', textAlign:'center' as const }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:'var(--serif)', fontSize:13, color:'var(--amber)', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:12 }}>◆ Welcome to Learnpath</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--text)', lineHeight:1.2, marginBottom:14 }}>Learn anything with AI-generated curriculums</div>
            <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.75, marginBottom:28 }}>Tell us what you want to learn and we will build you a complete structured curriculum — lessons, flashcards, quizzes, and an AI tutor — in seconds.</div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:10 }}>
              <button onClick={() => { setShowWelcome(false); localStorage.setItem('lp_welcomed','1'); router.push('/app/curriculum') }} style={{ padding:'13px 24px', borderRadius:10, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:14, fontWeight:600, cursor:'pointer' }}>Build my first learning path →</button>
              <button onClick={() => { setShowWelcome(false); localStorage.setItem('lp_welcomed','1') }} style={{ padding:'10px 24px', borderRadius:10, background:'none', border:'none', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:12, cursor:'pointer' }}>I will explore on my own</button>
            </div>
          </div>
        </div>
      )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}