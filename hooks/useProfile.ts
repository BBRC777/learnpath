'use client'
// hooks/useProfile.ts
import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types/database'

export function useProfile(initial: Profile) {
  const [profile, setProfile] = useState<Profile>(initial)
  const supabase = createClient()

  const update = useCallback(async (fields: Partial<Profile>) => {
    const updated = { ...fields, updated_at: new Date().toISOString() }
    const { error } = await supabase
      .from('profiles') as any
      .update(updated)
      .eq('id', profile.id)
    if (!error) setProfile(p => ({ ...p, ...updated }))
    return !error
  }, [profile.id, supabase])

  // Call after a study session â€” increments streak and total_days
  const recordStudySession = useCallback(async (cardsReviewed = 0) => {
    const today = new Date().toISOString().split('T')[0]
    const lastStudy = profile.last_study
    const isNewDay = lastStudy !== today
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const isConsecutive = lastStudy === yesterday

    const newStreak = isNewDay ? (isConsecutive ? (profile.streak ?? 0) + 1 : 1) : (profile.streak ?? 0)
    const newTotalDays = isNewDay ? (profile.total_days ?? 0) + 1 : (profile.total_days ?? 0)
    const newCardsReviewed = (profile.cards_reviewed ?? 0) + cardsReviewed

    await update({
      streak: newStreak,
      last_study: today,
      total_days: newTotalDays,
      cards_reviewed: newCardsReviewed,
    })
  }, [profile, update])

  return { profile, update, recordStudySession }
}

