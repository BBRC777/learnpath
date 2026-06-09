const fs = require('fs');
let c = fs.readFileSync('components/layout/AppShell.tsx', 'utf8');

// Only fix the topbar - add CSS class for mobile safe area
c = c.replace(
  `        {/* Topbar */}\n        <div style={{ height:52, borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px 0 12px', background:'var(--bg2)', flexShrink:0, position:'sticky', top:0, zIndex:40 }}>`,
  `        {/* Topbar */}\n        <div className="app-topbar" style={{ borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px 0 12px', background:'var(--bg2)', flexShrink:0, position:'sticky', top:0, zIndex:40, minHeight:52 }}>`
);

fs.writeFileSync('components/layout/AppShell.tsx', c, 'utf8');
console.log('Done - changes:', c.includes('app-topbar') ? 'YES' : 'NO match found');
