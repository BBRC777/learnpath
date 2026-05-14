'use client'
// components/screens/HomeScreen.tsx
import type { Profile } from '@/types/database'

const ACT_DATA = [22, 0, 35, 18, 42, 28, 14]
const ACT_DAYS = ['M','T','W','T','F','S','S']
const VOCAB_DUE = [
  { w:'ichi', o:true },{ w:'juu', o:true },{ w:'hyaku', o:false },
  { w:'nana', o:false },{ w:'print()', o:true },{ w:'def', o:false },
]

function getGreeting(): string {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

function getDisplayName(profile: Profile | null): string {
  if (profile?.display_name) return profile.display_name.split(' ')[0]
  if (profile?.email) return profile.email.split('@')[0]
  return 'Learner'
}

export default function HomeScreen({ profile }: { profile: Profile | null }) {
  const name  = getDisplayName(profile)
  const isPro = profile?.is_pro ?? false
  const maxAct = Math.max(...ACT_DATA, 1)

  return (
    <div style={{maxWidth:740,margin:'0 auto',padding:'22px 26px 60px'}}>

      {/* Pro banner */}
      {!isPro && (
        <div style={{background:'linear-gradient(135deg,rgba(212,133,58,0.12),rgba(212,133,58,0.05))',border:'1px solid rgba(212,133,58,0.25)',borderRadius:10,padding:'14px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,marginBottom:18}}>
          <div>
            <div style={{fontSize:12.5,fontWeight:500,color:'var(--amber2)',marginBottom:2}}>✨ Unlock Learnpath Pro</div>
            <div style={{fontSize:11,color:'var(--text2)'}}>Unlimited paths, AI Tutor, Study Mode — $9.99/mo or $79.99/yr</div>
          </div>
          <button style={{padding:'7px 14px',borderRadius:7,background:'var(--amber)',border:'none',color:'#0a0b0f',fontSize:11.5,fontWeight:500,cursor:'pointer',whiteSpace:'nowrap' as const,fontFamily:'var(--sans)'}}>Upgrade →</button>
        </div>
      )}

      {/* Greeting */}
      <div style={{marginBottom:18}}>
        <div style={{fontSize:9,fontFamily:'var(--mono)',color:'var(--text3)',letterSpacing:'0.12em',textTransform:'uppercase' as const,marginBottom:3}}>{new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div>
        <div style={{fontFamily:'var(--serif)',fontSize:24,color:'var(--text)',marginBottom:3}}>{getGreeting()}, {name} 👋</div>
        <div style={{fontSize:13,color:'var(--text2)'}}>You have 3 flashcards overdue and your next lesson is ready.</div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:18}}>
        {[
          { v: profile?.streak ?? 0,                       l:'Day streak',     c:'var(--amber)' },
          { v: (profile?.total_days ?? 0) * 28 + ' min',   l:'Total minutes',  c:'var(--blue-text)' },
          { v: profile?.cards_reviewed ?? 0,               l:'Cards reviewed', c:'var(--green-text)' },
          { v: '3/6',                                      l:'Lessons done',   c:'var(--purple-text)' },
        ].map((s,i) => (
          <div key={i} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:9,padding:'12px 14px'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:21,fontWeight:500,color:s.c}}>{s.v}</div>
            <div style={{fontSize:10,color:'var(--text3)',marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Continue card */}
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',display:'flex',cursor:'pointer',transition:'border-color 0.14s',marginBottom:18}}>
        <div style={{width:130,flexShrink:0,background:'var(--bg4)',overflow:'hidden'}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=260&q=70" alt="Japanese" style={{width:'100%',height:'100%',objectFit:'cover' as const,display:'block'}}/>
        </div>
        <div style={{flex:1,padding:'16px 18px',display:'flex',flexDirection:'column' as const,justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:9,fontFamily:'var(--mono)',color:'var(--amber)',textTransform:'uppercase' as const,letterSpacing:'0.1em',marginBottom:4}}>Continue · Japanese</div>
            <div style={{fontFamily:'var(--serif)',fontSize:17,color:'var(--text)',marginBottom:4}}>Numbers 1–100</div>
            <div style={{fontSize:12,color:'var(--text2)',lineHeight:1.5}}>Week 1 · Lesson 3 — 38% through your path</div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <div style={{flex:1,height:2,background:'var(--bg5)',borderRadius:1,marginRight:10}}>
              <div style={{height:'100%',borderRadius:1,background:'var(--amber)',width:'38%'}}/>
            </div>
            <div style={{fontSize:9,fontFamily:'var(--mono)',color:'var(--amber)'}}>38%</div>
            <button style={{padding:'5px 13px',borderRadius:5,background:'var(--amber)',border:'none',color:'#0a0b0f',fontSize:11.5,fontWeight:500,cursor:'pointer',marginLeft:10,fontFamily:'var(--sans)'}}>Continue →</button>
          </div>
        </div>
      </div>

      {/* Two-col */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:14}}>
        {/* Activity */}
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--text2)',textTransform:'uppercase' as const,letterSpacing:'0.09em'}}>This week&apos;s activity</div>
            <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--text3)'}}>{ACT_DATA.reduce((a,b)=>a+b,0)} min</div>
          </div>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 16px'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:5,height:64,marginTop:8}}>
              {ACT_DATA.map((m,i) => (
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column' as const,alignItems:'center',gap:3}}>
                  <div style={{width:'100%',flex:1,background:'var(--bg4)',borderRadius:3,position:'relative' as const,overflow:'hidden',minHeight:48}}>
                    <div style={{position:'absolute' as const,bottom:0,left:0,right:0,borderRadius:3,height:`${(m/maxAct)*100}%`,background:i===6?'var(--amber)':m>0?'var(--blue-text)':'transparent',opacity:i===6?1:0.55,transition:'height 0.5s'}}/>
                  </div>
                  <div style={{fontSize:8,fontFamily:'var(--mono)',color:i===6?'var(--amber)':'var(--text3)'}}>{ACT_DAYS[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vocab due */}
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--text2)',textTransform:'uppercase' as const,letterSpacing:'0.09em'}}>Flashcards due</div>
            <div style={{fontSize:10.5,color:'var(--amber)',cursor:'pointer',fontFamily:'var(--mono)'}}>Review all</div>
          </div>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 16px'}}>
            <div style={{fontSize:11,color:'var(--text2)',marginBottom:8}}>
              <span style={{color:'var(--red-text)',fontFamily:'var(--mono)',fontWeight:500}}>3 overdue</span>
              <span style={{color:'var(--text3)',margin:'0 4px'}}>·</span>
              <span style={{color:'var(--amber)',fontFamily:'var(--mono)'}}>6 due</span>
            </div>
            <div style={{display:'flex',flexWrap:'wrap' as const,gap:5,marginBottom:11}}>
              {VOCAB_DUE.map((v,i) => (
                <div key={i} style={{padding:'3px 9px',borderRadius:10,fontSize:10.5,fontFamily:'var(--mono)',cursor:'pointer',background:v.o?'var(--red-bg)':'var(--amber-bg)',border:`1px solid ${v.o?'var(--red-border)':'var(--amber-bg2)'}`,color:v.o?'var(--red-text)':'var(--amber2)'}}>
                  {v.w}
                </div>
              ))}
            </div>
            <button style={{width:'100%',padding:'8px',borderRadius:7,background:'var(--amber)',border:'none',color:'#0a0b0f',fontFamily:'var(--sans)',fontSize:12,fontWeight:500,cursor:'pointer'}}>
              Start review →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
