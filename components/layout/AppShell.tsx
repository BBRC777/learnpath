'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { loadStreak } from '@/lib/db'
import type { User } from '@supabase/supabase-js'

const NAV = [
  { id:'home',       label:'Home',              path:'/app' },
  { id:'lesson',     label:'Current Lesson',    path:'/app/lesson' },
  { id:'curriculum', label:'New Learning Path', path:'/app/curriculum' },
  { id:'paths',      label:'All Learning Paths',path:'/app/paths' },
  { id:'flashcards', label:'Flashcards',         path:'/app/flashcards', badge:'9',   badgeCls:'red' },
  { id:'study',      label:'Study Mode',         path:'/app/study',      badge:'PRO', badgeCls:'pro', proOnly:true },
  { id:'progress',   label:'Progress',           path:'/app/progress' },
]

const SCREEN_META: Record<string,{ title:string; pill?:string }> = {
  '/app':            { title:'Home' },
  '/app/lesson':     { title:'Current Lesson' },
  '/app/curriculum': { title:'New Learning Path',  pill:'Step 1 of 4' },
  '/app/paths':      { title:'All Learning Paths' },
  '/app/flashcards': { title:'Flashcards',         pill:'9 due today' },
  '/app/study':      { title:'Study Mode',         pill:'Pro Feature' },
  '/app/progress':   { title:'Progress' },
}

function getInitials(profile: any) {
  if (profile?.display_name) return profile.display_name[0].toUpperCase()
  if (profile?.email) return profile.email[0].toUpperCase()
  return 'L'
}

function getDisplayName(profile: any) {
  if (profile?.display_name) return profile.display_name.split(' ')[0]
  if (profile?.email) return profile.email.split('@')[0]
  return 'Learner'
}

interface AppShellProps {
  user: User
  profile: any
  children: React.ReactNode
}

export default function AppShell({ user, profile, children }: AppShellProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [streak, setStreak] = useState(profile?.streak ?? 0)
  const [showWelcome, setShowWelcome] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const isPro = profile?.is_pro ?? false
  const initials = getInitials(profile)
  const name = getDisplayName(profile)
  const meta = SCREEN_META[pathname] || SCREEN_META['/app']

  useEffect(() => {
    loadStreak(user.id).then(s => setStreak(s.current_streak || 0)).catch(()=>{})
    // Fix #4 — show welcome popup on first load after login
    const shown = sessionStorage.getItem('lp_welcome_shown')
    if (!shown) {
      setTimeout(() => setShowWelcome(true), 800)
      sessionStorage.setItem('lp_welcome_shown', '1')
    }
  }, [user.id])

  const signOut = async () => {
    sessionStorage.removeItem('lp_welcome_shown')
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  const s: Record<string,React.CSSProperties> = {
    shell:   { display:'flex', height:'100vh', overflow:'hidden' },
    sidebar: { width:236, flexShrink:0, background:'var(--bg2)', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' },
    logo:    { padding:'17px 15px 13px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:9 },
    logoBox: { width:28, height:28, borderRadius:7, background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'var(--amber)', flexShrink:0, fontFamily:'var(--mono)' },
    sidebarMid:    { flex:1, overflowY:'auto' as const, paddingBottom:8 },
    navSec:        { padding:'13px 10px 3px', fontSize:8, fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.14em', textTransform:'uppercase' as const },
    sidebarFooter: { padding:10, borderTop:'1px solid var(--border)', flexShrink:0 },
    userRow: { display:'flex', alignItems:'center', gap:8, padding:'8px 9px', borderRadius:8, background:'var(--bg3)', border:'1px solid var(--border)', cursor:'pointer' },
    avatar:  { width:28, height:28, borderRadius:'50%', background:'var(--amber-bg2)', border:'1px solid rgba(212,133,58,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--serif)', fontSize:12, color:'var(--amber)', flexShrink:0 },
    main:    { flex:1, display:'flex', flexDirection:'column' as const, overflow:'hidden' },
    topbar:  { height:50, background:'var(--bg2)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px', flexShrink:0 },
    content: { flex:1, overflowY:'auto' as const },
  }

  return (
    <div style={s.shell}>

      {/* Fix #4 — Welcome back popup */}
      {showWelcome && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:24 }}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 32px', maxWidth:400, width:'100%', textAlign:'center' as const }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:6 }}>Welcome back, {name}</div>
            <div style={{ fontSize:13, color:'var(--text2)', marginBottom:22, lineHeight:1.6 }}>Where would you like to go?</div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:9 }}>
              <button onClick={() => { setShowWelcome(false); router.push('/app/lesson') }}
                style={{ width:'100%', padding:'12px', borderRadius:9, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13.5, fontWeight:500, cursor:'pointer' }}>
                Continue where I left off
              </button>
              <button onClick={() => { setShowWelcome(false); router.push('/app') }}
                style={{ width:'100%', padding:'12px', borderRadius:9, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13.5, cursor:'pointer' }}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div style={s.sidebar}>
        <div style={s.logo}>
          <div style={s.logoBox}>LP</div>
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:17, color:'var(--amber)' }}>Learnpath</div>
            <div style={{ fontSize:8, fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.1em', marginTop:1 }}>Learn Anything · All Inside</div>
          </div>
        </div>

        <div style={s.sidebarMid}>
          <div style={s.navSec}>Navigate</div>
          {NAV.map(n => {
            const locked = (n as any).proOnly && !isPro
            const isActive = pathname === n.path
            return (
              <div key={n.id}
                onClick={() => { if (!locked) { setShowSettings(false); router.push(n.path) } }}
                title={locked ? 'Upgrade to Pro to unlock Study Mode' : undefined}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', margin:'1px 4px', borderRadius:7, cursor:locked?'default':'pointer', fontSize:12.5, color:isActive?'var(--amber2)':'var(--text2)', background:isActive?'var(--amber-bg2)':'transparent', border:`1px solid ${isActive?'rgba(212,133,58,0.2)':'transparent'}`, opacity:locked?0.45:1, transition:'all 0.13s', userSelect:'none' as const }}>
                <span style={{ flex:1 }}>{n.label}</span>
                {(n as any).badge && (
                  <span style={{ fontSize:8.5, fontFamily:'var(--mono)', padding:'1px 5px', borderRadius:3, background:(n as any).badgeCls==='red'?'var(--red-bg)':'var(--amber-bg)', border:`1px solid ${(n as any).badgeCls==='red'?'var(--red-border)':'var(--amber-bg2)'}`, color:(n as any).badgeCls==='red'?'var(--red-text)':'var(--amber2)' }}>{(n as any).badge}</span>
                )}
              </div>
            )
          })}

          <div style={{ background:'var(--amber-bg)', border:'1px solid var(--amber-bg2)', borderRadius:8, padding:'9px 11px', margin:'12px 8px 0' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:22, color:'var(--amber)', fontWeight:500, lineHeight:1 }}>{streak}</div>
              <div>
                <div style={{ fontSize:12, fontWeight:500, color:'var(--text2)' }}>Day streak</div>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:1 }}>{streak > 0 ? 'Keep the chain alive!' : 'Start your streak today!'}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={s.sidebarFooter}>
          <div style={s.userRow} onClick={() => setShowSettings(v => !v)}>
            <div style={s.avatar}>{initials}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{name}</div>
              <div style={{ fontSize:8.5, fontFamily:'var(--mono)', color:isPro?'var(--amber)':'var(--text3)' }}>{isPro?'Pro':'Free · 1/1 paths'}</div>
            </div>
            <div style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--mono)' }}>Settings</div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={s.main}>
        <div style={s.topbar}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:15, color:'var(--text)' }}>{showSettings ? 'Settings' : meta.title}</div>
            {!showSettings && meta.pill && <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--text3)', background:'var(--bg4)', border:'1px solid var(--border2)', borderRadius:4, padding:'2px 6px' }}>{meta.pill}</div>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            {!showSettings && pathname==='/app' && <button onClick={()=>router.push('/app/curriculum')} style={btnPrimary}>+ New Path</button>}
            {!showSettings && pathname==='/app/lesson' && <button style={btnPrimary}>Mark Complete</button>}
            {!showSettings && pathname==='/app/flashcards' && <button style={btnPrimary}>Review All</button>}
            {!showSettings && pathname==='/app/paths' && <button onClick={()=>router.push('/app/curriculum')} style={btnPrimary}>+ New Path</button>}
            {showSettings && <button onClick={()=>setShowSettings(false)} style={btnSecondary}>Back</button>}
            <button onClick={signOut} style={btnSecondary}>Sign out</button>
          </div>
        </div>

        <div style={s.content}>
          {showSettings ? (
            <SettingsPanel user={user} profile={profile} onSignOut={signOut}/>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}

const btnPrimary: React.CSSProperties = { display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:6, fontSize:12, fontFamily:'var(--sans)', cursor:'pointer', border:'1px solid var(--amber)', background:'var(--amber)', color:'#0a0b0f', fontWeight:500 }
const btnSecondary: React.CSSProperties = { display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:6, fontSize:12, fontFamily:'var(--sans)', cursor:'pointer', border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)' }

function SettingsPanel({ user, profile, onSignOut }: { user: User; profile: any; onSignOut: () => void }) {
  const [displayName, setDisplayName] = useState(profile?.display_name || '')
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const supabase = createClient()

  const save = async () => {
    setSaving(true)
    await (supabase.from('profiles') as any).update({ display_name: displayName.trim(), updated_at: new Date().toISOString() }).eq('id', user.id)
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ maxWidth:560, margin:'0 auto', padding:'24px 26px 60px' }}>
      {[
        { head:'Account', rows:[
          { label:'Display name', sub:'', right:(
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input value={displayName} onChange={e=>setDisplayName(e.target.value)} style={{ padding:'6px 10px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:13, outline:'none' }}/>
              <button onClick={save} disabled={saving||!displayName.trim()} style={btnPrimary}>{saved?'Saved':saving?'...':'Save'}</button>
            </div>
          )},
          { label:'Email', sub:user.email||'', right:<span style={{ fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>Verified</span> },
        ]},
        { head:'Subscription', rows:[
          { label:'Current plan', sub:profile?.is_pro?'Learnpath Pro':'Free — 1 learning path',
            right:<span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 6px', borderRadius:3, background:profile?.is_pro?'var(--amber-bg)':'var(--green-bg)', border:`1px solid ${profile?.is_pro?'var(--amber-bg2)':'var(--green-border)'}`, color:profile?.is_pro?'var(--amber2)':'var(--green-text)' }}>{profile?.is_pro?'PRO':'FREE'}</span>
          },
          ...(!profile?.is_pro?[{ label:'Upgrade to Pro', sub:'Unlimited paths · Study Mode · AI Tutor', right:<button style={btnPrimary}>$9.99/mo</button> }]:[]),
        ]},
        { head:'Stats', rows:[
          { label:'Cards reviewed', sub:'', right:<span style={{ fontFamily:'var(--mono)', fontSize:13, color:'var(--text2)' }}>{(profile?.cards_reviewed??0).toLocaleString()}</span> },
          { label:'Total study days', sub:'', right:<span style={{ fontFamily:'var(--mono)', fontSize:13, color:'var(--text2)' }}>{profile?.total_days??0}</span> },
        ]},
        { head:'Session', rows:[
          { label:'Sign out', sub:"You will need to sign in again", right:<button onClick={onSignOut} style={btnSecondary}>Sign out</button> },
        ]},
      ].map(section => (
        <div key={section.head} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', marginBottom:14 }}>
          <div style={{ padding:'12px 18px', borderBottom:'1px solid var(--border)', fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.1em', background:'var(--bg3)' }}>{section.head}</div>
          {section.rows.map((row,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom:'1px solid var(--border)', gap:16 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{row.label}</div>
                {row.sub && <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{row.sub}</div>}
              </div>
              {row.right}
            </div>
          ))}
        </div>
      ))}
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textAlign:'center' as const, marginTop:20, lineHeight:1.8 }}>
        Learnpath · MRF Studios · contact@mrfstudios.com
      </div>
    </div>
  )
}


