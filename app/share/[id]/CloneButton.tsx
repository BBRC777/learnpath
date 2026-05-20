'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveCurriculum } from '@/lib/db'
import { useRouter } from 'next/navigation'

export default function CloneButton({ curr }: { curr: any }) {
  const [user, setUser] = useState<any>(null)
  const [cloning, setCloning] = useState(false)
  const [cloned, setCloned] = useState(false)
  const router = useRouter()

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleClone = async () => {
    if (!user) { router.push('/auth'); return }
    setCloning(true)
    try {
      const result = await saveCurriculum(user.id, {
        topic: curr.topic,
        level: curr.level,
        durLabel: curr.dur_label,
        days: curr.curriculum?.weeks?.reduce((a: number, w: any) => a + (w.days?.length||0), 0) || 0,
        time: 30,
        style: 'standard',
        curriculum: curr.curriculum,
      })
      setCloned(true)
      setTimeout(() => router.push('/app/lesson?id=' + result.id), 800)
    } catch(e) { console.error(e) }
    finally { setCloning(false) }
  }

  if (cloned) return (
    <div style={{ padding:'10px 20px', borderRadius:8, background:'#6abf8a', color:'#0a0b0f', fontFamily:'DM Sans, sans-serif', fontSize:13, fontWeight:500, whiteSpace:'nowrap' }}>
      Added! Redirecting...
    </div>
  )

  return (
    <button
      onClick={handleClone}
      disabled={cloning}
      style={{ padding:'10px 20px', borderRadius:8, background:cloning?'#a06028':'#d4853a', color:'#0a0b0f', fontFamily:'DM Sans, sans-serif', fontSize:13, fontWeight:500, border:'none', cursor:cloning?'not-allowed':'pointer', whiteSpace:'nowrap', flexShrink:0 }}>
      {cloning ? 'Adding...' : user ? 'Add to my paths' : 'Get started free'}
    </button>
  )
}
