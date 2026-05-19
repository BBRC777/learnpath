import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get('videoId')
  if (!videoId) return NextResponse.json({ error: 'Missing videoId' }, { status: 400 })
  try {
    const res = await fetch('https://transcript.youtube.workers.dev/?videoId=' + videoId)
    if (!res.ok) throw new Error('Transcript not available')
    const data = await res.json()
    const text = Array.isArray(data) ? data.map((s: any) => s.text).join(' ') : ''
    if (!text) throw new Error('No transcript found')
    return NextResponse.json({ transcript: text.slice(0, 12000) })
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
