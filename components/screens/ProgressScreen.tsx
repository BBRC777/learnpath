'use client'

const HEATMAP = [0,1,0,2,1,0,0,1,2,3,1,0,1,2,0,1,2,3,2,1,0,2,3,2,1,3,2,1]
const DAYS = ['M','T','W','T','F','S','S']
const ACT_DATA = [22,0,35,18,42,28,14]

function heatColor(val: number) {
  if (val===0) return 'var(--bg4)'
  if (val===1) return 'rgba(212,133,58,0.25)'
  if (val===2) return 'rgba(212,133,58,0.55)'
  return 'var(--amber)'
}

export default function ProgressScreen() {
  const maxAct = Math.max(...ACT_DATA,1)

  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:740, margin:'0 auto', padding:'24px 28px 60px' }}>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9, marginBottom:22 }}>
          {[
            { v:'7', l:'Day streak',      c:'var(--amber)' },
            { v:'159', l:'Total minutes', c:'var(--blue-text)' },
            { v:'18', l:'Cards reviewed', c:'var(--green-text)' },
            { v:'3/6', l:'Lessons done',  c:'var(--purple-text)' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 16px' }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:24, fontWeight:500, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:16, marginBottom:20 }}>

          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em' }}>This week</div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{ACT_DATA.reduce((a,b)=>a+b,0)} min total</div>
              </div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:80 }}>
                {ACT_DATA.map((m,i)=>(
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column' as const, alignItems:'center', gap:3 }}>
                    <div style={{ width:'100%', flex:1, background:'var(--bg4)', borderRadius:3, position:'relative' as const, overflow:'hidden', minHeight:60 }}>
                      <div style={{ position:'absolute' as const, bottom:0, left:0, right:0, borderRadius:3, height:`${(m/maxAct)*100}%`, background:i===6?'var(--amber)':m>0?'var(--blue-text)':'transparent', opacity:i===6?1:0.55 }}/>
                    </div>
                    <div style={{ fontSize:8, fontFamily:'var(--mono)', color:i===6?'var(--amber)':'var(--text3)' }}>{DAYS[i]}</div>
                    {m>0 && <div style={{ fontSize:7.5, fontFamily:'var(--mono)', color:'var(--text3)' }}>{m}m</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em', marginBottom:12 }}>Learning Paths</div>
              {[
                { name:'Japanese for Beginners', pct:38, color:'#d4853a', done:2, total:6 },
                { name:'Introduction to Python',  pct:72, color:'#7aacef', done:5, total:8 },
                { name:'Music Theory',            pct:15, color:'#b090f0', done:1, total:10 },
              ].map((p,i)=>(
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:p.color }}/>
                      <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{p.name}</div>
                    </div>
                    <div style={{ fontSize:10, fontFamily:'var(--mono)', color:p.color }}>{p.pct}%</div>
                  </div>
                  <div style={{ height:4, background:'var(--bg5)', borderRadius:2 }}>
                    <div style={{ height:'100%', borderRadius:2, background:p.color, width:p.pct+'%', transition:'width 0.5s' }}/>
                  </div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginTop:4 }}>{p.done}/{p.total} lessons complete</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
                <div>
                  <div style={{ fontFamily:'var(--mono)', fontSize:36, color:'var(--amber)', fontWeight:500, lineHeight:1 }}>7</div>
                  <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>Day streak</div>
                </div>
                <div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:3 }}>Best: 14 days</div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>Total: 23 days studied</div>
                  <div style={{ fontSize:10, color:'var(--amber)', marginTop:4 }}>Keep going!</div>
                </div>
              </div>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:6, letterSpacing:'0.06em' }}>LAST 4 WEEKS</div>
              <div style={{ display:'flex', justifyContent:'space-around', marginBottom:4 }}>
                {DAYS.map((d,i)=><div key={i} style={{ fontSize:7.5, fontFamily:'var(--mono)', color:'var(--text3)', textAlign:'center' as const, flex:1 }}>{d}</div>)}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
                {HEATMAP.map((v,i)=>(
                  <div key={i} style={{ aspectRatio:'1', borderRadius:3, background:heatColor(v), opacity:0.85 }}/>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:8 }}>
                <span style={{ fontSize:8, fontFamily:'var(--mono)', color:'var(--text3)' }}>Less</span>
                {[0,1,2,3].map(v=><div key={v} style={{ width:9, height:9, borderRadius:2, background:heatColor(v) }}/>)}
                <span style={{ fontSize:8, fontFamily:'var(--mono)', color:'var(--text3)' }}>More</span>
              </div>
            </div>

            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em', marginBottom:12 }}>Flashcard Health</div>
              {[
                { label:'New cards',    v:5,  c:'var(--blue-text)',   bg:'var(--blue-bg)',   b:'var(--blue-border)' },
                { label:'Learning',     v:8,  c:'var(--amber2)',      bg:'var(--amber-bg)',  b:'var(--amber-bg2)' },
                { label:'Review',       v:12, c:'var(--green-text)',  bg:'var(--green-bg)',  b:'var(--green-border)' },
                { label:'Mature',       v:18, c:'var(--purple-text)', bg:'var(--purple-bg)', b:'var(--purple-border)' },
              ].map((s,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:9 }}>
                  <span style={{ fontSize:12, color:'var(--text2)' }}>{s.label}</span>
                  <span style={{ fontSize:11, fontFamily:'var(--mono)', padding:'2px 8px', borderRadius:4, background:s.bg, border:`1px solid ${s.b}`, color:s.c }}>{s.v} cards</span>
                </div>
              ))}
              <div style={{ height:1, background:'var(--border)', margin:'10px 0' }}/>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:12, color:'var(--text2)' }}>Due today</span>
                <span style={{ fontSize:11, fontFamily:'var(--mono)', padding:'2px 8px', borderRadius:4, background:'var(--red-bg)', border:'1px solid var(--red-border)', color:'var(--red-text)' }}>9 cards</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
          <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text2)', textTransform:'uppercase' as const, letterSpacing:'0.09em', marginBottom:14 }}>Recent Activity</div>
          {[
            { title:'Numbers 1-100', subject:'Japanese · Week 1', status:'In Progress', time:'Today' },
            { title:'Greetings & Self-Introduction', subject:'Japanese · Week 1', status:'Complete', time:'Yesterday' },
            { title:'Functions & Return Values', subject:'Python · Week 3', status:'Complete', time:'2 days ago' },
            { title:'Lists and Loops', subject:'Python · Week 3', status:'Complete', time:'3 days ago' },
          ].map((item,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom: i<3?'1px solid var(--border)':'none' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:2 }}>{item.title}</div>
                <div style={{ fontSize:10.5, fontFamily:'var(--mono)', color:'var(--text3)' }}>{item.subject} · {item.time}</div>
              </div>
              <span style={{ fontSize:10, fontFamily:'var(--mono)', padding:'2px 8px', borderRadius:4, background:item.status==='Complete'?'var(--green-bg)':'var(--amber-bg)', border:`1px solid ${item.status==='Complete'?'var(--green-border)':'var(--amber-bg2)'}`, color:item.status==='Complete'?'var(--green-text)':'var(--amber2)', whiteSpace:'nowrap' as const }}>{item.status}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
