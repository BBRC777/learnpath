// lib/db.ts — Learnpath database helpers (Supabase)

import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ── LEVEL CONFIG ──────────────────────────────────────────────
export const LEVELS = [
  { level: 1, title: 'Beginner', minXP: 0,    maxXP: 199,      color: '#6b7280' },
  { level: 2, title: 'Scholar',  minXP: 200,  maxXP: 599,      color: '#d4853a' },
  { level: 3, title: 'Expert',   minXP: 600,  maxXP: 1199,     color: '#7c3aed' },
  { level: 4, title: 'Master',   minXP: 1200, maxXP: Infinity,  color: '#d97706' },
] as const
export type LevelInfo = (typeof LEVELS)[number]

export const XP_REWARDS = {
  lesson_complete:   25,
  flashcard_session: 15,
  quiz_perfect:      30,
  quiz_pass:         20,
  streak_bonus:      10,
  article_read:      10,
} as const
export type XPRewardKey = keyof typeof XP_REWARDS

export interface LevelUpResult {
  newXP: number; newLevel: number; leveledUp: boolean
  levelInfo: LevelInfo; xpToNextLevel: number | null
}

// ── LEVEL HELPERS ─────────────────────────────────────────────
export function xpToLevel(xp: number): number {
  if (xp >= 1200) return 4
  if (xp >= 600)  return 3
  if (xp >= 200)  return 2
  return 1
}
export function getLevelInfo(xp: number): LevelInfo {
  return LEVELS.find(l => l.level === xpToLevel(xp))!
}
export function xpProgress(xp: number): number {
  const info = getLevelInfo(xp)
  if (info.level === 4) return 1
  return Math.min((xp - info.minXP) / (info.maxXP - info.minXP + 1), 1)
}
export function xpToNextLevel(xp: number): number | null {
  const info = getLevelInfo(xp)
  if (info.level === 4) return null
  return info.maxXP + 1 - xp
}

// ── CURRICULA ─────────────────────────────────────────────────
export async function saveCurriculum(userId: string, params: any) {
  const id = `curr_${Date.now()}_${Math.random().toString(36).slice(2,7)}`
  const { data, error } = await (supabase.from('curricula') as any).insert({
    id, user_id: userId, topic: params.topic, level: params.level,
    dur_label: params.durLabel, days: params.days, time: params.time,
    style: params.style, curriculum: params.curriculum, progress: {}, lesson_cache: {}
  }).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function loadCurricula(userId: string) {
  const { data, error } = await (supabase.from('curricula') as any)
    .select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export async function updateCurriculumProgress(curriculumId: string, progress: any) {
  const { error } = await (supabase.from('curricula') as any)
    .update({ progress, updated_at: new Date().toISOString() }).eq('id', curriculumId)
  if (error) throw new Error(error.message)
}

export async function getCachedLesson(curriculumId: string, lessonKey: string) {
  const { data, error } = await (supabase.from('curricula') as any)
    .select('lesson_cache').eq('id', curriculumId).single()
  if (error || !data) return null
  return data.lesson_cache?.[lessonKey] || null
}

export async function cacheLesson(curriculumId: string, lessonKey: string, lessonData: any) {
  const { data: curr } = await (supabase.from('curricula') as any)
    .select('lesson_cache').eq('id', curriculumId).single()
  const cache = curr?.lesson_cache || {}
  cache[lessonKey] = lessonData
  await (supabase.from('curricula') as any)
    .update({ lesson_cache: cache, updated_at: new Date().toISOString() }).eq('id', curriculumId)
}

export async function deleteCurriculum(curriculumId: string) {
  const { error } = await (supabase.from('curricula') as any).delete().eq('id', curriculumId)
  if (error) throw new Error(error.message)
}

// ── STREAKS ───────────────────────────────────────────────────
export async function loadStreak(userId: string) {
  const { data } = await (supabase.from('streaks') as any)
    .select('*').eq('user_id', userId).single()
  return data
}

export async function updateStreak(userId: string) {
  const today = new Date().toISOString().split('T')[0]
  const { data: existing } = await (supabase.from('streaks') as any)
    .select('*').eq('user_id', userId).single()
  const last = existing?.last_active
  const isToday = last === today
  const isYesterday = last === new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const newStreak = isToday ? existing.current_streak : isYesterday ? existing.current_streak + 1 : 1
  const longest = Math.max(newStreak, existing?.longest_streak || 0)
  await (supabase.from('streaks') as any).upsert({
    user_id: userId, current_streak: newStreak, longest_streak: longest,
    last_active: today, updated_at: new Date().toISOString()
  }, { onConflict: 'user_id' })
  await (supabase.from('profiles') as any).update({
    streak: newStreak, last_study: today, updated_at: new Date().toISOString()
  }).eq('id', userId)
}

// ── ACTIVITY ──────────────────────────────────────────────────
export async function logActivity(userId: string, type: string, minutes: number) {
  const today = new Date().toISOString().split('T')[0]
  const { data: existing } = await (supabase.from('activity') as any)
    .select('*').eq('user_id', userId).eq('date', today).single()
  if (existing) {
    await (supabase.from('activity') as any).update({
      count: existing.count + minutes,
      acts: [...(existing.acts || []), { type, minutes, at: new Date().toISOString() }]
    }).eq('id', existing.id)
  } else {
    await (supabase.from('activity') as any).insert({
      user_id: userId, date: today, count: minutes,
      acts: [{ type, minutes, at: new Date().toISOString() }]
    })
  }
}

export async function loadWeekActivity(userId: string): Promise<number[]> {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })
  const { data } = await (supabase.from('activity') as any)
    .select('date, count').eq('user_id', userId).in('date', days)
  return days.map(d => data?.find((r: any) => r.date === d)?.count || 0)
}

// ── XP ────────────────────────────────────────────────────────
export async function awardXP(
  activityType: XPRewardKey,
  opts?: { streak?: number; userId?: string }
): Promise<LevelUpResult | null> {
  const { data: { user } } = await supabase.auth.getUser()
  const uid = opts?.userId || user?.id
  if (!uid) return null

  let amount = XP_REWARDS[activityType]
  if (opts?.streak && opts.streak >= 3 && activityType === 'lesson_complete') {
    amount += XP_REWARDS.streak_bonus
  }

  const { data, error } = await (supabase as any)
    .rpc('award_lesson_xp', { p_user_id: uid, p_xp_amount: amount }).single()

  if (error) { console.error('[db] awardXP:', error.message); return null }

  const { new_xp, new_level, leveled_up } = data as any
  return {
    newXP: new_xp, newLevel: new_level, leveledUp: leveled_up,
    levelInfo: LEVELS.find(l => l.level === new_level)!,
    xpToNextLevel: xpToNextLevel(new_xp),
  }
}

export async function completeLessonAndAwardXP(
  curriculumId: string, lessonKey: string, streak: number
): Promise<LevelUpResult | null> {
  return awardXP('lesson_complete', { streak })
}
