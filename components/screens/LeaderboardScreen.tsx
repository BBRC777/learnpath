'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getLeaderboard, getLevelInfo, BADGES } from '@/lib/db'

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string|null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await createClient().auth.getUser()
        if (user) setCurrentUserId(user.id)
        const data = await getLeaderboard(20)
        setLeaders(data)
      } catch(e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const medalColors: Record<number, string> = { 0:'#fbbf24', 1:'#9ca3af', 2:'#d97706' }
  const medalEmoji: Record<number, string> = { 0:'\ud83e\udd47', 1:'\ud83e\udd48', 2:'\ud83e\udd49' }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  )

  const currentUserRank = leaders.findIndex(l => l.id === currentUserId)

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:640, margin:'0 auto', padding:'24px 28px 60px' }}>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)', marginBottom:4 }}>Leaderboard</div>
          <div style={{ fontSize:13, color:'var(--text3)' }}>Top learners ranked by XP</div>
        </div>

        {/* Top 3 podium */}
        {leaders.length >= 3 && (
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'center', gap:12, marginBottom:28, padding:'20px 0' }}>
            {[1, 0, 2].map(rank => {
              const leader = leaders[rank]
              if (!leader) return null
              const isMe = leader.id === currentUserId
              const heights: Record<number, number> = { 0: 90, 1: 68, 2: 56 }
              return (
                <div key={rank} style={{ display:'flex', flexDirection:'column' as const, alignItems:'center', flex:1 }}>
                  <div style={{ fontSize:24, marginBottom:4 }}>{medalEmoji[rank]}</div>
                  <div style={{ width:44, height:44, borderRadius:'50%', background: isMe ? 'var(--amber)' : 'var(--bg3)', border:`1px solid `, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--serif)', fontSize:18, color: isMe ? '#0a0b0f' : 'var(--amber)', marginBottom:6 }}>
                    {(leader.display_name||'?')[0].toUpperCase()}
                  </div>
                  <div style={{ fontSize:11, fontWeight:500, color: isMe ? 'var(--amber)' : 'var(--text)', marginBottom:2, textAlign:'center' as const, maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>
                    {isMe ? 'You' : (leader.display_name || 'Learner')}
                  </div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:6 }}>{(leader.xp||0).toLocaleString()} XP</div>
                  <div style={{ width:'100%', height:heights[rank], background:`22`, border:`1px solid 44`, borderRadius:'6px 6px 0 0', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ fontFamily:'var(--mono)', fontSize:13, color:medalColors[rank], fontWeight:500 }}>#{rank+1}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Full list */}
        <div style={{ display:'flex', flexDirection:'column' as const, gap:6 }}>
          {leaders.map((leader, i) => {
            const isMe = leader.id === currentUserId
            const info = getLevelInfo(leader.xp || 0)
            const badgeIds: string[] = Array.isArray(leader.badges) ? leader.badges : []
            const badgeIcons = badgeIds.slice(0, 4).map((id: string) => BADGES.find(b => b.id === id)?.icon).filter(Boolean)
            return (
              <div key={leader.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderRadius:10, background: isMe ? 'var(--amber-bg)' : 'var(--bg2)', border:`1px solid `}}>
                <div style={{ width:28, fontFamily:'var(--mono)', fontSize:12, color: i < 3 ? medalColors[i] : 'var(--text3)', textAlign:'center' as const, flexShrink:0 }}>
                  {i < 3 ? medalEmoji[i] : `#`}
                </div>
                <div style={{ width:34, height:34, borderRadius:'50%', background: isMe ? 'var(--amber)' : 'var(--bg3)', border:'1px solid var(--border2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--serif)', fontSize:14, color: isMe ? '#0a0b0f' : 'var(--amber)', flexShrink:0 }}>
                  {(leader.display_name||'?')[0].toUpperCase()}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:500, color: isMe ? 'var(--amber)' : 'var(--text)', marginBottom:2 }}>
                    {isMe ? 'You' : (leader.display_name || 'Learner')}
                    {isMe && <span style={{ marginLeft:6, fontSize:9, fontFamily:'var(--mono)', color:'var(--amber2)' }}>\u2190 you</span>}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{info.title}</span>
                    {badgeIcons.length > 0 && (
                      <div style={{ display:'flex', gap:2 }}>
                        {badgeIcons.map((icon, bi) => (
                          <span key={bi} style={{ fontSize:11 }}>{icon}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign:'right' as const, flexShrink:0 }}>
                  <div style={{ fontFamily:'var(--mono)', fontSize:14, fontWeight:500, color: isMe ? 'var(--amber)' : 'var(--text)' }}>{(leader.xp||0).toLocaleString()}</div>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)' }}>XP</div>
                </div>
              </div>
            )
          })}
        </div>

        {currentUserRank === -1 && (
          <div style={{ marginTop:16, padding:'12px 16px', borderRadius:10, background:'var(--bg3)', border:'1px solid var(--border)', fontSize:12, color:'var(--text3)', textAlign:'center' as const }}>
            Complete lessons to earn XP and appear on the leaderboard
          </div>
        )}
      </div>
    </div>
  )
}
