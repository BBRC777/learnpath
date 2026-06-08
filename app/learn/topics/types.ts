// app/learn/topics/types.ts
export interface DayEntry   { day: number; title: string; description: string; type: string; duration: string }
export interface WeekEntry  { week: number; theme: string; milestone: string; days: DayEntry[]; quizCount: number }
export interface Curriculum { title: string; subtitle: string; overview: string; totalWeeks: number; daysPerWeek: number; sessionTime: string; level: string; weeks: WeekEntry[] }
export interface TopicData  { meta: { title: string; description: string }; og: { title: string; description: string }; hero: { h1: string; sub: string }; benefits: { title: string; desc: string }[]; faq: { q: string; a: string }[]; curriculum: Curriculum }