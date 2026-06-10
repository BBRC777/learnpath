// scripts/centralize-upgrade-url.mjs
// One-time codemod: point every in-app Upgrade button at lib/upgrade.ts's
// getUpgradeUrl() instead of a hardcoded pay.rev.cat string. Surgical and
// idempotent — only touches the specific URL expressions and adds one import.
// Run once:  node scripts/centralize-upgrade-url.mjs   then review with `git diff`.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const FILES = [
  'components/layout/AppShell.tsx',
  'components/screens/HomeScreen.tsx',
  'components/screens/CurriculumScreen.tsx',
  'components/screens/StudyScreen.tsx',
  'components/screens/LessonScreen.tsx',
]

// Exact URL expressions currently in the code -> their getUpgradeUrl() replacement.
const REPLACEMENTS = [
  [`'https://pay.rev.cat/sffmwnoklfherqwk/'+(user?.id||'')`, `getUpgradeUrl(user?.id)`],
  [`'https://pay.rev.cat/sffmwnoklfherqwk/'+userId`,         `getUpgradeUrl(userId)`],
  [`'https://pay.rev.cat/sffmwnoklfherqwk/'+(userId||'')`,   `getUpgradeUrl(userId)`],
  ['`https://pay.rev.cat/sffmwnoklfherqwk/${userId||\'\'}`', `getUpgradeUrl(userId)`],
]

const IMPORT_LINE = `import { getUpgradeUrl } from '@/lib/upgrade'`

let totalEdits = 0

for (const file of FILES) {
  if (!existsSync(file)) { console.warn(`SKIP (not found): ${file}`); continue }
  let src = readFileSync(file, 'utf8')
  const before = src
  let edits = 0

  for (const [from, to] of REPLACEMENTS) {
    if (src.includes(from)) {
      const count = src.split(from).length - 1
      src = src.split(from).join(to)
      edits += count
    }
  }

  // Add the import once, right after the 'use client' directive, if a replacement
  // happened and it isn't already imported.
  if (src.includes('getUpgradeUrl(') && !src.includes("from '@/lib/upgrade'")) {
    const lines = src.split('\n')
    // first line is the 'use client' directive (may carry a BOM) — insert after it
    const insertAt = lines[0].includes('use client') ? 1 : 0
    lines.splice(insertAt, 0, IMPORT_LINE)
    src = lines.join('\n')
  }

  if (src !== before) {
    writeFileSync(file, src, 'utf8')
    console.log(`patched ${file}  (${edits} URL${edits === 1 ? '' : 's'})`)
    totalEdits += edits
  } else {
    console.log(`no change ${file}`)
  }
}

console.log(`\nDone. ${totalEdits} URL replacement(s) across ${FILES.length} files.`)
console.log('Now run:  npx tsc --noEmit   then review with  git diff')
