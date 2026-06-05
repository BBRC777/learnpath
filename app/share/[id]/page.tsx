import { createClient } from '@supabase/supabase-js'
import CloneButton from './CloneButton'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getSharedCurriculum(shareId: string) {
  const { data } = await (supabase.from('curricula') as any)
    .select('id, topic, level, dur_label, curriculum, progress')
    .eq('share_id', shareId)
    .eq('is_shared', true)
    .single()
  return data
}

export default async function SharePage({ params }: { params: { id: string } }) {
  const curr = await getSharedCurriculum(params.id)

  if (!curr) {
    return (
      <div style={{ minHeight:'100vh', background:'#0a0b0f', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center', color:'#9a9790', fontFamily:'DM Sans, sans-serif' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>◆</div>
          <div style={{ fontSize:20, marginBottom:8, color:'#e8e6df' }}>Path not found</div>
          <div style={{ fontSize:14 }}>This learning path may have been unshared or the link is invalid.</div>
        </div>
      </div>
    )
  }

  const weeks = curr.curriculum?.weeks || []
  const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
  const done = Object.values(curr.progress||{}).filter(Boolean).length
  const pct = total ? Math.round((done/total)*100) : 0

  return (
    <div style={{ minHeight:'100vh', background:'#0a0b0f', fontFamily:'DM Sans, sans-serif', color:'#e8e6df' }}>
      <div style={{ maxWidth:680, margin:'0 auto', padding:'40px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:11, fontFamily:'JetBrains Mono, monospace', color:'#d4853a', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:8 }}>◆ Learnpath · Shared curriculum</div>
          <h1 style={{ fontFamily:'Playfair Display, serif', fontSize:32, color:'#e8e6df', lineHeight:1.2, marginBottom:10 }}>{curr.curriculum?.title || curr.topic}</h1>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <span style={{ fontSize:11, fontFamily:'JetBrains Mono, monospace', padding:'3px 10px', borderRadius:4, border:'1px solid #22252f', background:'#1a1c24', color:'#9a9790' }}>{curr.topic}</span>
            <span style={{ fontSize:11, fontFamily:'JetBrains Mono, monospace', padding:'3px 10px', borderRadius:4, border:'1px solid #22252f', background:'#1a1c24', color:'#9a9790' }}>{curr.level}</span>
            <span style={{ fontSize:11, fontFamily:'JetBrains Mono, monospace', padding:'3px 10px', borderRadius:4, border:'1px solid #22252f', background:'#1a1c24', color:'#9a9790' }}>{curr.dur_label}</span>
            <span style={{ fontSize:11, fontFamily:'JetBrains Mono, monospace', padding:'3px 10px', borderRadius:4, border:'1px solid #22252f', background:'#1a1c24', color:'#9a9790' }}>{total} sessions</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,rgba(212,133,58,0.12),rgba(212,133,58,0.05))', border:'1px solid rgba(212,133,58,0.3)', borderRadius:12, padding:'20px 24px', marginBottom:32, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:500, color:'#e8a55a', marginBottom:4 }}>Start learning this path</div>
            <div style={{ fontSize:12, color:'#9a9790' }}>Sign up free to follow this curriculum with AI-generated lessons</div>
          </div>
          <CloneButton curr={curr} />
        </div>

        {/* Curriculum outline */}
        <div>
          {weeks.map((wk: any, wi: number) => (
            <div key={wi} style={{ marginBottom:20 }}>
              <div style={{ fontSize:9, fontFamily:'JetBrains Mono, monospace', color:'#5a5856', textTransform:'uppercase', letterSpacing:'0.1em', padding:'6px 0', borderBottom:'1px solid #1a1c24', marginBottom:10 }}>
                Week {wi+1} — {wk.theme}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {(wk.days||[]).map((d: any, di: number) => {
                  const typeColors: Record<string,string> = { lesson:'#7aacef', flashcards:'#b090f0', exercise:'#6abf8a', review:'#e8a55a', practice:'#6abf8a' }
                  return (
                    <div key={di} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:8, background:'#111318', border:'1px solid #1a1c24' }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:typeColors[d.type]||'#7aacef', flexShrink:0 }}/>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, color:'#e8e6df', marginBottom:1 }}>{d.title}</div>
                        <div style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', color:'#5a5856' }}>{d.type} · {d.duration}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop:40, paddingTop:24, borderTop:'1px solid #1a1c24', textAlign:'center' }}>
          <div style={{ fontFamily:'Playfair Display, serif', fontSize:18, color:'#d4853a', marginBottom:6 }}>◆ Learnpath</div>
          <div style={{ fontSize:12, color:'#5a5856', marginBottom:16 }}>AI-powered learning paths for anything</div>
          <a href="/auth" style={{ padding:'10px 24px', borderRadius:8, background:'#d4853a', color:'#0a0b0f', fontFamily:'DM Sans, sans-serif', fontSize:13, fontWeight:500, textDecoration:'none' }}>Start learning free</a>
        </div>
      </div>

      {/* Sticky watermark badge — visible on mobile screenshots */}
      <div style={{ position:'fixed', bottom:16, right:16, background:'rgba(10,11,15,0.92)', border:'1px solid #22252f', borderRadius:20, padding:'6px 12px', display:'flex', alignItems:'center', gap:6, backdropFilter:'blur(8px)', zIndex:50 }}>
        <span style={{ color:'#d4853a', fontSize:11, fontFamily:'DM Sans, sans-serif', fontWeight:500 }}>◆</span>
        <span style={{ color:'#9a9790', fontSize:11, fontFamily:'DM Sans, sans-serif' }}>Made with</span>
        <a href="https://www.learnpathnow.com" style={{ color:'#d4853a', fontSize:11, fontFamily:'DM Sans, sans-serif', fontWeight:600, textDecoration:'none' }}>Learnpath</a>
      </div>
    </div>
  )
}