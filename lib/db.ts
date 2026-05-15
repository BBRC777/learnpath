import { createClient } from '@/lib/supabase/client'

export async function saveCurriculum(userId: string, params: {
  topic: string
  level: string
  durLabel: string
  days: number
  time: string
  style: string
  curriculum: any
}) {
  const supabase = createClient()
  const id = 'curr_' + Date.now() + '_' + Math.random().toString(36).slice(2,7)
  const { data, error } = await (supabase.from('curricula') as any).insert({
    id,
    user_id: userId,
    topic: params.topic,
    level: params.level,
    dur_label: params.durLabel,
    days: params.days,
    time: params.time,
    style: params.style,
    curriculum: params.curriculum,
    progress: {},
    lesson_cache: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).select().single()
  if (error) throw error
  return data
}

export async function loadCurricula(userId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase.from('curricula') as any)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateCurriculumProgress(curriculumId: string, progress: any) {
  const supabase = createClient()
  await (supabase.from('curricula') as any)
    .update({ progress, updated_at: new Date().toISOString() })
    .eq('id', curriculumId)
}

export async function getCachedLesson(curriculumId: string, lessonKey: string) {
  const supabase = createClient()
  const { data } = await (supabase.from('curricula') as any)
    .select('lesson_cache')
    .eq('id', curriculumId)
    .single()
  if (!data) return null
  const cache = data.lesson_cache || {}
  return cache[lessonKey] || null
}

export async function cacheLesson(curriculumId: string, lessonKey: string, lessonData: any) {
  const supabase = createClient()
  const { data } = await (supabase.from('curricula') as any)
    .select('lesson_cache')
    .eq('id', curriculumId)
    .single()
  const cache = data?.lesson_cache || {}
  cache[lessonKey] = lessonData
  await (supabase.from('curricula') as any)
    .update({ lesson_cache: cache, updated_at: new Date().toISOString() })
    .eq('id', curriculumId)
}

export async function loadStreak(userId: string) {
  const supabase = createClient()
  const { data } = await (supabase.from('streaks') as any)
    .select('*')
    .eq('user_id', userId)
    .single()
  return data || { current_streak: 0, longest_streak: 0, last_active: null }
}

export async function updateStreak(userId: string) {
  const supabase = createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data: existing } = await (supabase.from('streaks') as any)
    .select('*')
    .eq('user_id', userId)
    .single()
  if (!existing) {
    await (supabase.from('streaks') as any).insert({
      user_id: userId,
      current_streak: 1,
      longest_streak: 1,
      last_active: today,
      updated_at: new Date().toISOString(),
    })
    return 1
  }
  const last = existing.last_active
  if (last === today) return existing.current_streak
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const isConsecutive = last === yesterday
  const newStreak = isConsecutive ? existing.current_streak + 1 : 1
  const newLongest = Math.max(newStreak, existing.longest_streak || 0)
  await (supabase.from('streaks') as any)
    .update({ current_streak: newStreak, longest_streak: newLongest, last_active: today, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
  await (supabase.from('profiles') as any)
    .update({ streak: newStreak, last_study: today, updated_at: new Date().toISOString() })
    .eq('id', userId)
  return newStreak
}

export async function logActivity(userId: string, type: string, minutes: number) {
  const supabase = createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data: existing } = await (supabase.from('activity') as any)
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single()
  if (existing) {
    const acts = existing.acts || {}
    acts[type] = (acts[type] || 0) + minutes
    await (supabase.from('activity') as any)
      .update({ count: existing.count + minutes, acts, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
  } else {
    await (supabase.from('activity') as any).insert({
      id: crypto.randomUUID(),
      user_id: userId,
      date: today,
      count: minutes,
      acts: { [type]: minutes },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }
}

export async function loadWeekActivity(userId: string): Promise<number[]> {
  const supabase = createClient()
  const days: number[] = []
  const today = new Date()
  for (let i=6; i>=0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const { data } = await (supabase.from('activity') as any)
      .select('count')
      .eq('user_id', userId)
      .eq('date', dateStr)
      .single()
    days.push(data?.count || 0)
  }
  return days
}