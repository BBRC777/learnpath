'use client'
import { useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getProfile, getLevelInfo, xpProgress, xpToNextLevel, type Profile } from '@/lib/db'

const NEXT_LEVEL: Record<number,string> = { 1:'Scholar', 2:'Expert', 3:'Master' }

function LevelBadge({ xp }: { xp: number }) {
  const info = getLevelInfo(xp)
  const colors: Record<number,{bg:string,color:string,border:string}> = {
    1: { bg:'var(--bg4)',          color:'var(--text3)',    border:'var(--border2)' },
    2: { bg:'var(--amber-bg)',     color:'var(--amber)',    border:'rgba(212,133,58,0.4)' },
    3: { bg:'rgba(124,58,237,0.1)',color:'#a78bfa',        border:'rgba(124,58,237,0.3)' },
    4: { bg:'rgba(217,119,6,0.1)', color:'#fbbf24',        border:'rgba(217,119,6,0.3)' },
  }
  const c = colors[info.level]
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'2px 8px', borderRadius:12, border:`1px solid ${c.border}`, background:c.bg, fontFamily:'var(--mono)', fontSize:10, color:c.color, textTransform:'uppercase', letterSpacing:'0.08em' }}>
      {info.level === 4 ? '★' : `L${info.level}`} {info.title}
    </span>
  )
}

function XPWidget({ profile }: { profile: Profile }) {
  const info      = getLevelInfo(profile.xp ?? 0)
  const progress  = xpProgress(profile.xp ?? 0)
  const remaining = xpToNextLevel(profile.xp ?? 0)
  const isMaster  = info.level === 4
  return (
    <div style={{ background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.25)', borderRadius:10, padding:'10px 12px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Your Level</span>
        <LevelBadge xp={profile.xp ?? 0} />
      </div>
      <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:6 }}>
        <span style={{ fontFamily:'var(--mono)', fontSize:22, fontWeight:500, color:'var(--amber)', lineHeight:1 }}>{(profile.xp ?? 0).toLocaleString()}</span>
        <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--text3)' }}>XP</span>
      </div>
      <div style={{ height:4, background:'var(--bg4)', borderRadius:2, marginBottom:5, overflow:'hidden' }}>
        <div style={{ height:'100%', borderRadius:2, width:`${Math.round(progress*100)}%`, background:isMaster?'linear-gradient(90deg,#d97706,#fbbf24)':'var(--amber)', transition:'width 0.7s' }}/>
      </div>
      <div style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--text3)' }}>
        {isMaster ? '✦ Maximum level reached' : `${remaining} XP to ${NEXT_LEVEL[info.level]}`}
      </div>
    </div>
  )
}

interface AppShellProps { children: React.ReactNode }

const NAV = [
  { href:'/app',             label:'Home',              icon:'⊞' },
  { href:'/app/lesson',      label:'Current Lesson',    icon:'▶' },
  { href:'/app/curriculum',  label:'New Learning Path', icon:'+' },
  { href:'/app/paths',       label:'All Learning Paths',icon:'◈' },
  { href:'/app/leaderboard', label:'Leaderboard',       icon:'🏆' },
  { href:'/app/flashcards',  label:'Flashcards',        icon:'⧉', badge:'9' },
  { href:'/app/study',       label:'Study Mode',        icon:'◎', pro:true },
  { href:'/app/progress',    label:'Progress',          icon:'◉' },
]

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const router   = useRouter()
  const [profile, setProfile]             = useState<Profile|null>(null)
  const [showSettings, setShowSettings]   = useState(false)
  const [user, setUser]                   = useState<any>(null)
  const [editName, setEditName]           = useState('')
  const [savingName, setSavingName]       = useState(false)
  const [lessonToolbar, setLessonToolbar] = useState<React.ReactNode>(null)
  const [sidebarOpen, setSidebarOpen]     = useState(true)

  const refreshProfile = useCallback(async () => {
    const p = await getProfile()
    if (p) setProfile(p)
  }, [])

  useEffect(() => {
    refreshProfile()
    createClient().auth.getUser().then(({ data }) => { if (data.user) setUser(data.user) })
  }, [refreshProfile])

  useEffect(() => {
    ;(window as any).__learnpath_refreshProfile = refreshProfile
    return () => { delete (window as any).__learnpath_refreshProfile }
  }, [refreshProfile])

  useEffect(() => {
    ;(window as any).__learnpath_setToolbar = (node: React.ReactNode) => setLessonToolbar(node)
    return () => { delete (window as any).__learnpath_setToolbar }
  }, [])

  const signOut = async () => {
    await createClient().auth.signOut()
    router.push('/auth')
  }

  const saveName = async () => {
    if (!editName.trim() || !user) return
    setSavingName(true)
    await (createClient().from('profiles') as any).update({ display_name: editName.trim(), updated_at: new Date().toISOString() }).eq('id', user.id)
    await refreshProfile()
    setSavingName(false)
    setShowSettings(false)
  }

  const sidebarW = sidebarOpen ? 252 : 0
  const locked   = (item: typeof NAV[0]) => item.pro && !profile?.is_pro

  const btnPrimary: React.CSSProperties   = { padding:'8px 14px', borderRadius:7, border:'none', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:12, fontWeight:500, cursor:'pointer' }
  const btnSecondary: React.CSSProperties = { padding:'8px 14px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:12, cursor:'pointer' }

  const isLessonPage = pathname?.startsWith('/app/lesson')

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)', color:'var(--text)' }}>

      {/* SIDEBAR */}
      <aside style={{ position:'fixed', left:0, top:0, width:sidebarW, height:'100vh', background:'var(--bg2)', borderRight:sidebarOpen?'1px solid var(--border)':'none', display:'flex', flexDirection:'column', overflowY:sidebarOpen?'auto':'hidden', overflowX:'hidden', zIndex:50, transition:'width 0.2s ease' }}>
        <div style={{ width:252, display:'flex', flexDirection:'column', height:'100%' }}>

          {/* Logo */}
          <div style={{ padding:'20px 18px 15px', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--amber)', letterSpacing:'-0.01em', whiteSpace:'nowrap' }}>◆ Learnpath</div>
            <div style={{ fontFamily:'var(--mono)', fontSize:9, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.12em', marginTop:2, whiteSpace:'nowrap' }}>Learn Anything · All Inside</div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, padding:'8px 8px 0' }}>
            <div style={{ fontFamily:'var(--mono)', fontSize:9, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', padding:'12px 10px 6px', whiteSpace:'nowrap' }}>Navigate</div>
            {NAV.map(item => {
              const active   = pathname === item.href || (item.href !== '/app' && pathname?.startsWith(item.href))
              const isLocked = locked(item)
              return (
                <div key={item.href} onClick={() => !isLocked && router.push(item.href)}
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, marginBottom:2, cursor:isLocked?'default':'pointer', background:active?'var(--amber-bg)':'transparent', color:active?'var(--amber)':isLocked?'var(--text3)':'var(--text2)', fontSize:13, transition:'all 0.12s', whiteSpace:'nowrap' }}
                  title={isLocked?'Upgrade to Pro to unlock Study Mode':undefined}>
                  <span style={{ fontSize:13, width:16, textAlign:'center', flexShrink:0 }}>{item.icon}</span>
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.badge && <span style={{ fontFamily:'var(--mono)', fontSize:10, padding:'1px 6px', borderRadius:8, background:'var(--bg4)', color:'var(--text3)', border:'1px solid var(--border2)' }}>{item.badge}</span>}
                  {item.pro && <span style={{ fontFamily:'var(--mono)', fontSize:9, padding:'1px 6px', borderRadius:4, background:profile?.is_pro?'var(--amber-bg)':'var(--bg4)', color:profile?.is_pro?'var(--amber)':'var(--text3)', border:`1px solid ${profile?.is_pro?'rgba(212,133,58,0.4)':'var(--border2)'}` }}>PRO</span>}
                </div>
              )
            })}
          </nav>

          {/* Streak */}
          <div style={{ margin:'8px 8px 0', padding:'10px 12px', background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.25)', borderRadius:10, flexShrink:0 }}>
            <div style={{ fontFamily:'var(--mono)', fontSize:22, fontWeight:500, color:'var(--amber)', lineHeight:1 }}>{profile?.streak ?? 0}</div>
            <div style={{ fontSize:11, color:'var(--text2)', marginTop:2, whiteSpace:'nowrap' }}>Day streak 🔥</div>
            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:1, whiteSpace:'nowrap' }}>Keep the chain alive!</div>
          </div>

          {/* XP Widget */}
          <div style={{ margin:'8px 8px 0', flexShrink:0 }}>
            {profile ? <XPWidget profile={profile} /> : <div style={{ height:80, background:'var(--bg3)', borderRadius:10 }}/>}
          </div>

          {/* User footer */}
          <div style={{ padding:'10px 8px 12px', borderTop:'1px solid var(--border)', marginTop:8, flexShrink:0 }}>
            <div onClick={() => { setShowSettings(true); setEditName(profile?.display_name||'') }}
              style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, cursor:'pointer', background:'var(--bg3)' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--serif)', fontSize:13, color:'var(--amber)', flexShrink:0 }}>
                {(profile?.display_name||'?')[0].toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{profile?.display_name||'...'}</div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:1, whiteSpace:'nowrap' }}>{profile?.is_pro?'Pro':'Free'} · {profile?.streak??0}/1 paths</div>
              </div>
              <span style={{ fontSize:11, color:'var(--text3)', whiteSpace:'nowrap' }}>Settings</span>
            </div>
          </div>

        </div>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft:sidebarW, flex:1, display:'flex', flexDirection:'column', minHeight:'100vh', transition:'margin-left 0.2s ease' }}>

        {/* Topbar */}
        <div style={{ height:52, borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px 0 12px', background:'var(--bg2)', flexShrink:0, position:'sticky', top:0, zIndex:40 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            {/* Hamburger button */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              style={{ width:32, height:32, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:5, background:'none', border:'none', cursor:'pointer', padding:4, borderRadius:6, flexShrink:0 }}
              title={sidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}>
              <div style={{ width:18, height:2, background:'var(--text3)', borderRadius:1 }}/>
              <div style={{ width:18, height:2, background:'var(--text3)', borderRadius:1 }}/>
              <div style={{ width:18, height:2, background:'var(--text3)', borderRadius:1 }}/>
            </button>
            <div style={{ fontFamily:'var(--sans)', fontSize:15, fontWeight:500, color:'var(--text)', marginRight:8, whiteSpace:'nowrap' }}>
              {NAV.find(n => n.href === pathname || (n.href !== '/app' && pathname?.startsWith(n.href)))?.label || 'Learnpath'}
            </div>
          </div>
          <div style={{ display:'flex', gap:8, flex:1, justifyContent:'flex-end', alignItems:'center' }}>
            {isLessonPage && lessonToolbar ? lessonToolbar : (
              <>
                {pathname === '/app' && <button onClick={() => router.push('/app/curriculum')} style={btnPrimary}>+ New Path</button>}
                {!pathname?.includes('/app') && <button onClick={signOut} style={btnSecondary}>Sign out</button>}
                {!showSettings && pathname==='/app/paths' && <button onClick={()=>router.push('/app/curriculum')} style={btnPrimary}>+ New Path</button>}
              </>
            )}
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex:1, overflow:'hidden' }}>
          {children}
        </div>
      </main>

      {/* SETTINGS OVERLAY */}
      {showSettings && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={() => setShowSettings(false)}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 28px 24px', width:380, maxWidth:'90vw' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:20 }}>Settings</div>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Display Name</label>
              <input value={editName} onChange={e => setEditName(e.target.value)} style={{ width:'100%', padding:'9px 12px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text)', fontFamily:'var(--sans)', fontSize:14, outline:'none', boxSizing:'border-box' as const }}/>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
              {[{label:'Streak',v:profile?.streak??0},{label:'XP',v:profile?.xp??0},{label:'Level',v:getLevelInfo(profile?.xp??0).title},{label:'Plan',v:profile?.is_pro?'Pro':'Free'}].map((s,i) => (
                <div key={i} style={{ background:'var(--bg3)', borderRadius:8, padding:'10px 12px' }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</div>
                  <div style={{ fontSize:14, fontWeight:500, color:'var(--text)', marginTop:2 }}>{s.v}</div>
                </div>
              ))}
            </div>
            {!profile?.is_pro && (
              <div style={{ background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.3)', borderRadius:8, padding:'10px 14px', marginBottom:14, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:500, color:'var(--amber)' }}>Upgrade to Pro</div>
                  <div style={{ fontSize:11, color:'var(--text2)' }}>Unlimited paths · Study Mode · AI Tutor</div>
                </div>
                <button onClick={()=>window.open('https://pay.rev.cat/sandbox/skelxidydieztrqy/'+(user?.id||''),'_blank')} style={btnPrimary}>$9.99/mo</button>
              </div>
            )}
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={saveName} disabled={savingName} style={{ ...btnPrimary, flex:1, textAlign:'center' as const }}>{savingName?'Saving...':'Save'}</button>
              <button onClick={signOut} style={{ ...btnSecondary, flex:1, textAlign:'center' as const }}>Sign out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
