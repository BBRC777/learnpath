'use client'
import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useProfile(initial: any) {
  const [profile, setProfile] = useState<any>(initial)
  const supabase = createClient()

  const update = useCallback(async (fields: any) => {
    const updated = { ...fields, updated_at: new Date().toISOString() }
    const { error } = await (supabase.from('profiles') as any)
      .update(updated)
      .eq('id', profile.id)
    if (!error) setProfile((p: any) => ({ ...p, ...updated }))
    return !error
  }, [profile.id, supabase])

  const recordStudySession = useCallback(async (cardsReviewed = 0) => {
    const today = new Date().toISOString().split('T')[0]
    const lastStudy = profile.last_study
    const isNewDay = lastStudy !== today
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const isConsecutive = lastStudy === yesterday
    const newStreak = isNewDay ? (isConsecutive ? (profile.streak ?? 0) + 1 : 1) : (profile.streak ?? 0)
    const newTotalDays = isNewDay ? (profile.total_days ?? 0) + 1 : (profile.total_days ?? 0)
    const newCardsReviewed = (profile.cards_reviewed ?? 0) + cardsReviewed
    await update({ streak: newStreak, last_study: today, total_days: newTotalDays, cards_reviewed: newCardsReviewed })
  }, [profile, update])

  return { profile, update, recordStudySession }
}
