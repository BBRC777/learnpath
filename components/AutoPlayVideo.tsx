'use client'
import { useRef, useEffect } from 'react'

interface Props {
  src: string
  style?: React.CSSProperties
}

// Plays the video when it scrolls into view (≥50% visible), pauses when it leaves.
// muted is required for autoplay in all modern browsers — user can unmute via controls.
export default function AutoPlayVideo({ src, style }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      controls
      muted
      playsInline
      loop
      style={style}
    />
  )
}