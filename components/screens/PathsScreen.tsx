'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { loadCurricula, deleteCurriculum, shareCurriculum, unshareCurriculum, getProfile } from '@/lib/db'
import { useRouter } from 'next/navigation'

const COLORS = ['#d4853a','#7aacef','#b090f0','#6abf8a','#ef7a7a','#e8a55a']

function CertificateModal({ curr, displayName, onClose }: { curr: any; displayName: string; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 900, H = 636
    canvas.width = W
    canvas.height = H

    // Background
    ctx.fillStyle = '#0f1117'
    ctx.fillRect(0, 0, W, H)

    // Outer border
    ctx.strokeStyle = '#d4853a'
    ctx.lineWidth = 3
    ctx.strokeRect(18, 18, W - 36, H - 36)

    // Inner border
    ctx.strokeStyle = '#3a2a10'
    ctx.lineWidth = 1
    ctx.strokeRect(28, 28, W - 56, H - 56)

    // Corner ornaments
    const corners = [[40,40],[W-40,40],[40,H-40],[W-40,H-40]]
    corners.forEach(([x,y]) => {
      ctx.strokeStyle = '#d4853a'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = '#e8a55a'
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // Top label
    ctx.fillStyle = '#d4853a'
    ctx.font = '600 11px DM Sans, sans-serif'
    ctx.letterSpacing = '4px'
    ctx.textAlign = 'center'
    ctx.fillText('LEARNPATH', W / 2, 80)

    // Decorative line
    ctx.strokeStyle = '#d4853a'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W/2 - 120, 92)
    ctx.lineTo(W/2 - 20, 92)
    ctx.moveTo(W/2 + 20, 92)
    ctx.lineTo(W/2 + 120, 92)
    ctx.stroke()
    ctx.fillStyle = '#d4853a'
    ctx.beginPath()
    ctx.arc(W/2, 92, 3, 0, Math.PI * 2)
    ctx.fill()

    // Main heading
    ctx.fillStyle = '#e8e6df'
    ctx.font = '500 38px Playfair Display, Georgia, serif'
    ctx.letterSpacing = '0px'
    ctx.fillText('Certificate of Completion', W / 2, 158)

    // Subtitle line
    ctx.fillStyle = '#9a9790'
    ctx.font = '14px DM Sans, sans-serif'
    ctx.fillText('This certifies that', W / 2, 210)

    // Name
    ctx.fillStyle = '#d4853a'
    ctx.font = 'italic 500 36px Playfair Display, Georgia, serif'
    ctx.fillText(displayName || 'Learner', W / 2, 268)

    // Underline name
    const nameWidth = ctx.measureText(displayName || 'Learner').width
    ctx.strokeStyle = '#d4853a'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(W/2 - nameWidth/2, 278)
    ctx.lineTo(W/2 + nameWidth/2, 278)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#9a9790'
    ctx.font = '14px DM Sans, sans-serif'
    ctx.fillText('has successfully completed the learning path', W / 2, 316)

    // Path title
    const title = curr.curriculum?.title || curr.topic
    ctx.fillStyle = '#e8e6df'
    ctx.font = '600 26px Playfair Display, Georgia, serif'
    // Truncate if too long
    let displayTitle = title
    while (ctx.measureText(displayTitle).width > 700 && displayTitle.length > 10) {
      displayTitle = displayTitle.slice(0, -1)
    }
    if (displayTitle !== title) displayTitle += '...'
    ctx.fillText(displayTitle, W / 2, 368)

    // Meta row
    ctx.fillStyle = '#5a5856'
    ctx.font = '12px JetBrains Mono, monospace'
    const meta = `${curr.topic}  ·  ${curr.level}  ·  ${curr.dur_label}`
    ctx.fillText(meta, W / 2, 400)

    // Divider
    const grad = ctx.createLinearGradient(120, 0, W-120, 0)
    grad.addColorStop(0, 'transparent')
    grad.addColorStop(0.2, '#3a2a10')
    grad.addColorStop(0.8, '#3a2a10')
    grad.addColorStop(1, 'transparent')
    ctx.strokeStyle = grad
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(120, 428)
    ctx.lineTo(W-120, 428)
    ctx.stroke()

    // Date
    const date = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
    ctx.fillStyle = '#9a9790'
    ctx.font = '12px DM Sans, sans-serif'
    ctx.fillText(`Issued ${date}`, W / 2, 468)

    // Bottom seal area
    ctx.strokeStyle = '#3a2a10'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(W/2, 540, 42, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = '#d4853a'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(W/2, 540, 36, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = '#d4853a'
    ctx.font = '22px Playfair Display, Georgia, serif'
    ctx.fillText('LP', W/2, 548)

    // Watermark
    ctx.fillStyle = '#5a5856'
    ctx.font = '10px DM Sans, sans-serif'
    ctx.letterSpacing = '0.5px'
    ctx.textAlign = 'right'
    ctx.fillText('Made with ◆ Learnpath · learnpathnow.com', W - 32, H - 24)
    ctx.textAlign = 'center'

    setReady(true)
  }, [curr, displayName])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    const safeName = (curr.curriculum?.title || curr.topic).replace(/[^a-z0-9]/gi, '_').slice(0, 40)
    link.download = `learnpath_certificate_${safeName}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, padding:24 }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <canvas ref={canvasRef} style={{ maxWidth:'100%', borderRadius:8, boxShadow:'0 8px 48px rgba(212,133,58,0.2)', opacity: ready ? 1 : 0, transition:'opacity 0.3s' }}/>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={handleDownload} style={{ padding:'10px 24px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:600, cursor:'pointer' }}>
            Download PNG
          </button>
          <button onClick={onClose} style={{ padding:'10px 20px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PathsScreen() {
  const [curricula, setCurricula] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string|null>(null)
  const [displayName, setDisplayName] = useState<string>('')
  const [deleting, setDeleting] = useState<string|null>(null)
  const [sharing, setSharing] = useState<string|null>(null)
  const [copiedId, setCopiedId] = useState<string|null>(null)
  const [certCurr, setCertCurr] = useState<any|null>(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await createClient().auth.getUser()
        if (!user) return
        setUserId(user.id)
        const [currs, profile] = await Promise.all([loadCurricula(user.id), getProfile()])
        setCurricula(currs)
        setDisplayName(profile?.display_name || user.email?.split('@')[0] || 'Learner')
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
    <>
      {certCurr && (
        <CertificateModal curr={certCurr} displayName={displayName} onClose={() => setCertCurr(null)} />
      )}
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
                const isComplete = pct === 100 && total > 0

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
                          {isComplete && (
                            <button
                              onClick={() => setCertCurr(c)}
                              style={{ padding:'6px 13px', borderRadius:7, border:'1px solid #d4853a', background:'rgba(212,133,58,0.1)', color:'#d4853a', fontFamily:'var(--sans)', fontSize:11, fontWeight:500, cursor:'pointer' }}>
                              🎓 Certificate
                            </button>
                          )}
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
    </>
  )
}