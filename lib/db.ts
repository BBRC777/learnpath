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

// ── TYPES ─────────────────────────────────────────────────────
export interface Profile {
  id: string; email: string; display_name: string; is_pro: boolean
  xp: number; level: number; streak: number; last_study: string
  total_days: number; cards_reviewed: number; created_at: string; updated_at: string
}

export interface Flashcard {
  id: string
  user_id: string
  curriculum_id: string
  lesson_key: string
  front: string
  reading: string
  back: string
  example: string
  interval: number
  ease_factor: number
  repetitions: number
  last_reviewed: number | null
  created_at: string
}

// ── PROFILES ──────────────────────────────────────────────────
export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await (supabase.from('profiles') as any).select('*').eq('id', user.id).single()
  return data
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

export async function clearCachedLesson(curriculumId: string, lessonKey: string) {
  const { data: curr } = await (supabase.from('curricula') as any)
    .select('lesson_cache').eq('id', curriculumId).single()
  const cache = curr?.lesson_cache || {}
  delete cache[lessonKey]
  await (supabase.from('curricula') as any)
    .update({ lesson_cache: cache, updated_at: new Date().toISOString() }).eq('id', curriculumId)
}

export async function deleteCurriculum(curriculumId: string) {
  const { error } = await (supabase.from('curricula') as any).delete().eq('id', curriculumId)
  if (error) throw new Error(error.message)
}

// ── SHARE CURRICULUM ──────────────────────────────────────────
export async function shareCurriculum(curriculumId: string): Promise<string> {
  const shareId = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10)
  const { error } = await (supabase.from('curricula') as any)
    .update({ share_id: shareId, is_shared: true, updated_at: new Date().toISOString() })
    .eq('id', curriculumId)
  if (error) throw new Error(error.message)
  return shareId
}

export async function unshareCurriculum(curriculumId: string): Promise<void> {
  const { error } = await (supabase.from('curricula') as any)
    .update({ is_shared: false, updated_at: new Date().toISOString() })
    .eq('id', curriculumId)
  if (error) throw new Error(error.message)
}

export async function getSharedCurriculum(shareId: string) {
  const { data, error } = await (supabase.from('curricula') as any)
    .select('id, topic, level, dur_label, curriculum, progress')
    .eq('share_id', shareId)
    .eq('is_shared', true)
    .single()
  if (error || !data) return null
  return data
}

// ── LEADERBOARD ───────────────────────────────────────────────
export async function getLeaderboard(limit = 20) {
  const { data, error } = await (supabase.from('profiles') as any)
    .select('id, display_name, xp, level, streak, badges')
    .order('xp', { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return data || []
}

// ── FLASHCARDS ────────────────────────────────────────────────
export async function loadFlashcards(userId: string): Promise<Flashcard[]> {
  const { data, error } = await (supabase.from('flashcards') as any)
    .select('*').eq('user_id', userId).order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

export async function loadFlashcardsDueCount(userId: string): Promise<number> {
  const { data, error } = await (supabase.from('flashcards') as any)
    .select('id, interval, last_reviewed').eq('user_id', userId)
  if (error || !data) return 0
  const now = Date.now()
  return data.filter((c: any) => {
    if (!c.last_reviewed) return true
    const daysSince = Math.floor((now - c.last_reviewed) / 86400000)
    return daysSince >= c.interval
  }).length
}

export async function saveFlashcards(userId: string, curriculumId: string, lessonKey: string, vocab: any[]): Promise<number> {
  const { data: existing } = await (supabase.from('flashcards') as any)
    .select('id').eq('user_id', userId).eq('curriculum_id', curriculumId).eq('lesson_key', lessonKey)
  const existingIds = new Set((existing || []).map((c: any) => c.id))

  const cards = vocab
    .filter((v: any) => v.word && v.example)
    .map((v: any) => {
      const id = `fc_${curriculumId}_${lessonKey}_${v.word.replace(/\s+/g, '_').slice(0, 20)}`
      return {
        id,
        user_id: userId,
        curriculum_id: curriculumId,
        lesson_key: lessonKey,
        front: v.word,
        reading: v.reading || '',
        back: v.example || v.word,
        example: v.example || '',
        interval: 1,
        ease_factor: 2.5,
        repetitions: 0,
        last_reviewed: null,
      }
    })
    .filter((c: any) => !existingIds.has(c.id))

  if (cards.length === 0) return 0
  const { error } = await (supabase.from('flashcards') as any).insert(cards)
  if (error) throw new Error(error.message)
  return cards.length
}

export async function updateFlashcard(cardId: string, updates: {
  interval: number; ease_factor: number; repetitions: number; last_reviewed: number
}): Promise<void> {
  const { error } = await (supabase.from('flashcards') as any)
    .update(updates).eq('id', cardId)
  if (error) throw new Error(error.message)
}

// ── SM-2 ALGORITHM ────────────────────────────────────────────
export function sm2CalcNext(card: Flashcard, rating: number): { interval: number; ease_factor: number; repetitions: number } {
  const { interval, ease_factor, repetitions } = card
  if (rating === 1) return { interval: 1, ease_factor: Math.max(1.3, ease_factor - 0.2), repetitions: 0 }
  if (rating === 2) return { interval: Math.max(1, Math.round(interval * 1.2)), ease_factor: Math.max(1.3, ease_factor - 0.15), repetitions }
  if (rating === 3) {
    const n = repetitions === 0 ? 1 : repetitions === 1 ? 3 : Math.round(interval * ease_factor)
    return { interval: n, ease_factor, repetitions: repetitions + 1 }
  }
  const n = repetitions === 0 ? 4 : Math.round(interval * ease_factor * 1.3)
  return { interval: n, ease_factor: Math.min(2.5, ease_factor + 0.15), repetitions: repetitions + 1 }
}

export function isCardDue(card: Flashcard): boolean {
  if (!card.last_reviewed) return true
  const daysSince = Math.floor((Date.now() - card.last_reviewed) / 86400000)
  return daysSince >= card.interval
}

export function getCardState(card: Flashcard): 'new' | 'learning' | 'review' | 'overdue' {
  if (!card.last_reviewed) return 'new'
  if (card.repetitions === 0) return 'learning'
  const daysSince = Math.floor((Date.now() - card.last_reviewed) / 86400000)
  if (daysSince > card.interval) return 'overdue'
  return 'review'
}

export function intervalLabel(d: number): string {
  if (d <= 1) return '1d'
  if (d < 7) return `${d}d`
  if (d < 30) return `${Math.round(d / 7)}w`
  return `${Math.round(d / 30)}mo`
}

// ── STREAKS ───────────────────────────────────────────────────
export async function loadStreak(userId: string) {
  const { data } = await (supabase.from('streaks') as any)
    .select('*').eq('user_id', userId).single()
  return data
}

export async function updateStreak(userId: string) {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const { data: existing } = await (supabase.from('streaks') as any)
    .select('*').eq('user_id', userId).single()
  const { data: profile } = await (supabase.from('profiles') as any)
    .select('streak_freezes').eq('id', userId).single()
  const last = existing?.last_active
  const isToday = last === today
  const isYesterday = last === yesterday
  const freezes = profile?.streak_freezes ?? 0
  const missedDays = last ? Math.floor((Date.now() - new Date(last).getTime()) / 86400000) - 1 : 0
  const canFreeze = !isToday && !isYesterday && missedDays > 0 && freezes > 0
  const freezesToUse = canFreeze ? Math.min(missedDays, freezes) : 0
  let newStreak = isToday ? existing.current_streak : isYesterday ? existing.current_streak + 1 : canFreeze ? existing.current_streak + 1 : 1
  const longest = Math.max(newStreak, existing?.longest_streak || 0)
  await (supabase.from('streaks') as any).upsert({
    user_id: userId, current_streak: newStreak, longest_streak: longest,
    last_active: today, updated_at: new Date().toISOString()
  }, { onConflict: 'user_id' })
  await (supabase.from('profiles') as any).update({
    streak: newStreak, last_study: today, updated_at: new Date().toISOString(),
    ...(freezesToUse > 0 ? { streak_freezes: Math.max(0, freezes - freezesToUse) } : {})
  }).eq('id', userId)
}

export async function buyStreakFreeze(userId: string): Promise<{ success: boolean; message: string; freezes: number }> {
  const { data: profile } = await (supabase.from('profiles') as any)
    .select('xp, streak_freezes').eq('id', userId).single()
  if (!profile) return { success: false, message: 'Profile not found', freezes: 0 }
  const freezes = profile.streak_freezes ?? 0
  const xp = profile.xp ?? 0
  if (freezes >= 3) return { success: false, message: 'You already have the maximum 3 freezes', freezes }
  if (xp < 50) return { success: false, message: 'You need at least 50 XP to buy a freeze', freezes }
  const { data, error } = await (supabase as any).rpc('award_lesson_xp', { p_user_id: userId, p_xp_amount: -50 }).single()
  if (error) return { success: false, message: 'Failed to deduct XP', freezes }
  const newFreezes = freezes + 1
  await (supabase.from('profiles') as any).update({ streak_freezes: newFreezes, updated_at: new Date().toISOString() }).eq('id', userId)
  return { success: true, message: 'Freeze purchased!', freezes: newFreezes }
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

// ── BADGES ───────────────────────────────────────────────────
export const BADGES = [
  { id:'first_lesson',    label:'First Step',      desc:'Complete your first lesson',          icon:'🎯' },
  { id:'streak_3',        label:'On a Roll',        desc:'3 day streak',                        icon:'🔥' },
  { id:'streak_7',        label:'Week Warrior',     desc:'7 day streak',                        icon:'⚡' },
  { id:'streak_30',       label:'Unstoppable',      desc:'30 day streak',                       icon:'💎' },
  { id:'xp_50',           label:'Getting Started',  desc:'Earn 50 XP',                          icon:'⭐' },
  { id:'xp_200',          label:'Scholar',          desc:'Earn 200 XP',                         icon:'📚' },
  { id:'xp_600',          label:'Expert',           desc:'Earn 600 XP',                         icon:'🎓' },
  { id:'xp_1200',         label:'Master',           desc:'Earn 1200 XP',                        icon:'👑' },
  { id:'first_path',      label:'Pathfinder',       desc:'Complete your first learning path',   icon:'🗺️' },
  { id:'speed_learner',   label:'Speed Learner',    desc:'Complete 3 lessons in one day',       icon:'⚡' },
]

export async function checkAndAwardBadges(userId: string, context: {
  xp?: number; streak?: number; lessonsToday?: number; pathCompleted?: boolean
}): Promise<string[]> {
  const { data: profile } = await (supabase.from('profiles') as any)
    .select('badges, xp, streak').eq('id', userId).single()
  if (!profile) return []

  const existing: string[] = profile.badges || []
  const newBadges: string[] = []
  const xp     = context.xp     ?? profile.xp     ?? 0
  const streak = context.streak ?? profile.streak  ?? 0

  const check = (id: string, condition: boolean) => {
    if (condition && !existing.includes(id)) newBadges.push(id)
  }

  check('xp_50',        xp >= 50)
  check('xp_200',       xp >= 200)
  check('xp_600',       xp >= 600)
  check('xp_1200',      xp >= 1200)
  check('streak_3',     streak >= 3)
  check('streak_7',     streak >= 7)
  check('streak_30',    streak >= 30)
  check('first_path',   context.pathCompleted === true)
  check('speed_learner',( context.lessonsToday ?? 0) >= 3)

  if (newBadges.length > 0) {
    const updated = [...existing, ...newBadges]
    await (supabase.from('profiles') as any)
      .update({ badges: updated, updated_at: new Date().toISOString() })
      .eq('id', userId)
  }
  return newBadges
}

// ── XP ────────────────────────────────────────────────────────
export async function awardXP(
  activityType: XPRewardKey,
  opts?: { streak?: number; userId?: string }
): Promise<LevelUpResult | null> {
  const { data: { user } } = await supabase.auth.getUser()
  const uid = opts?.userId || user?.id
  console.log('[db] awardXP uid:', uid, 'type:', activityType)
  if (!uid) { console.error('[db] awardXP: no user'); return null }

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
  curriculumId: string, lessonKey: string, streak: number, userId?: string
): Promise<LevelUpResult | null> {
  try {
    const result = await awardXP('lesson_complete', { streak, userId })
    console.log('[db] completeLessonAndAwardXP result:', result)
    return result
  } catch(e) {
    console.error('[db] completeLessonAndAwardXP error:', e)
    return null
  }
}

// -- TEAMS ----------------------------------------------------------------

export async function createTeam(adminId: string, name: string) {
  const id = 'team_' + Math.random().toString(36).slice(2, 14)
  const { data, error } = await (supabase.from('teams') as any)
    .insert({ id, name, admin_id: adminId }).select().single()
  if (error) throw new Error(error.message)
  await (supabase.from('profiles') as any)
    .update({ team_id: id, is_team_admin: true, is_business: true, updated_at: new Date().toISOString() })
    .eq('id', adminId)
  return data
}

export async function getTeam(adminId: string) {
  const { data } = await (supabase.from('teams') as any)
    .select('*').eq('admin_id', adminId).single()
  return data
}

export async function getTeamMembers(teamId: string) {
  const { data, error } = await (supabase.from('team_members') as any)
    .select('*').eq('team_id', teamId).order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

export async function inviteMember(teamId: string, email: string, invitedBy: string) {
  const id = 'tm_' + Math.random().toString(36).slice(2, 14)
  const { data, error } = await (supabase.from('team_members') as any)
    .insert({ id, team_id: teamId, email, role: 'member', status: 'invited' })
    .select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function removeMember(memberId: string) {
  const { error } = await (supabase.from('team_members') as any)
    .delete().eq('id', memberId)
  if (error) throw new Error(error.message)
}

export async function createAssignment(teamId: string, curriculumId: string, assignedTo: string, assignedBy: string, dueDate?: string) {
  const id = 'asgn_' + Math.random().toString(36).slice(2, 14)
  const { data, error } = await (supabase.from('assignments') as any)
    .insert({ id, team_id: teamId, curriculum_id: curriculumId, assigned_to: assignedTo, assigned_by: assignedBy, due_date: dueDate || null })
    .select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function getAssignments(teamId: string) {
  const { data, error } = await (supabase.from('assignments') as any)
    .select('*').eq('team_id', teamId).order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export async function getMyAssignments(userId: string) {
  const { data, error } = await (supabase.from('assignments') as any)
    .select('*, curricula(id, topic, level, dur_label, curriculum, progress)')
    .eq('assigned_to', userId).order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export async function getMemberProgress(teamId: string) {
  const { data, error } = await (supabase.from('assignments') as any)
    .select('*, profiles(id, display_name, xp, streak), curricula(id, topic, curriculum, progress)')
    .eq('team_id', teamId)
  if (error) throw new Error(error.message)
  return data || []
}
