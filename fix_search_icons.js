const fs = require('fs');
let c = fs.readFileSync('components/layout/AppShell.tsx', 'utf8');

// Move search to row 1 - swap theme button and search positions
// Row 1 should be: hamburger + title + search + theme
// Row 2 should be: toolbar buttons only

// Fix row 1 - add search after title, keep theme button at end
c = c.replace(
  `            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} style={{ width:30, height:30, borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          </div>
          <div style={{ padding:'0 12px 8px', display:'flex', gap:6, flexWrap:'wrap' as const }}>
            <div style={{ display:'flex', gap:6, alignItems:'center', flex:1, flexWrap:'wrap' as const }}>`,
  `            <div style={{ position:'relative', flex:1, margin:'0 6px' }}>
              <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true) }} onFocus={() => setSearchOpen(true)} onBlur={() => setTimeout(() => setSearchOpen(false), 150)} placeholder='Search paths...' style={{ width:'100%', padding:'6px 12px 6px 28px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:7, color:'var(--text)', fontFamily:'var(--sans)', fontSize:12, outline:'none', boxSizing:'border-box' as const }} />
              <span style={{ position:'absolute' as const, left:9, top:'50%', transform:'translateY(-50%)', color:'var(--text3)', fontSize:11, pointerEvents:'none' as const }}>⌕</span>
              {searchOpen && searchQuery.trim().length > 0 && (() => {
                const results = curricula.filter((cr: any) => (cr.curriculum?.title || cr.topic || '').toLowerCase().includes(searchQuery.toLowerCase()))
                if (results.length === 0) return <div style={{ position:'absolute' as const, top:'calc(100% + 4px)', left:0, right:0, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', fontSize:12, color:'var(--text3)', zIndex:200 }}>No paths found</div>
                return (
                  <div style={{ position:'absolute' as const, top:'calc(100% + 4px)', left:0, right:0, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden', zIndex:200 }}>
                    {results.slice(0,6).map((r: any) => {
                      const weeks = r.curriculum?.weeks || []
                      const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
                      const done = Object.values(r.progress||{}).filter(Boolean).length
                      const pct = total ? Math.round((done/total)*100) : 0
                      return (
                        <div key={r.id} onMouseDown={() => { router.push('/app/lesson?id='+r.id); setSearchQuery(''); setSearchOpen(false) }} style={{ padding:'10px 14px', cursor:'pointer', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }} onMouseEnter={e => (e.currentTarget.style.background='var(--bg3)')} onMouseLeave={e => (e.currentTarget.style.background='transparent')}>
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
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} style={{ width:30, height:30, borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          </div>
          <div style={{ padding:'0 12px 8px', display:'flex', gap:6, flexWrap:'wrap' as const }}>
            <div style={{ display:'flex', gap:6, alignItems:'center', flex:1, flexWrap:'wrap' as const }}>`
);

// Remove old search block from row 2
c = c.replace(
  `            </div>
            {/* Search */}
            <div style={{ position:'relative', flex:1, minWidth:140 }}>
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
                      <div key={r.id} onMouseDown={() => { router.push(\`/app/lesson?id=\`+r.id); setSearchQuery(''); setSearchOpen(false) }}
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
          </div>`,
  `            </div>
          </div>`
);

// Fix corrupted NAV icons
c = c.replace(`icon:'⊞'`, `icon:'⊞'`);
const NAV_FIXED = `const NAV = [
  { href:'/app',             label:'Home',              icon:'🏠' },
  { href:'/app/lesson',      label:'Current Lesson',    icon:'▶' },
  { href:'/app/curriculum',  label:'New Learning Path', icon:'+' },
  { href:'/app/paths',       label:'All Learning Paths',icon:'◈' },
  { href:'/app/leaderboard', label:'Leaderboard',       icon:'🏆' },
  { href:'/app/team',        label:'Team',              icon:'🏢' },
  { href:'/app/flashcards',  label:'Flashcards',        icon:'⧉', badge:'__DUE__' },
  { href:'/app/study',       label:'Study Mode',        icon:'◎', pro:true },
  { href:'/app/progress',    label:'Progress',          icon:'◉' },
]`;
c = c.replace(/const NAV = \[[\s\S]*?\]/, NAV_FIXED);

// Fix sidebar logo corrupted text
c = c.replace(/◆ Learnpath[^']*'/, "◆ Learnpath'");
c = c.replace(/Learn Anything[^']*All Inside'/, "Learn Anything · All Inside'");

// Fix streak and other corrupted symbols
c = c.replace(/Day streak[^'<]*/g, 'Day streak 🔥');
c = c.replace(/\+[^']*50 XP'/g, "+🧊 50 XP'");
c = c.replace(/🧊[^<]*/g, '🧊 ');

fs.writeFileSync('components/layout/AppShell.tsx', c, 'utf8');
console.log('Done');
