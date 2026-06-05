'use client'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function RefPage() {
  const params = useParams()
  const router = useRouter()
  const code = (params.code as string)?.toUpperCase()

  useEffect(() => {
    if (code) {
      localStorage.setItem('lp-referral-code', code)
    }
    router.replace('/auth')
  }, [code, router])

  return (
    <div style={{ minHeight:'100vh', background:'#0a0b0f', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}>
      <div style={{ color:'#d4853a', fontSize:28, fontFamily:'Playfair Display, serif' }}>◆ Learnpath</div>
      <div style={{ color:'#9a9790', fontSize:14, fontFamily:'DM Sans, sans-serif' }}>Setting up your free week…</div>
    </div>
  )
}