// app/learn/topics/index.ts
// Single source of truth for /learn/[topic]. Add a category file, import it here,
// spread it into TOPICS, and it appears as live pages AND in the sitemap automatically.
export * from './types'
import type { TopicData } from './types'
import { coreTopics } from './core'
import { apTopics } from './ap'

export const TOPICS: Record<string, TopicData> = {
  ...coreTopics,
  ...apTopics,
}