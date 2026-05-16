import { Suspense } from 'react'
import LessonScreen from '@/components/screens/LessonScreen'

export default function LessonPage() {
  return (
    <Suspense fallback={<div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}><div style={{ width:28, height:28, border:'2px solid #333', borderTopColor:'#d4853a', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/></div>}>
      <LessonScreen />
    </Suspense>
  )
}
