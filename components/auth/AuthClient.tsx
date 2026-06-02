'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveCurriculum } from '@/lib/db'
import posthog from 'posthog-js'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

type AuthTab = 'signin' | 'signup' | 'reset' | 'verify' | 'onboarding'

const OB_GOALS = [
  'Learn a language','Music / instrument','Coding & tech','Academic study',
  'Creative writing','History & philosophy','Maths & science','Professional skills','Other'
]
const OB_TIMES = [
  { v:'10', l:'10 min', s:'Light' },
  { v:'20', l:'20 min', s:'Daily' },
  { v:'30', l:'30 min', s:'Solid' },
  { v:'60', l:'1 hour',  s:'Deep'  },
]

function pwScore(pw: string): number {
  let s = 0
  if (pw.length >= 8) s++
  if (pw.length >= 12) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

export default function AuthClient() {
  const [tab, setTab] = useState<AuthTab>('signin')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ t: 'err'|'ok', m: string } | null>(null)
  const [obUser, setObUser] = useState<User | null>(null)
  const [obStep, setObStep] = useState(0)
  const [displayName, setDisplayName] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [dailyTime, setDailyTime] = useState('20')
  const [obSaving, setObSaving] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('onboarding') === 'true') {
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) { setObUser(data.user); setTab('onboarding') }
      })
    }
  }, [])

  const clear = () => setAlert(null)

  const submit = async () => {
    clear()
    if (!email.includes('@')) { setAlert({ t:'err', m:'Enter a valid email address.' }); return }
    if (tab !== 'reset' && pw.length < 8) { setAlert({ t:'err', m:'Password must be at least 8 characters.' }); return }
    if (tab === 'signup' && pw !== confirmPw) { setAlert({ t:'err', m:"Passwords don't match." }); return }
    setLoading(true)
    try {
      if (tab === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw })
        if (error) throw error
        const { data: profile } = await (supabase.from('profiles') as any).select('display_name').eq('id', data.user.id).single()
        if (!profile?.display_name) { setObUser(data.user); setTab('onboarding') }
        else router.push('/app')
      } else if (tab === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email, password: pw,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
        })
        if (error) throw error
        if (data.user) {
          await (supabase.from('profiles') as any).upsert({
            id: data.user.id, email,
            streak: 0, total_days: 0, cards_reviewed: 0, is_pro: false,
            created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
          }, { onConflict: 'id' })
        }
        if (data.user && !data.user.email_confirmed_at) {
          setTab('verify')
        } else if (data.user) {
          setObUser(data.user); setTab('onboarding')
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset`,
        })
        if (error) throw error
        setAlert({ t:'ok', m: `Reset link sent to ${email}` })
        setTab('signin')
      }
    } catch (e: unknown) {
      const err = e as Error
      setAlert({ t:'err', m: err.message })
    } finally { setLoading(false) }
  }

  const finishOnboarding = async () => {
    if (!obUser) return
    setObSaving(true)
    await (supabase.from('profiles') as any).upsert({
      id: obUser.id,
      email: obUser.email,
      display_name: displayName.trim() || obUser.email?.split('@')[0] || 'Learner',
      voice_settings: { daily_goal_minutes: parseInt(dailyTime), goals },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })
    setObSaving(false)
    posthog.identify(obUser.id, { email: obUser.email })
    posthog.capture('signup', { method: obUser.app_metadata?.provider ?? 'email' })
       let dest = '/app'
       try {
         const stashed = localStorage.getItem('lp-demo-claim')
         if (stashed) {
           const { topic, plan } = JSON.parse(stashed)
           const saved = await saveCurriculum(obUser.id, {
             topic: topic || plan?.title || 'My plan',
             level: plan?.level || 'Beginner',
             durLabel: `${plan?.totalWeeks || 2} Weeks`,
             days: plan?.daysPerWeek || 5,
             time: plan?.sessionTime || '20 min',
             style: 'Balanced',
             curriculum: plan,
           })
           localStorage.removeItem('lp-demo-claim')
           posthog.capture('demo-plan-claimed', { topic })
           if (saved?.id) dest = '/app/lesson?id=' + saved.id
         }
       } catch (e) { console.error('Demo claim failed:', e) }
       router.push(dest)
       router.refresh()
  }

  const score = pwScore(pw)
  const sCls = score <= 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong'
  const sLabel = score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong'
  const filled = score <= 1 ? 1 : score === 2 ? 2 : score === 3 ? 3 : 4
  const barColors: Record<string,string> = { weak:'var(--red-text)', fair:'var(--amber)', good:'var(--amber2)', strong:'var(--green-text)' }
  const barCol = barColors[sCls]

  const page: React.CSSProperties = { minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24, position:'relative', overflow:'hidden', background:'var(--bg)' }
  const bgGrid: React.CSSProperties = { position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)', backgroundSize:'40px 40px', opacity:0.25, pointerEvents:'none' }
  const bgGlow: React.CSSProperties = { position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)', width:500, height:260, background:'radial-gradient(ellipse,rgba(212,133,58,0.08) 0%,transparent 70%)', pointerEvents:'none' }
  const card: React.CSSProperties = { background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, padding:'34px 38px', width:'100%', maxWidth:400, position:'relative', zIndex:1 }
  const inp: React.CSSProperties = { width:'100%', padding:'10px 13px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text)', fontFamily:'var(--sans)', fontSize:13.5, outline:'none' }
  const submitBtn: React.CSSProperties = { width:'100%', padding:12, borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13.5, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:7, marginTop:4 }

  if (tab === 'verify') return (
    <div style={page}>
      <div style={bgGrid}/><div style={bgGlow}/>
      <div style={{ ...card, textAlign:'center' }}>
        <div style={{ fontSize:18, fontWeight:700, color:'var(--amber)', marginBottom:14 }}>[ mail ]</div>
        <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:6 }}>Check your email</div>
        <div style={{ fontSize:12.5, color:'var(--text2)', textAlign:'center', marginBottom:20, lineHeight:1.55 }}>
          We sent a confirmation link to <strong style={{ color:'var(--text)' }}>{email}</strong>. Click it, then come back and sign in.
        </div>
        <button style={submitBtn} onClick={() => { setTab('signin'); clear() }}>Back to Sign In</button>
      </div>
    </div>
  )

  if (tab === 'onboarding') {
    const obSteps = ['Profile','Goals','Schedule']
    return (
      <div style={page}>
        <div style={bgGrid}/><div style={bgGlow}/>
        <div style={{ ...card, maxWidth:440 }}>
          <div style={{ display:'flex', alignItems:'center', marginBottom:26 }}>
            {obSteps.map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', flex: i < obSteps.length-1 ? 1 : undefined }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{ width:24, height:24, borderRadius:'50%', border:`1px solid ${obStep>i?'var(--green-border)':obStep===i?'var(--amber)':'var(--border2)'}`, background:obStep>i?'var(--green-bg)':obStep===i?'var(--amber-bg2)':'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontFamily:'var(--mono)', color:obStep>i?'var(--green-text)':obStep===i?'var(--amber)':'var(--text3)' }}>
                    {obStep>i?'✓':i+1}
                  </div>
                  <div style={{ fontSize:8, fontFamily:'var(--mono)', color:obStep===i?'var(--amber)':'var(--text3)', marginTop:3, whiteSpace:'nowrap' }}>{s}</div>
                </div>
                {i<obSteps.length-1 && <div style={{ flex:1, height:1, background:obStep>i?'var(--green-border)':'var(--border2)', margin:'0 5px', marginBottom:12 }}/>}
              </div>
            ))}
          </div>

          {obStep===0 && <>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>Welcome to Learnpath</div>
            <div style={{ fontSize:12.5, color:'var(--text2)', marginBottom:18 }}>What should we call you?</div>
            <input style={{ ...inp, marginBottom:10 }} placeholder={obUser?.email?.split('@')[0] || 'Your name'} value={displayName} onChange={e=>setDisplayName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&setObStep(1)} autoFocus/>
            <input style={{ ...inp, opacity:0.45, cursor:'not-allowed', marginBottom:14 }} value={obUser?.email||''} disabled/>
            <button style={submitBtn} onClick={()=>setObStep(1)}>Continue</button>
          </>}

          {obStep===1 && <>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>What do you want to learn?</div>
            <div style={{ fontSize:12.5, color:'var(--text2)', marginBottom:16 }}>Pick all that apply.</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:18 }}>
              {OB_GOALS.map(g=>(
                <div key={g} onClick={()=>setGoals(gs=>gs.includes(g)?gs.filter(x=>x!==g):[...gs,g])}
                  style={{ padding:'6px 12px', borderRadius:18, border:`1px solid ${goals.includes(g)?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:goals.includes(g)?'var(--amber-bg2)':'var(--bg3)', color:goals.includes(g)?'var(--amber2)':'var(--text2)', fontSize:12, cursor:'pointer' }}>
                  {g}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{ flex:1, padding:11, borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }} onClick={()=>setObStep(0)}>Back</button>
              <button style={{ ...submitBtn, flex:2, marginTop:0 }} onClick={()=>setObStep(2)} disabled={goals.length===0}>Continue</button>
            </div>
          </>}

          {obStep===2 && <>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:4 }}>How long can you study daily?</div>
            <div style={{ fontSize:12.5, color:'var(--text2)', marginBottom:16 }}>Consistent beats heroic.</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7, marginBottom:18 }}>
              {OB_TIMES.map(t=>(
                <div key={t.v} onClick={()=>setDailyTime(t.v)}
                  style={{ padding:'10px 4px', borderRadius:8, border:`1px solid ${dailyTime===t.v?'rgba(212,133,58,0.4)':'var(--border2)'}`, background:dailyTime===t.v?'var(--amber-bg2)':'var(--bg3)', color:dailyTime===t.v?'var(--amber2)':'var(--text2)', fontSize:11, cursor:'pointer', textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--mono)', fontSize:13, fontWeight:500, display:'block', marginBottom:1 }}>{t.l}</div>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', opacity:0.7 }}>{t.s}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{ flex:1, padding:11, borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }} onClick={()=>setObStep(1)}>Back</button>
              <button style={{ ...submitBtn, flex:2, marginTop:0 }} onClick={finishOnboarding} disabled={obSaving}>{obSaving?'Saving...':'Start Learning'}</button>
            </div>
          </>}
        </div>
      </div>
    )
  }

  return (
    <div style={page}>
      <div style={bgGrid}/><div style={bgGlow}/>
      <div style={card}>
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:24, justifyContent:'center' }}>
          <div style={{ width:32, height:32, borderRadius:8, background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--amber)', fontFamily:'var(--mono)' }}>LP</div>
          <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--amber)' }}>Learnpath</div>
        </div>

        {tab !== 'reset' && (
          <div style={{ display:'flex', background:'var(--bg3)', borderRadius:8, padding:3, marginBottom:22, border:'1px solid var(--border)' }}>
            {(['signin','signup'] as const).map(t=>(
              <div key={t} onClick={()=>{setTab(t);clear()}}
                style={{ flex:1, padding:7, borderRadius:6, fontSize:12.5, cursor:'pointer', textAlign:'center', color:tab===t?'var(--text)':'var(--text3)', background:tab===t?'var(--bg2)':'transparent', border:tab===t?'1px solid var(--border2)':'1px solid transparent', fontWeight:500, transition:'all 0.14s' }}>
                {t==='signin'?'Sign In':'Create Account'}
              </div>
            ))}
          </div>
        )}

        <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:3, textAlign:'center' }}>
          {tab==='signin'?'Welcome back':tab==='signup'?'Start learning anything':'Reset password'}
        </div>
        <div style={{ fontSize:12.5, color:'var(--text2)', textAlign:'center', marginBottom:20, lineHeight:1.55 }}>
          {tab==='signin'?'Continue where you left off.':tab==='signup'?'Free account — your first path is on us.':'Enter your email for a reset link.'}
        </div>

        {alert && (
          <div style={{ padding:'9px 12px', borderRadius:7, fontSize:12, marginBottom:12, display:'flex', alignItems:'flex-start', gap:7, background:alert.t==='err'?'var(--red-bg)':'var(--green-bg)', border:`1px solid ${alert.t==='err'?'var(--red-border)':'var(--green-border)'}`, color:alert.t==='err'?'var(--red-text)':'var(--green-text)' }}>
            {alert.t==='err'?'Error:':''} {alert.m}
          </div>
        )}

        <div style={{ marginBottom:13 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text3)', marginBottom:5 }}>
            <span>Email</span>
            {tab==='signin' && <span style={{ fontSize:10.5, color:'var(--amber)', cursor:'pointer', textTransform:'none', letterSpacing:0, fontFamily:'var(--sans)' }} onClick={()=>{setTab('reset');clear()}}>Forgot password?</span>}
          </div>
          <input style={inp} type="email" placeholder="you@example.com" value={email} onChange={e=>{setEmail(e.target.value);clear()}} onKeyDown={e=>e.key==='Enter'&&submit()} autoFocus/>
        </div>

        {tab !== 'reset' && (
          <div style={{ marginBottom:13 }}>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text3)', marginBottom:5 }}>Password</div>
            <div style={{ position:'relative' }}>
              <input style={{ ...inp, paddingRight:36 }} type={showPw?'text':'password'} placeholder={tab==='signup'?'Min 8 characters':'Your password'} value={pw} onChange={e=>{setPw(e.target.value);clear()}} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              <span style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)', color:'var(--text3)', fontSize:11, cursor:'pointer', fontFamily:'var(--mono)' }} onClick={()=>setShowPw(v=>!v)}>{showPw?'hide':'show'}</span>
            </div>
            {tab==='signup' && pw && (
              <>
                <div style={{ display:'flex', gap:3, marginTop:5 }}>
                  {[1,2,3,4].map(b=><div key={b} style={{ flex:1, height:2, borderRadius:1, background:b<=filled?barCol:'var(--bg5)', transition:'background 0.2s' }}/>)}
                </div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', marginTop:3, color:barCol }}>{sLabel} password</div>
              </>
            )}
          </div>
        )}

        {tab==='signup' && (
          <div style={{ marginBottom:13 }}>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text3)', marginBottom:5 }}>Confirm password</div>
            <div style={{ position:'relative' }}>
              <input style={{ ...inp, paddingRight:36, borderColor:confirmPw&&confirmPw!==pw?'var(--red-border)':undefined }} type={showPw?'text':'password'} placeholder="Repeat password" value={confirmPw} onChange={e=>{setConfirmPw(e.target.value);clear()}} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              {confirmPw && <span style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)', color:confirmPw===pw?'var(--green-text)':'var(--red-text)', fontSize:11 }}>{confirmPw===pw?'OK':'no match'}</span>}
            </div>
          </div>
        )}

        <button style={{ ...submitBtn, opacity:(loading||!email||(tab!=='reset'&&!pw)||(tab==='signup'&&!confirmPw))?0.5:1, cursor:(loading||!email)?'not-allowed':'pointer' }}
          onClick={submit} disabled={loading||!email||(tab!=='reset'&&!pw)||(tab==='signup'&&!confirmPw)}>
          {loading?'Please wait...':tab==='signin'?'Sign in':tab==='signup'?'Create free account':'Send reset link'}
        </button>

        {tab !== 'reset' && (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:9, margin:'14px 0', color:'var(--text3)', fontSize:11, fontFamily:'var(--mono)' }}>
              <div style={{ flex:1, height:1, background:'var(--border)' }}/> or <div style={{ flex:1, height:1, background:'var(--border)' }}/>
            </div>
            <button style={{ width:'100%', padding:'10px 13px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text)', fontFamily:'var(--sans)', fontSize:12.5, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:9 }}
              onClick={async()=>{await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${window.location.origin}/auth/callback`}})}}>
              Continue with Google
            </button>
          </>
        )}

        {tab==='signup' && <div style={{ fontSize:10.5, color:'var(--text3)', textAlign:'center', marginTop:14, lineHeight:1.5 }}>By signing up you agree to our Terms and Privacy Policy. MRF Studios.</div>}
        {tab==='reset' && <div style={{ fontSize:11, color:'var(--text3)', textAlign:'center', marginTop:12 }}><span style={{ color:'var(--amber)', cursor:'pointer' }} onClick={()=>{setTab('signin');clear()}}>Back to Sign In</span></div>}
      </div>
      <div style={{ position:'absolute', bottom:18, fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', zIndex:1, letterSpacing:'0.08em' }}>LEARNPATH · MRF STUDIOS · learnpathnow.com</div>
    </div>
  )
}
