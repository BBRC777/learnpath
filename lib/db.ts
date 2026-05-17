// lib/db.ts  —  Learnpath database helpers (Supabase)
// Sprint 2: XP & level-up system added

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─────────────────────────────────────────────────────────────
// LEVEL CONFIG
// Keep in sync with the xp_to_level() SQL function in Supabase.
// ─────────────────────────────────────────────────────────────

export const LEVELS = [
  { level: 1, title: 'Beginner',  minXP: 0,    maxXP: 199,  color: '#6b7280' },
  { level: 2, title: 'Scholar',   minXP: 200,  maxXP: 599,  color: '#d4853a' },
  { level: 3, title: 'Expert',    minXP: 600,  maxXP: 1199, color: '#7c3aed' },
  { level: 4, title: 'Master',    minXP: 1200, maxXP: Infinity, color: '#d97706' },
] as const

export type LevelInfo = (typeof LEVELS)[number]

/** XP awarded per activity type */
export const XP_REWARDS = {
  lesson_complete:    25,
  flashcard_session:  15,
  quiz_perfect:       30,
  quiz_pass:          20,
  streak_bonus:       10,   // awarded on top when streak ≥ 3
  article_read:       10,
} as const

export type XPRewardKey = keyof typeof XP_REWARDS

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface Profile {
  id: string
  email: string
  is_pro: boolean
  xp: number
  level: number
  streak: number
  created_at: string
  updated_at: string
}

export interface LevelUpResult {
  newXP: number
  newLevel: number
  leveledUp: boolean
  levelInfo: LevelInfo
  xpToNextLevel: number | null  // null if already Master
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/** Compute level from total XP (client-side mirror of SQL function) */
export function xpToLevel(xp: number): number {
  if (xp >= 1200) return 4
  if (xp >= 600)  return 3
  if (xp >= 200)  return 2
  return 1
}

/** Get full level metadata for a given XP total */
export function getLevelInfo(xp: number): LevelInfo {
  const level = xpToLevel(xp)
  return LEVELS.find(l => l.level === level)!
}

/**
 * Progress through the current level, 0–1.
 * Used to drive the XP progress bar.
 */
export function xpProgress(xp: number): number {
  const info = getLevelInfo(xp)
  if (info.level === 4) return 1  // Master — bar always full
  const range = info.maxXP - info.minXP + 1
  const earned = xp - info.minXP
  return Math.min(earned / range, 1)
}

/** XP remaining to reach the next level (null if already Master) */
export function xpToNextLevel(xp: number): number | null {
  const info = getLevelInfo(xp)
  if (info.level === 4) return null
  return info.maxXP + 1 - xp
}

// ─────────────────────────────────────────────────────────────
// DATABASE: PROFILES
// ─────────────────────────────────────────────────────────────

/** Fetch the current user's profile */
export async function getProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) { console.error('[db] getProfile:', error.message); return null }
  return data as Profile
}

// ─────────────────────────────────────────────────────────────
// DATABASE: XP & LEVEL-UPS
// ─────────────────────────────────────────────────────────────

/**
 * Award XP to the current user via the Supabase RPC.
 * Call this whenever a lesson (or other activity) is marked complete.
 *
 * Returns full level-up metadata so the UI can show a celebration modal.
 *
 * @example
 *   const result = await awardXP('lesson_complete', { streak: profile.streak })
 *   if (result?.leveledUp) showLevelUpModal(result)
 */
export async function awardXP(
  activityType: XPRewardKey,
  opts?: { streak?: number }
): Promise<LevelUpResult | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  let amount = XP_REWARDS[activityType]

  // Streak bonus — adds on top if user has a 3+ day streak
  if (opts?.streak && opts.streak >= 3 && activityType === 'lesson_complete') {
    amount += XP_REWARDS.streak_bonus
  }

  const { data, error } = await supabase
    .rpc('award_lesson_xp', {
      p_user_id:   user.id,
      p_xp_amount: amount,
    })
    .single()

  if (error) {
    console.error('[db] awardXP:', error.message)
    return null
  }

  const { new_xp, new_level, leveled_up } = data as {
    new_xp: number
    new_level: number
    leveled_up: boolean
  }

  return {
    newXP:        new_xp,
    newLevel:     new_level,
    leveledUp:    leveled_up,
    levelInfo:    LEVELS.find(l => l.level === new_level)!,
    xpToNextLevel: xpToNextLevel(new_xp),
  }
}

// ─────────────────────────────────────────────────────────────
// DATABASE: CURRICULA
// ─────────────────────────────────────────────────────────────

/** Mark a lesson complete and award XP in a single call */
export async function completeLessonAndAwardXP(
  curriculumId: string,
  lessonKey: string,   // e.g. "week_0_day_2"
  streak: number
): Promise<LevelUpResult | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // 1. Mark lesson complete in activity table
  const { error: actErr } = await supabase
    .from('activity')
    .upsert({
      user_id:       user.id,
      curriculum_id: curriculumId,
      lesson_key:    lessonKey,
      completed_at:  new Date().toISOString(),
    }, { onConflict: 'user_id,curriculum_id,lesson_key' })

  if (actErr) console.error('[db] completeLessonAndAwardXP (activity):', actErr.message)

  // 2. Award XP
  return awardXP('lesson_complete', { streak })
}