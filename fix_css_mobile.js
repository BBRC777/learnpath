const fs = require('fs');
let c = fs.readFileSync('app/globals.css', 'utf8');
if (!c.includes('app-topbar')) {
  c += '\n@media (max-width: 768px) {\n  .app-topbar {\n    padding-top: env(safe-area-inset-top) !important;\n    flex-wrap: wrap;\n    height: auto;\n  }\n}\n';
  fs.writeFileSync('app/globals.css', c, 'utf8');
}
console.log('Done');
