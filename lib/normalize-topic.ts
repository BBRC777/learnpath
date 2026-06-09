// lib/normalize-topic.ts
// Single source of truth for turning a raw user query into a cache key.
//
// CRITICAL: the demo curriculum route writes demo_cache rows keyed by the output
// of this function. The topic-suggestions endpoint decides whether a topic is
// "cached" (= instant, ~free) by looking up that same key. If the two ever
// diverge, suggestions marked "instant" would miss the cache. Keep them on this
// one function.
//
//   "Teach me Python in 3 weeks, 20 min a day"    -> "python"
//   "I want to learn python 4 weeks 15 min a day" -> "python"
export function normalizeTopic(raw: string): string {
  let t = raw.toLowerCase().trim()
  t = t.replace(/^(please\s+)?(can you\s+)?(help me\s+)?(teach me|i want to learn|i wanna learn|i'd like to learn|learn|how to|study|master)\s+/i, "")
  t = t.replace(/\b(in\s+)?\d+\s*(weeks?|days?|months?)\b/g, "")
  t = t.replace(/\b\d+\s*(min(ute)?s?|hours?|hrs?)\b(\s*(a|per)\s*day)?/g, "")
  t = t.replace(/\b(a|per)\s+day\b/g, "")
  t = t.replace(/[.,;:!?]+/g, " ").replace(/\s+/g, " ").trim()
  return t
}