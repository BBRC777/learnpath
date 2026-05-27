'use client'
import { useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getProfile, getLevelInfo, xpProgress, xpToNextLevel, loadFlashcardsDueCount, loadCurricula, buyStreakFreeze, type Profile } from '@/lib/db'

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
  { href:'/app/team',        label:'Team',              icon:'\ud83c\udfe2' },
  { href:'/app/flashcards',  label:'Flashcards',        icon:'⧉', badge:'__DUE__' },
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
  const [isMobile, setIsMobile]           = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setSidebarOpen(false)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const [flashcardsDue, setFlashcardsDue] = useState<number>(0)
  const [buyingFreeze, setBuyingFreeze]   = useState(false)
  const [theme, setTheme]                 = useState<'dark'|'light'>('dark')
  const [searchQuery, setSearchQuery]     = useState('')
  const [searchOpen, setSearchOpen]       = useState(false)
  const [curricula, setCurricula]         = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('lp-theme') as 'dark'|'light'|null
    if (saved) setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved || 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('lp-theme', theme)
  }, [theme])

  const refreshProfile = useCallback(async () => {
    const p = await getProfile()
    if (p) setProfile(p as Profile)
  }, [])

  useEffect(() => {
    refreshProfile()
    createClient().auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        loadFlashcardsDueCount(data.user.id).then(setFlashcardsDue).catch(() => {})
        loadCurricula(data.user.id).then(setCurricula).catch(() => {})
      }
    })
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

  const handleBuyFreeze = async () => {
    if (!user) return
    setBuyingFreeze(true)
    const r = await buyStreakFreeze(user.id)
    if (r.success) refreshProfile()
    setBuyingFreeze(false)
  }

  const sidebarW = sidebarOpen ? 252 : 0
  const locked   = (item: typeof NAV[0]) => item.pro && !profile?.is_pro
  const freezes  = (profile as any)?.streak_freezes ?? 0
  const canBuy   = freezes < 3 && (profile?.xp ?? 0) >= 50

  const btnPrimary: React.CSSProperties   = { padding:'8px 14px', borderRadius:7, border:'none', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:12, fontWeight:500, cursor:'pointer' }
  const btnSecondary: React.CSSProperties = { padding:'8px 14px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:12, cursor:'pointer' }

  const isLessonPage = pathname?.startsWith('/app/lesson')
  const isTeamPage   = pathname?.startsWith('/app/team')

  useEffect(() => {
    if (isTeamPage) {
      document.documentElement.setAttribute('data-theme', 'business')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [isTeamPage, theme])

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)', color:'var(--text)' }}>

      {/* SIDEBAR */}
      <aside style={{ position:'fixed', left:0, top:0, width:sidebarW, height:'100vh', background:'var(--bg2)', borderRight:sidebarOpen?'1px solid var(--border)':'none', display:'flex', flexDirection:'column', overflowY:sidebarOpen?'auto':'hidden', overflowX:'hidden', zIndex:isMobile?200:50, transition:'width 0.2s ease', boxShadow:isMobile&&sidebarOpen?'4px 0 20px rgba(0,0,0,0.5)':undefined }}>
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
              const badgeVal = item.badge === '__DUE__' ? (flashcardsDue > 0 ? String(flashcardsDue) : null) : item.badge
              return (
                <div key={item.href} onClick={() => !isLocked && router.push(item.href)}
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, marginBottom:2, cursor:isLocked?'default':'pointer', background:active?'var(--amber-bg)':'transparent', color:active?'var(--amber)':isLocked?'var(--text3)':'var(--text2)', fontSize:13, transition:'all 0.12s', whiteSpace:'nowrap' }}
                  title={isLocked?'Upgrade to Pro to unlock Study Mode':undefined}>
                  <span style={{ fontSize:13, width:16, textAlign:'center', flexShrink:0 }}>{item.icon}</span>
                  <span style={{ flex:1 }}>{item.label}</span>
                  {badgeVal && <span style={{ fontFamily:'var(--mono)', fontSize:10, padding:'1px 6px', borderRadius:8, background:'var(--bg4)', color:'var(--text3)', border:'1px solid var(--border2)' }}>{badgeVal}</span>}
                  {item.pro && <span style={{ fontFamily:'var(--mono)', fontSize:9, padding:'1px 6px', borderRadius:4, background:profile?.is_pro?'var(--amber-bg)':'var(--bg4)', color:profile?.is_pro?'var(--amber)':'var(--text3)', border:`1px solid ${profile?.is_pro?'rgba(212,133,58,0.4)':'var(--border2)'}` }}>PRO</span>}
                </div>
              )
            })}
          </nav>

          {/* Streak */}
          <div style={{ margin:'8px 8px 0', padding:'10px 12px', background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.25)', borderRadius:10, flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:2 }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:22, fontWeight:500, color:'var(--amber)', lineHeight:1 }}>{profile?.streak ?? 0}</div>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--blue-text)' }}>🧊 {freezes}/3</div>
            </div>
            <div style={{ fontSize:11, color:'var(--text2)', marginTop:2, whiteSpace:'nowrap' }}>Day streak 🔥</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:4 }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', whiteSpace:'nowrap' }}>Keep the chain alive!</div>
              <button
                disabled={buyingFreeze || !canBuy}
                onClick={handleBuyFreeze}
                title={freezes >= 3 ? 'Max freezes reached' : (profile?.xp ?? 0) < 50 ? 'Need 50 XP' : 'Buy freeze for 50 XP'}
                style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 6px', borderRadius:4, border:'1px solid var(--blue-border)', background:'var(--blue-bg)', color:canBuy?'var(--blue-text)':'var(--text3)', cursor:canBuy?'pointer':'default', whiteSpace:'nowrap' as const }}>
                {buyingFreeze ? '...' : '+🧊 50 XP'}
              </button>
            </div>
          </div>

          {/* XP Widget */}
          <div style={{ margin:'8px 8px 0', flexShrink:0 }}>
            {profile ? <XPWidget profile={profile} /> : <div style={{ height:80, background:'var(--bg3)', borderRadius:10 }}/>}
          </div>

          {/* User footer */}
          <div style={{ padding:'10px 8px 12px', borderTop:'1px solid var(--border)', marginTop:8, flexShrink:0 }}>
            <div onClick={() => { setShowSettings(true); setEditName(profile?.display_name||'') }}
              style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, cursor:'pointer', background:'var(--bg3)', border:'1px solid var(--border)', transition:'background 0.15s' }}>
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
      {/* Mobile overlay backdrop */}
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:199 }} />
      )}

      {/* MAIN */}
      <main style={{ marginLeft:sidebarW, flex:1, display:'flex', flexDirection:'column', minHeight:'100vh', transition:'margin-left 0.2s ease' }}>

        {/* Topbar */}
        <div style={{ borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'var(--status-bar-height, env(safe-area-inset-top, 0px))', paddingLeft:'12px', paddingRight:'16px', paddingBottom:0, background:'var(--bg2)', flexShrink:0, position:'sticky', top:0, zIndex:40 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
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
          <div style={{ display:'flex', gap:8, alignItems:'center', flex:1 }}>
            {isLessonPage && lessonToolbar ? lessonToolbar : (
              <>
                {pathname === '/app' && <button onClick={() => router.push('/app/curriculum')} style={btnPrimary}>+ New Path</button>}
                {!pathname?.includes('/app') && <button onClick={signOut} style={btnSecondary}>Sign out</button>}
                {!showSettings && pathname==='/app/paths' && <button onClick={()=>router.push('/app/curriculum')} style={btnPrimary}>+ New Path</button>}
              </>
            )}
          </div>
          <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} style={{ width:30, height:30, borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          {/* Search */}
          <div style={{ position:'relative', width:220, margin:'0 8px' }}>
            <input
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true) }}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              placeholder='Search paths...'
              style={{ width:'100%', padding:'6px 12px 6px 30px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:12, outline:'none', boxSizing:'border-box' as const, colorScheme:'light dark' }}
            />
            <span style={{ position:'absolute' as const, left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text3)', fontSize:12, pointerEvents:'none' as const }}>⌕</span>
            {searchOpen && searchQuery.trim().length > 0 && (() => {
              const results = curricula.filter((cr: any) => (cr.curriculum?.title || cr.topic || '').toLowerCase().includes(searchQuery.toLowerCase()) || (cr.topic||'').toLowerCase().includes(searchQuery.toLowerCase()))
              if (results.length === 0) return (
                <div style={{ position:'absolute' as const, top:'calc(100% + 4px)', left:0, right:0, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', fontSize:12, color:'var(--text3)', zIndex:200 }}>No paths found</div>
              )
              return (
                <div style={{ position:'absolute' as const, top:'calc(100% + 4px)', left:0, right:0, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden', zIndex:200 }}>
                  {results.slice(0,6).map((r: any) => {
                    const weeks = r.curriculum?.weeks || []
                    const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
                    const done = Object.values(r.progress||{}).filter(Boolean).length
                    const pct = total ? Math.round((done/total)*100) : 0
                    return (
                      <div key={r.id} onMouseDown={() => { router.push(`/app/lesson?id=`+r.id); setSearchQuery(''); setSearchOpen(false) }}
                        style={{ padding:'10px 14px', cursor:'pointer', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}
                        onMouseEnter={e => (e.currentTarget.style.background='var(--bg3)')}
                        onMouseLeave={e => (e.currentTarget.style.background='transparent')}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', marginBottom:1 }}>{r.curriculum?.title || r.topic}</div>
                          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{r.topic} · {r.level}</div>
                        </div>
                        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--amber)', flexShrink:0 }}>{pct}%</div>
                      </div>
                    )
                  })}
                </div>
              )
            })()} 
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
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:16 }}>
              {[
                {label:'Streak',   v: profile?.streak ?? 0},
                {label:'XP',       v: profile?.xp ?? 0},
                {label:'Level',    v: getLevelInfo(profile?.xp ?? 0).title},
                {label:'Plan',     v: profile?.is_pro ? 'Pro' : 'Free'},
                {label:'Freezes',  v: `🧊 ${freezes}/3`},
              ].map((s,i) => (
                <div key={i} style={{ background:'var(--bg3)', borderRadius:8, padding:'10px 12px' }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</div>
                  <div style={{ fontSize:14, fontWeight:500, color:'var(--text)', marginTop:2 }}>{s.v}</div>
                </div>
              ))}
            </div>
            {/* Freeze buy in settings */}
            <div style={{ background:'rgba(58,106,191,0.08)', border:'1px solid var(--blue-border)', borderRadius:8, padding:'10px 14px', marginBottom:14, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:12, fontWeight:500, color:'var(--blue-text)' }}>🧊 Streak Freeze</div>
                <div style={{ fontSize:11, color:'var(--text2)' }}>{freezes >= 3 ? 'Maximum freezes held' : 'Protects your streak if you miss a day'}</div>
              </div>
              <button
                disabled={buyingFreeze || !canBuy}
                onClick={handleBuyFreeze}
                style={{ padding:'6px 12px', borderRadius:6, border:'1px solid var(--blue-border)', background:canBuy?'var(--blue-bg)':'var(--bg4)', color:canBuy?'var(--blue-text)':'var(--text3)', fontFamily:'var(--sans)', fontSize:11, cursor:canBuy?'pointer':'default', whiteSpace:'nowrap' as const }}>
                {buyingFreeze ? 'Buying...' : freezes >= 3 ? 'Full' : '50 XP'}
              </button>
            </div>
            {!profile?.is_pro && (
              <div style={{ background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.3)', borderRadius:8, padding:'12px 14px', marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:500, color:'var(--amber)', marginBottom:2 }}>Upgrade to Pro</div>
                <div style={{ fontSize:11, color:'var(--text2)', marginBottom:10 }}>Unlimited paths · Study Mode · AI Tutor</div>
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={()=>window.open('https://pay.rev.cat/sffmwnoklfherqwk/'+(user?.id||''), '_blank')} style={{ padding:'8px 10px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer', flex:1, textAlign:'center' as const }}>
                    <div style={{ fontSize:10, color:'var(--text3)', fontFamily:'var(--mono)', marginBottom:2 }}>Monthly</div>
                    <div style={{ fontWeight:600, color:'var(--text)' }}>$9.99/mo</div>
                  </button>
                  <button onClick={()=>window.open('https://pay.rev.cat/sffmwnoklfherqwk/'+(user?.id||''), '_blank')} style={{ padding:'8px 10px', borderRadius:7, border:'1px solid rgba(212,133,58,0.6)', background:'rgba(212,133,58,0.15)', color:'var(--amber)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer', flex:1, textAlign:'center' as const, position:'relative' as const }}>
                    <div style={{ position:'absolute' as const, top:-8, right:6, background:'#6abf8a', color:'#0a0b0f', fontSize:8, fontFamily:'var(--mono)', fontWeight:700, padding:'2px 5px', borderRadius:4 }}>SAVE 33%</div>
                    <div style={{ fontSize:10, color:'rgba(212,133,58,0.7)', fontFamily:'var(--mono)', marginBottom:2 }}>Annual</div>
                    <div style={{ fontWeight:600 }}>$6.67/mo</div>
                  </button>
                </div>
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
