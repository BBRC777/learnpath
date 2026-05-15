'use client'
// components/auth/AuthClient.tsx
// Full auth flow: sign in, sign up, onboarding, password reset
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
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
  const [pw, setPw]       = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw]       = useState(false)
  const [loading, setLoading]     = useState(false)
  const [alert, setAlert]         = useState<{ t: 'err'|'ok', m: string } | null>(null)
  // Onboarding state
  const [obUser, setObUser]       = useState<User | null>(null)
  const [obStep, setObStep]       = useState(0)
  const [displayName, setDisplayName] = useState('')
  const [goals, setGoals]         = useState<string[]>([])
  const [dailyTime, setDailyTime] = useState('20')
  const [obSaving, setObSaving]   = useState(false)

  const supabase = createClient()
  const router   = useRouter()

  // Check if redirected back for onboarding
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
    if (!email.includes('@'))       { setAlert({ t:'err', m:'Enter a valid email address.' }); return }
    if (tab !== 'reset' && pw.length < 8) { setAlert({ t:'err', m:'Password must be at least 8 characters.' }); return }
    if (tab === 'signup' && pw !== confirmPw) { setAlert({ t:'err', m:'Passwords don\'t match.' }); return }
    setLoading(true)
    try {
      if (tab === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw })
        if (error) throw error
        // Check if profile needs onboarding
        const { data: profile } = await (supabase.from('profiles') as any).select('display_name').eq('id', data.user.id).single()
        if (!profile?.display_name) { setObUser(data.user); setTab('onboarding') }
        else router.push('/app')
      } else if (tab === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email, password: pw,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
        })
        if (error) throw error
        // Create initial profile row
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
    router.push('/app')
    router.refresh()
  }

  const score  = pwScore(pw)
  const sCls   = score <= 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong'
  const sLabel = score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong'
  const filled = score <= 1 ? 1 : score === 2 ? 2 : score === 3 ? 3 : 4
  const colors = { weak:'var(--red-text)', fair:'var(--amber)', good:'var(--amber2)', strong:'var(--green-text)' }
  const barCol = colors[sCls as keyof typeof colors]

  // â”€â”€ ONBOARDING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (tab === 'onboarding') {
    const obSteps = ['Profile','Goals','Schedule']
    return (
      <div style={styles.page}>
        <div style={styles.bgGrid}/><div style={styles.bgGlow}/>
        <div style={{...styles.card, maxWidth:440}}>
          {/* Steps */}
          <div style={{display:'flex',alignItems:'center',marginBottom:26}}>
            {obSteps.map((s,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',flex:i<obSteps.length-1?1:undefined}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{width:24,height:24,borderRadius:'50%',border:`1px solid ${obStep>i?'var(--green-border)':obStep===i?'var(--amber)':'var(--border2)'}`,background:obStep>i?'var(--green-bg)':obStep===i?'var(--amber-bg2)':'var(--bg3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontFamily:'var(--mono)',color:obStep>i?'var(--green-text)':obStep===i?'var(--amber)':'var(--text3)'}}>
                    {obStep>i?'âœ“':i+1}
                  </div>
                  <div style={{fontSize:8,fontFamily:'var(--mono)',color:obStep===i?'var(--amber)':'var(--text3)',marginTop:3,whiteSpace:'nowrap'}}>{s}</div>
                </div>
                {i<obSteps.length-1 && <div style={{flex:1,height:1,background:obStep>i?'var(--green-border)':'var(--border2)',margin:'0 5px',marginBottom:12}}/>}
              </div>
            ))}
          </div>

          {obStep===0 && <>
            <div style={styles.cardTitle}>Welcome to Learnpath ðŸ‘‹</div>
            <div style={styles.cardSub}>What should we call you?</div>
            <input style={styles.inp} placeholder={obUser?.email?.split('@')[0] || 'Your name'} value={displayName} onChange={e=>setDisplayName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&setObStep(1)} autoFocus/>
            <input style={{...styles.inp,opacity:0.45,cursor:'not-allowed',marginTop:10}} value={obUser?.email||''} disabled/>
            <button style={{...styles.submitBtn,marginTop:14}} onClick={()=>setObStep(1)}>Continue â†’</button>
          </>}

          {obStep===1 && <>
            <div style={styles.cardTitle}>What do you want to learn?</div>
            <div style={styles.cardSub}>Pick all that apply â€” Claude uses this to suggest curricula.</div>
            <div style={{display:'flex',flexWrap:'wrap' as const,gap:7,marginBottom:18}}>
              {OB_GOALS.map(g=>(
                <div key={g} onClick={()=>setGoals(gs=>gs.includes(g)?gs.filter(x=>x!==g):[...gs,g])}
                  style={{padding:'6px 12px',borderRadius:18,border:`1px solid ${goals.includes(g)?'rgba(212,133,58,0.4)':'var(--border2)'}`,background:goals.includes(g)?'var(--amber-bg2)':'var(--bg3)',color:goals.includes(g)?'var(--amber2)':'var(--text2)',fontSize:12,cursor:'pointer',transition:'all 0.13s'}}>
                  {g}
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <button style={styles.backBtn} onClick={()=>setObStep(0)}>â† Back</button>
              <button style={{...styles.submitBtn,flex:2}} onClick={()=>setObStep(2)} disabled={goals.length===0}>Continue â†’</button>
            </div>
          </>}

          {obStep===2 && <>
            <div style={styles.cardTitle}>How long can you study daily?</div>
            <div style={styles.cardSub}>Consistent beats heroic.</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:7,marginBottom:18}}>
              {OB_TIMES.map(t=>(
                <div key={t.v} onClick={()=>setDailyTime(t.v)}
                  style={{padding:'10px 4px',borderRadius:8,border:`1px solid ${dailyTime===t.v?'rgba(212,133,58,0.4)':'var(--border2)'}`,background:dailyTime===t.v?'var(--amber-bg2)':'var(--bg3)',color:dailyTime===t.v?'var(--amber2)':'var(--text2)',fontSize:11,cursor:'pointer',textAlign:'center' as const,transition:'all 0.13s'}}>
                  <div style={{fontFamily:'var(--mono)',fontSize:13,fontWeight:500,display:'block',marginBottom:1}}>{t.l}</div>
                  <div style={{fontSize:9,fontFamily:'var(--mono)',opacity:0.7}}>{t.s}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <button style={styles.backBtn} onClick={()=>setObStep(1)}>â† Back</button>
              <button style={{...styles.submitBtn,flex:2}} onClick={finishOnboarding} disabled={obSaving}>
                {obSaving?'Savingâ€¦':'Start Learning â†’'}
              </button>
            </div>
          </>}
        </div>
      </div>
    )
  }

  // â”€â”€ VERIFY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (tab === 'verify') return (
    <div style={styles.page}>
      <div style={styles.bgGrid}/><div style={styles.bgGlow}/>
      <div style={{...styles.card,textAlign:'center' as const}}>
        <div style={{fontSize:40,marginBottom:14}}>âœ‰ï¸</div>
        <div style={styles.cardTitle}>Check your email</div>
        <div style={styles.cardSub}>We sent a confirmation link to <strong style={{color:'var(--text)'}}>{email}</strong>.<br/>Click it, then come back and sign in.</div>
        <button style={styles.submitBtn} onClick={()=>{setTab('signin');clear()}}>Back to Sign In</button>
      </div>
    </div>
  )

  // â”€â”€ SIGN IN / SIGN UP / RESET â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  return (
    <div style={styles.page}>
      <div style={styles.bgGrid}/><div style={styles.bgGlow}/>
      <div style={styles.card}>
        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:24,justifyContent:'center'}}>
          <div style={{width:32,height:32,borderRadius:8,background:'var(--amber-bg2)',border:'1px solid rgba(212,133,58,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>ðŸ“š</div>
          <div style={{fontFamily:'var(--serif)',fontSize:20,color:'var(--amber)'}}>Learnpath</div>
        </div>

        {tab !== 'reset' && (
          <div style={{display:'flex',background:'var(--bg3)',borderRadius:8,padding:3,marginBottom:22,border:'1px solid var(--border)'}}>
            {(['signin','signup'] as const).map(t=>(
              <div key={t} onClick={()=>{setTab(t);clear()}}
                style={{flex:1,padding:'7px',borderRadius:6,fontSize:12.5,cursor:'pointer',textAlign:'center' as const,color:tab===t?'var(--text)':'var(--text3)',background:tab===t?'var(--bg2)':'transparent',border:tab===t?'1px solid var(--border2)':'1px solid transparent',fontWeight:500,transition:'all 0.14s'}}>
                {t==='signin'?'Sign In':'Create Account'}
              </div>
            ))}
          </div>
        )}

        <div style={styles.cardTitle}>{tab==='signin'?'Welcome back':tab==='signup'?'Start learning anything':'Reset password'}</div>
        <div style={styles.cardSub}>{tab==='signin'?'Continue where you left off.':tab==='signup'?'Free account â€” your first path is on us.':'Enter your email for a reset link.'}</div>

        {alert && (
          <div style={{padding:'9px 12px',borderRadius:7,fontSize:12,marginBottom:12,display:'flex',alignItems:'flex-start',gap:7,background:alert.t==='err'?'var(--red-bg)':'var(--green-bg)',border:`1px solid ${alert.t==='err'?'var(--red-border)':'var(--green-border)'}`,color:alert.t==='err'?'var(--red-text)':'var(--green-text)'}}>
            <span>{alert.t==='err'?'âš ':'âœ“'}</span> {alert.m}
          </div>
        )}

        {/* Email */}
        <div style={{marginBottom:13}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:9,fontFamily:'var(--mono)',textTransform:'uppercase' as const,letterSpacing:'0.1em',color:'var(--text3)',marginBottom:5}}>
            <span>Email</span>
            {tab==='signin' && <span style={{fontSize:10.5,color:'var(--amber)',cursor:'pointer',textTransform:'none' as const,letterSpacing:0,fontFamily:'var(--sans)'}} onClick={()=>{setTab('reset');clear()}}>Forgot password?</span>}
          </div>
          <input style={styles.inp} type="email" placeholder="you@example.com" value={email} onChange={e=>{setEmail(e.target.value);clear()}} onKeyDown={e=>e.key==='Enter'&&submit()} autoFocus/>
        </div>

        {tab !== 'reset' && (
          <div style={{marginBottom:13}}>
            <div style={{fontSize:9,fontFamily:'var(--mono)',textTransform:'uppercase' as const,letterSpacing:'0.1em',color:'var(--text3)',marginBottom:5}}>Password</div>
            <div style={{position:'relative'}}>
              <input style={{...styles.inp,paddingRight:36}} type={showPw?'text':'password'} placeholder={tab==='signup'?'Min 8 characters':'Your password'} value={pw} onChange={e=>{setPw(e.target.value);clear()}} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              <span style={{position:'absolute',right:11,top:'50%',transform:'translateY(-50%)',color:'var(--text3)',fontSize:13,cursor:'pointer'}} onClick={()=>setShowPw(v=>!v)}>{showPw?'ðŸ™ˆ':'ðŸ‘'}</span>
            </div>
            {tab==='signup' && pw && (
              <>
                <div style={{display:'flex',gap:3,marginTop:5}}>
                  {[1,2,3,4].map(b=><div key={b} style={{flex:1,height:2,borderRadius:1,background:b<=filled?barCol:'var(--bg5)',transition:'background 0.2s'}}/>)}
                </div>
                <div style={{fontSize:9,fontFamily:'var(--mono)',marginTop:3,color:barCol}}>{sLabel} password</div>
              </>
            )}
          </div>
        )}

        {tab==='signup' && (
          <div style={{marginBottom:13}}>
            <div style={{fontSize:9,fontFamily:'var(--mono)',textTransform:'uppercase' as const,letterSpacing:'0.1em',color:'var(--text3)',marginBottom:5}}>Confirm password</div>
            <div style={{position:'relative'}}>
              <input style={{...styles.inp,paddingRight:36,borderColor:confirmPw&&confirmPw!==pw?'var(--red-border)':undefined}} type={showPw?'text':'password'} placeholder="Repeat password" value={confirmPw} onChange={e=>{setConfirmPw(e.target.value);clear()}} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              {confirmPw && <span style={{position:'absolute',right:11,top:'50%',transform:'translateY(-50%)',color:confirmPw===pw?'var(--green-text)':'var(--red-text)',fontSize:13}}>{confirmPw===pw?'âœ“':'âœ—'}</span>}
            </div>
          </div>
        )}

        <button style={{...styles.submitBtn,opacity:(loading||!email||(tab!=='reset'&&!pw)||(tab==='signup'&&!confirmPw))?0.5:1,cursor:(loading||!email)?'not-allowed':'pointer'}}
          onClick={submit} disabled={loading||!email||(tab!=='reset'&&!pw)||(tab==='signup'&&!confirmPw)}>
          {loading?`${tab==='signin'?'Signing in':tab==='signup'?'Creating account':'Sending'}â€¦`:tab==='signin'?'Sign in â†’':tab==='signup'?'Create free account â†’':'Send reset link â†’'}
        </button>

        {tab!=='reset' && (
          <>
            <div style={{display:'flex',alignItems:'center',gap:9,margin:'14px 0',color:'var(--text3)',fontSize:11,fontFamily:'var(--mono)'}}>
              <div style={{flex:1,height:1,background:'var(--border)'}}/> or <div style={{flex:1,height:1,background:'var(--border)'}}/>
            </div>
            <button style={styles.oauthBtn} onClick={async()=>{await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${window.location.origin}/auth/callback`}})}}>
              <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </>
        )}

        {tab==='signup' && <div style={{fontSize:10.5,color:'var(--text3)',textAlign:'center' as const,marginTop:14,lineHeight:1.5}}>By signing up you agree to our <span style={{color:'var(--amber)',cursor:'pointer'}}>Terms</span> and <span style={{color:'var(--amber)',cursor:'pointer'}}>Privacy Policy</span>.<br/>MRF Studios Â· contact@mrfstudios.com</div>}
        {tab==='reset' && <div style={{fontSize:11,color:'var(--text3)',textAlign:'center' as const,marginTop:12}}><span style={{color:'var(--amber)',cursor:'pointer'}} onClick={()=>{setTab('signin');clear()}}>â† Back to Sign In</span></div>}
      </div>
      <div style={{position:'absolute',bottom:18,fontSize:9,fontFamily:'var(--mono)',color:'var(--text3)',zIndex:1,letterSpacing:'0.08em'}}>LEARNPATH Â· MRF STUDIOS Â· learnpathnow.com</div>
    </div>
  )
}

// â”€â”€ Inline styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const styles = {
  page: {
    minHeight: '100vh', display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center', justifyContent: 'center', padding: 24,
    position: 'relative' as const, overflow: 'hidden', background: 'var(--bg)',
  },
  bgGrid: {
    position: 'absolute' as const, inset: 0,
    backgroundImage: 'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',
    backgroundSize: '40px 40px', opacity: 0.25, pointerEvents: 'none' as const,
  },
  bgGlow: {
    position: 'absolute' as const, top: -80, left: '50%', transform: 'translateX(-50%)',
    width: 500, height: 260,
    background: 'radial-gradient(ellipse,rgba(212,133,58,0.08) 0%,transparent 70%)',
    pointerEvents: 'none' as const,
  },
  card: {
    background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18,
    padding: '34px 38px', width: '100%', maxWidth: 400, position: 'relative' as const, zIndex: 1,
  },
  cardTitle: { fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--text)', marginBottom: 3, textAlign: 'center' as const },
  cardSub:   { fontSize: 12.5, color: 'var(--text2)', textAlign: 'center' as const, marginBottom: 20, lineHeight: 1.55 },
  inp: {
    width: '100%', padding: '10px 13px', background: 'var(--bg3)',
    border: '1px solid var(--border2)', borderRadius: 8, color: 'var(--text)',
    fontFamily: 'var(--sans)', fontSize: 13.5, outline: 'none',
  },
  submitBtn: {
    width: '100%', padding: 12, borderRadius: 8, background: 'var(--amber)',
    border: 'none', color: '#0a0b0f', fontFamily: 'var(--sans)',
    fontSize: 13.5, fontWeight: 500, cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 4,
    transition: 'all 0.13s',
  },
  backBtn: {
    flex: 1, padding: 11, borderRadius: 8, border: '1px solid var(--border2)',
    background: 'var(--bg3)', color: 'var(--text2)', fontFamily: 'var(--sans)',
    fontSize: 13, cursor: 'pointer',
  },
  oauthBtn: {
    width: '100%', padding: '10px 13px', borderRadius: 8,
    border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)',
    fontFamily: 'var(--sans)', fontSize: 12.5, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
  },
}


