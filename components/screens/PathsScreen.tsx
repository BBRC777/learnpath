'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { loadCurricula, deleteCurriculum, shareCurriculum, unshareCurriculum } from '@/lib/db'
import { useRouter } from 'next/navigation'

const COLORS = ['#d4853a','#7aacef','#b090f0','#6abf8a','#ef7a7a','#e8a55a']

export default function PathsScreen() {
  const [curricula, setCurricula] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string|null>(null)
  const [deleting, setDeleting] = useState<string|null>(null)
  const [sharing, setSharing] = useState<string|null>(null)
  const [copiedId, setCopiedId] = useState<string|null>(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await createClient().auth.getUser()
        if (!user) return
        setUserId(user.id)
        const currs = await loadCurricula(user.id)
        setCurricula(currs)
      } catch(e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this learning path? This cannot be undone.')) return
    setDeleting(id)
    try {
      await deleteCurriculum(id)
      setCurricula(cs => cs.filter(c => c.id !== id))
    } catch(e) { console.error(e) }
    finally { setDeleting(null) }
  }

  const handleShare = async (curr: any) => {
    setSharing(curr.id)
    try {
      if (curr.is_shared && curr.share_id) {
        await unshareCurriculum(curr.id)
        setCurricula(cs => cs.map(c => c.id === curr.id ? { ...c, is_shared: false } : c))
      } else {
        const shareId = await shareCurriculum(curr.id)
        setCurricula(cs => cs.map(c => c.id === curr.id ? { ...c, is_shared: true, share_id: shareId } : c))
      }
    } catch(e) { console.error(e) }
    finally { setSharing(null) }
  }

  const handleCopyLink = (shareId: string, currId: string) => {
    const url = window.location.origin + '/share/' + shareId
    navigator.clipboard.writeText(url)
    setCopiedId(currId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  )

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:740, margin:'0 auto', padding:'24px 28px 60px' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)' }}>All Learning Paths</div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => router.push('/app/leaderboard')} style={{ padding:'8px 14px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:12, cursor:'pointer' }}>🏆 Leaderboard</button>
            <button onClick={() => router.push('/app/curriculum')} style={{ padding:'8px 14px', borderRadius:8, border:'none', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:12, fontWeight:500, cursor:'pointer' }}>+ New Path</button>
          </div>
        </div>

        {curricula.length === 0 ? (
          <div style={{ textAlign:'center' as const, padding:'60px 0' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text2)', marginBottom:8 }}>No learning paths yet</div>
            <div style={{ fontSize:13, color:'var(--text3)', marginBottom:20 }}>Build your first AI-generated curriculum.</div>
            <button onClick={() => router.push('/app/curriculum')} style={{ padding:'10px 22px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>Build my first path</button>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column' as const, gap:12 }}>
            {curricula.map((c, i) => {
              const weeks = c.curriculum?.weeks || []
              const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
              const done = Object.values(c.progress||{}).filter(Boolean).length
              const pct = total ? Math.round((done/total)*100) : 0
              const color = COLORS[i % COLORS.length]
              const isSharing = sharing === c.id
              const isCopied = copiedId === c.id

              return (
                <div key={c.id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'18px 20px' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:color, flexShrink:0, marginTop:4 }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                        <div style={{ fontFamily:'var(--serif)', fontSize:16, color:'var(--text)', lineHeight:1.3 }}>{c.curriculum?.title || c.topic}</div>
                        <div style={{ fontSize:10, fontFamily:'var(--mono)', color }}>{pct}%</div>
                      </div>
                      <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:10 }}>
                        {c.topic} · {c.level} · {c.dur_label} · {done}/{total} sessions
                      </div>
                      <div style={{ height:4, background:'var(--bg4)', borderRadius:2, marginBottom:12 }}>
                        <div style={{ height:'100%', borderRadius:2, background:color, width:pct+'%', transition:'width 0.5s' }}/>
                      </div>
                      <div style={{ display:'flex', gap:7, flexWrap:'wrap' as const }}>
                        <button onClick={() => router.push('/app/lesson?id=' + c.id)} style={{ padding:'6px 13px', borderRadius:7, border:'none', background:'var(--amber)', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:11, fontWeight:500, cursor:'pointer' }}>Continue</button>
                        <button
                          onClick={() => handleShare(c)}
                          disabled={isSharing}
                          style={{ padding:'6px 13px', borderRadius:7, border:'1px solid var(--border2)', background:c.is_shared?'var(--amber-bg)':'var(--bg3)', color:c.is_shared?'var(--amber)':'var(--text2)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer' }}>
                          {isSharing ? 'Saving...' : c.is_shared ? '🔗 Shared' : '🔗 Share'}
                        </button>
                        {c.is_shared && c.share_id && (
                          <button
                            onClick={() => handleCopyLink(c.share_id, c.id)}
                            style={{ padding:'6px 13px', borderRadius:7, border:'1px solid var(--border2)', background:isCopied?'var(--green-bg)':'var(--bg3)', color:isCopied?'var(--green-text)':'var(--text2)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer' }}>
                            {isCopied ? '✓ Copied!' : 'Copy link'}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={deleting === c.id}
                          style={{ padding:'6px 13px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer', marginLeft:'auto' }}>
                          {deleting === c.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
