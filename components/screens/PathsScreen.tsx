'use client'
// Certificate generation using browser canvas
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { loadCurricula } from '@/lib/db'
import { useRouter } from 'next/navigation'

const COLORS = ['#d4853a','#7aacef','#b090f0','#6abf8a','#ef7a7a','#e8a55a']

export default function PathsScreen() {
  const [curricula, setCurricula] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string|null>(null)
  const [deleting, setDeleting] = useState(false)
  const [certPath, setCertPath] = useState<any>(null)
  const router = useRouter()

  const generateCertificate = (c: any, displayName: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200; canvas.height = 850
    const ctx = canvas.getContext('2d')!
    // Background
    ctx.fillStyle = '#0a0b0f'
    ctx.fillRect(0, 0, 1200, 850)
    // Border
    ctx.strokeStyle = '#d4853a'
    ctx.lineWidth = 3
    ctx.strokeRect(30, 30, 1140, 790)
    ctx.strokeStyle = 'rgba(212,133,58,0.3)'
    ctx.lineWidth = 1
    ctx.strokeRect(45, 45, 1110, 760)
    // Header
    ctx.fillStyle = '#d4853a'
    ctx.font = 'bold 18px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('◆ LEARNPATH', 600, 100)
    // Title
    ctx.fillStyle = '#e8e6df'
    ctx.font = 'italic 38px Georgia'
    ctx.fillText('Certificate of Completion', 600, 170)
    // Divider
    ctx.strokeStyle = 'rgba(212,133,58,0.5)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(200, 195); ctx.lineTo(1000, 195); ctx.stroke()
    // This certifies
    ctx.fillStyle = '#9a9790'
    ctx.font = '18px Georgia'
    ctx.fillText('This certifies that', 600, 260)
    // Name
    ctx.fillStyle = '#d4853a'
    ctx.font = 'bold 52px Georgia'
    ctx.fillText(displayName || 'Learner', 600, 340)
    // has completed
    ctx.fillStyle = '#9a9790'
    ctx.font = '18px Georgia'
    ctx.fillText('has successfully completed', 600, 390)
    // Course title
    const title = c.curriculum?.title || c.topic
    ctx.fillStyle = '#e8e6df'
    ctx.font = 'bold 30px Georgia'
    // Wrap long titles
    if (ctx.measureText(title).width > 900) {
      ctx.font = 'bold 22px Georgia'
    }
    ctx.fillText(title, 600, 450)
    // Details
    ctx.fillStyle = '#5a5856'
    ctx.font = '15px monospace'
    ctx.fillText(${c.level} ·  ·  days/week · /session, 600, 500)
    // Divider
    ctx.strokeStyle = 'rgba(212,133,58,0.3)'
    ctx.beginPath(); ctx.moveTo(200, 560); ctx.lineTo(1000, 560); ctx.stroke()
    // Date
    ctx.fillStyle = '#9a9790'
    ctx.font = '15px Georgia'
    const date = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
    ctx.fillText(Completed on , 600, 620)
    // Footer
    ctx.fillStyle = '#5a5856'
    ctx.font = '13px monospace'
    ctx.fillText('LEARNPATHNOW.COM', 600, 780)
    // Download
    const link = document.createElement('a')
    link.download = learnpath-certificate-.png
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const load = async () => {
    const { data: { user } } = await createClient().auth.getUser()
    if (!user) return
    const currs = await loadCurricula(user.id)
    setCurricula(currs)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const confirmDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await (createClient().from('curricula') as any).delete().eq('id', deleteId)
      setCurricula(c => c.filter(x => x.id !== deleteId))
      setDeleteId(null)
    } catch(e) { console.error(e) }
    finally { setDeleting(false) }
  }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:'var(--amber)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  )

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      {/* Delete confirmation modal */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:24 }}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'28px 32px', maxWidth:420, width:'100%' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text)', marginBottom:8 }}>Remove this path?</div>
            <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.65, marginBottom:24 }}>
              All progress will be lost and the generated curriculum will not be recoverable. This action cannot be undone.
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setDeleteId(null)} style={{ flex:1, padding:'11px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting} style={{ flex:1, padding:'11px', borderRadius:8, border:'1px solid var(--red-border)', background:'var(--red-bg)', color:'var(--red-text)', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>
                {deleting ? 'Removing...' : 'Yes, remove it'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth:740, margin:'0 auto', padding:'24px 28px 60px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:24, color:'var(--text)', marginBottom:3 }}>All Learning Paths</div>
            <div style={{ fontSize:13, color:'var(--text2)' }}>{curricula.length} path{curricula.length!==1?'s':''} · {curricula.filter(c=>Object.values(c.progress||{}).some(Boolean)).length} in progress</div>
          </div>
          <button onClick={() => router.push('/app/curriculum')} style={{ padding:'9px 18px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>
            + New Path
          </button>
        </div>

        {curricula.length === 0 ? (
          <div style={{ textAlign:'center' as const, padding:'60px 20px', color:'var(--text3)' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:20, color:'var(--text2)', marginBottom:8 }}>No learning paths yet</div>
            <div style={{ fontSize:13, marginBottom:20, lineHeight:1.6 }}>Build your first AI-generated curriculum — takes 30 seconds.</div>
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
              const createdAt = new Date(c.created_at).toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' })

              return (
                <div key={c.id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                  <div style={{ height:3, background:color }}/>
                  <div style={{ padding:'18px 20px' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:12 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:'var(--serif)', fontSize:18, color:'var(--text)', marginBottom:3, lineHeight:1.3 }}>{c.curriculum?.title || c.topic}</div>
                        <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)' }}>{c.level} · {c.dur_label} · {c.days} days/week · Created {createdAt}</div>
                      </div>
                      <button onClick={() => setDeleteId(c.id)} style={{ padding:'5px 11px', borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text3)', fontSize:11, fontFamily:'var(--sans)', cursor:'pointer', flexShrink:0, transition:'all 0.13s' }}
                        onMouseEnter={e => { (e.target as HTMLElement).style.borderColor='var(--red-border)'; (e.target as HTMLElement).style.color='var(--red-text)'; (e.target as HTMLElement).style.background='var(--red-bg)' }}
                        onMouseLeave={e => { (e.target as HTMLElement).style.borderColor='var(--border2)'; (e.target as HTMLElement).style.color='var(--text3)'; (e.target as HTMLElement).style.background='var(--bg3)' }}>
                        Remove
                      </button>
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:14 }}>
                      {[
                        { label:'Progress',  value: pct+'%',     color },
                        { label:'Complete',  value: `${done}/${total}`, color:'var(--text2)' },
                        { label:'Duration',  value: c.dur_label, color:'var(--text2)' },
                        { label:'Session',   value: c.time,      color:'var(--text2)' },
                      ].map((s,j) => (
                        <div key={j} style={{ background:'var(--bg3)', borderRadius:7, padding:'9px 11px' }}>
                          <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:3 }}>{s.label}</div>
                          <div style={{ fontSize:14, fontWeight:500, color:s.color, fontFamily:'var(--mono)' }}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ height:4, background:'var(--bg5)', borderRadius:2, marginBottom:14 }}>
                      <div style={{ height:'100%', borderRadius:2, background:color, width:pct+'%', transition:'width 0.5s' }}/>
                    </div>

                    {c.curriculum?.overview && (
                      <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.6, marginBottom:14 }}>{c.curriculum.overview}</div>
                    )}

                    <div style={{ display:'flex', gap:9 }}>
                      <button onClick={() => router.push('/app/lesson?id=' + c.id)} style={{ flex:2, padding:'10px', borderRadius:8, background:'var(--amber)', border:'none', color:'#0a0b0f', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>
                        {pct >= 100 ? '✓ Review' : pct > 0 ? 'Continue Learning' : 'Start Learning'}
                      </button>
                      <button onClick={() => router.push('/app/lesson?id=' + c.id)} style={{ flex:1, padding:'10px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }}>
                        View Curriculum
                      </button>
                      {pct >= 100 && (
                        <button onClick={async () => {
                          const { data: { user } } = await createClient().auth.getUser()
                          const { data: profile } = await (createClient().from('profiles') as any).select('display_name').eq('id', user?.id).single()
                          generateCertificate(c, profile?.display_name || 'Learner')
                        }} style={{ padding:'9px 16px', borderRadius:8, background:'var(--amber-bg)', border:'1px solid rgba(212,133,58,0.4)', color:'var(--amber)', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }}>
                          🎓 Certificate
                        </button>
                      </button>
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







