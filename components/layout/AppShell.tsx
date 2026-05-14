'use client'
// components/layout/AppShell.tsx
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/database'

const NAV = [
  { id:'home',       icon:'🏠', label:'Home' },
  { id:'lesson',     icon:'📖', label:'Current Lesson' },
  { id:'curriculum', icon:'➕', label:'New Learning Path' },
  { id:'flashcards', icon:'🃏', label:'Flashcards',   badge:'9',   badgeCls:'red' },
  { id:'study',      icon:'🎯', label:'Study Mode',   badge:'PRO', badgeCls:'pro', proOnly:true },
  { id:'progress',   icon:'📊', label:'Progress' },
]

interface AppShellProps {
  user: User
  profile: Profile
  children: React.ReactNode
}

function getInitials(profile: Profile): string {
  if (profile.display_name) return profile.display_name[0].toUpperCase()
  if (profile.email) return profile.email[0].toUpperCase()
  return 'L'
}

function getDisplayName(profile: Profile): string {
  if (profile.display_name) return profile.display_name.split(' ')[0]
  if (profile.email) return profile.email.split('@')[0]
  return 'Learner'
}

function getGreeting(): string {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

const SCREEN_META: Record<string, { title: string; pill?: string }> = {
  home:       { title: 'Home' },
  lesson:     { title: 'Current Lesson',   pill: 'Week 1 · Lesson 3' },
  curriculum: { title: 'New Learning Path', pill: 'Step 1 of 4' },
  flashcards: { title: 'Flashcards',        pill: '9 due today' },
  study:      { title: 'Study Mode',        pill: 'Pro Feature' },
  progress:   { title: 'Progress' },
  settings:   { title: 'Settings' },
}

export default function AppShell({ user, profile, children }: AppShellProps) {
  const [active, setActive] = useState('home')
  const supabase = createClient()
  const router   = useRouter()
  const isPro    = profile.is_pro ?? false
  const initials = getInitials(profile)
  const name     = getDisplayName(profile)
  const meta     = SCREEN_META[active] || SCREEN_META.home

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden'}}>
      {/* ── SIDEBAR ── */}
      <div style={{width:236,flexShrink:0,background:'var(--bg2)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',height:'100%',overflow:'hidden'}}>
        {/* Logo */}
        <div style={{padding:'17px 15px 13px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:9}}>
          <div style={{width:28,height:28,borderRadius:7,background:'var(--amber-bg2)',border:'1px solid rgba(212,133,58,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>📚</div>
          <div>
            <div style={{fontFamily:'var(--serif)',fontSize:17,color:'var(--amber)'}}>Learnpath</div>
            <div style={{fontSize:8,fontFamily:'var(--mono)',color:'var(--text3)',letterSpacing:'0.1em',marginTop:1}}>Learn Anything · All Inside</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{flex:1,overflowY:'auto' as const,paddingBottom:8}}>
          <div style={{padding:'13px 10px 3px',fontSize:8,fontFamily:'var(--mono)',color:'var(--text3)',letterSpacing:'0.14em',textTransform:'uppercase' as const}}>Navigate</div>
          {NAV.map(n => {
            const locked = n.proOnly && !isPro
            const isActive = active === n.id
            return (
              <div key={n.id}
                onClick={() => { if (locked) return; setActive(n.id) }}
                title={locked ? 'Upgrade to Pro to unlock Study Mode' : undefined}
                style={{
                  display:'flex',alignItems:'center',gap:8,padding:'7px 10px',
                  margin:'1px 4px',borderRadius:7,cursor:locked?'default':'pointer',
                  fontSize:12,color:isActive?'var(--amber2)':'var(--text2)',
                  background:isActive?'var(--amber-bg2)':'transparent',
                  border:`1px solid ${isActive?'rgba(212,133,58,0.2)':'transparent'}`,
                  opacity:locked?0.45:1,transition:'all 0.13s',userSelect:'none' as const,
                }}>
                <span style={{fontSize:13,width:16,textAlign:'center' as const,flexShrink:0}}>{n.icon}</span>
                <span style={{flex:1}}>{n.label}</span>
                {n.badge && (
                  <span style={{fontSize:8.5,fontFamily:'var(--mono)',padding:'1px 5px',borderRadius:3,
                    background:n.badgeCls==='red'?'var(--red-bg)':'var(--amber-bg)',
                    border:`1px solid ${n.badgeCls==='red'?'var(--red-border)':'var(--amber-bg2)'}`,
                    color:n.badgeCls==='red'?'var(--red-text)':'var(--amber2)'}}>
                    {n.badge}
                  </span>
                )}
              </div>
            )
          })}

          {/* Streak */}
          <div style={{background:'var(--amber-bg)',border:'1px solid var(--amber-bg2)',borderRadius:8,padding:'9px 11px',margin:'12px 8px 0'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{fontFamily:'var(--mono)',fontSize:22,color:'var(--amber)',fontWeight:500,lineHeight:1}}>{profile.streak ?? 0}🔥</div>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:'var(--text2)'}}>Day streak</div>
                <div style={{fontSize:9,fontFamily:'var(--mono)',color:'var(--text3)',marginTop:1}}>Keep the chain alive!</div>
              </div>
            </div>
          </div>
        </div>

        {/* User footer */}
        <div style={{padding:10,borderTop:'1px solid var(--border)',flexShrink:0}}>
          <div onClick={() => setActive('settings')}
            style={{display:'flex',alignItems:'center',gap:8,padding:'8px 9px',borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',transition:'all 0.13s'}}>
            <div style={{width:28,height:28,borderRadius:'50%',background:'var(--amber-bg2)',border:'1px solid rgba(212,133,58,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--serif)',fontSize:12,color:'var(--amber)',flexShrink:0}}>
              {initials}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:500,color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' as const}}>{name}</div>
              <div style={{fontSize:8.5,fontFamily:'var(--mono)',color:isPro?'var(--amber)':'var(--text3)'}}>{isPro?'✨ Pro':'Free · 1/1 paths'}</div>
            </div>
            <div style={{fontSize:13,color:'var(--text3)'}}>⚙</div>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        {/* Topbar */}
        <div style={{height:50,background:'var(--bg2)',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{fontFamily:'var(--serif)',fontSize:15,color:'var(--text)'}}>{meta.title}</div>
            {meta.pill && <div style={{fontSize:9.5,fontFamily:'var(--mono)',color:'var(--text3)',background:'var(--bg4)',border:'1px solid var(--border2)',borderRadius:4,padding:'2px 6px'}}>{meta.pill}</div>}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:7}}>
            {active==='home' && <button onClick={()=>setActive('curriculum')} style={btnPrimary}>+ New Path</button>}
            {active==='lesson' && <button style={btnPrimary}>Mark Complete →</button>}
            {active==='settings' && <button onClick={signOut} style={btnDanger}>Sign out</button>}
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:'auto' as const}}>
          {/* 
            In the full Next.js app, each screen is a separate page under /app/[screen].
            For this shell demo, we render children (the page content) here.
            Navigation items map to: /app, /app/lesson, /app/curriculum, etc.
          */}
          {children}

          {/* Settings overlay (client-side only nav) */}
          {active === 'settings' && (
            <SettingsPanel user={user} profile={profile} onSignOut={signOut}/>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Inline button styles ───────────────────────────────────────
const btnPrimary: React.CSSProperties = {
  display:'inline-flex',alignItems:'center',gap:5,padding:'5px 11px',
  borderRadius:6,fontSize:11.5,fontFamily:'var(--sans)',cursor:'pointer',
  border:'1px solid var(--amber)',background:'var(--amber)',color:'#0a0b0f',fontWeight:500,
}
const btnDanger: React.CSSProperties = {
  display:'inline-flex',alignItems:'center',gap:5,padding:'5px 11px',
  borderRadius:6,fontSize:11.5,fontFamily:'var(--sans)',cursor:'pointer',
  border:'1px solid var(--border2)',background:'var(--bg3)',color:'var(--text2)',
}

// ── Settings panel ─────────────────────────────────────────────
function SettingsPanel({ user, profile, onSignOut }: { user: User; profile: Profile; onSignOut: () => void }) {
  const [displayName, setDisplayName] = useState(profile.display_name || '')
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const supabase = createClient()

  const save = async () => {
    setSaving(true)
    await supabase.from('profiles').update({ display_name: displayName.trim(), updated_at: new Date().toISOString() }).eq('id', user.id)
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const row = (label: string, sub: string, right: React.ReactNode) => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderBottom:'1px solid var(--border)',gap:16}}>
      <div><div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{label}</div><div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{sub}</div></div>
      {right}
    </div>
  )

  return (
    <div style={{maxWidth:560,margin:'0 auto',padding:'24px 26px 60px'}}>
      {[
        { head:'Account', rows: [
          row('Display name', user.email||'', <div style={{display:'flex',gap:8,alignItems:'center'}}><input value={displayName} onChange={e=>setDisplayName(e.target.value)} style={{padding:'6px 10px',background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:7,color:'var(--text)',fontFamily:'var(--sans)',fontSize:13,outline:'none'}}/><button onClick={save} disabled={saving||!displayName.trim()} style={{...btnPrimary,fontSize:11}}>{saved?'✓ Saved':saving?'…':'Save'}</button></div>),
          row('Email', user.email||'', <span style={{fontSize:12,fontFamily:'var(--mono)',color:'var(--text2)'}}>Verified ✓</span>),
          row('User ID', user.id?.slice(0,20)+'…', null),
        ]},
        { head:'Subscription', rows: [
          row('Current plan', profile.is_pro?'Learnpath Pro — all features':'Free — 1 learning path', <span style={{fontSize:9,fontFamily:'var(--mono)',padding:'2px 6px',borderRadius:3,background:profile.is_pro?'var(--amber-bg)':'var(--green-bg)',border:`1px solid ${profile.is_pro?'var(--amber-bg2)':'var(--green-border)'}`,color:profile.is_pro?'var(--amber2)':'var(--green-text)'}}>{profile.is_pro?'PRO':'FREE'}</span>),
          ...(!profile.is_pro ? [row('Upgrade to Pro', 'Unlimited paths · Study Mode · AI Tutor', <button style={btnPrimary}>$9.99/mo →</button>)] : []),
        ]},
        { head:'Your Stats', rows: [
          row('Current streak', '', <span style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--amber)'}}>{profile.streak ?? 0} days 🔥</span>),
          row('Total study days', '', <span style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--text2)'}}>{profile.total_days ?? 0}</span>),
          row('Cards reviewed', '', <span style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--text2)'}}>{(profile.cards_reviewed ?? 0).toLocaleString()}</span>),
        ]},
        { head:'Session', rows: [
          row('Sign out', 'You\'ll need to sign in again on this device', <button onClick={onSignOut} style={{...btnDanger,':hover':{color:'var(--red-text)'}} as React.CSSProperties}>Sign out</button>),
        ]},
      ].map(section => (
        <div key={section.head} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',marginBottom:14}}>
          <div style={{padding:'12px 18px',borderBottom:'1px solid var(--border)',fontSize:9,fontFamily:'var(--mono)',color:'var(--text3)',textTransform:'uppercase' as const,letterSpacing:'0.1em',background:'var(--bg3)'}}>{section.head}</div>
          {section.rows}
        </div>
      ))}
      <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--text3)',textAlign:'center' as const,marginTop:20,lineHeight:1.8}}>
        Learnpath · MRF Studios · contact@mrfstudios.com<br/>
        v0.5.0-beta · Supabase: luvccsyqmxctvfubuhkk
      </div>
    </div>
  )
}
