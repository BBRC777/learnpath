// app/learn/topics/index.ts
// Single source of truth for /learn/[topic]. Add a category file, import it here,
// spread it into TOPICS, and it appears as live pages AND in the sitemap automatically.
export * from './types'
import type { TopicData } from './types'
import { coreTopics } from './core'
import { apTopics } from './ap'
import { highSchoolTopics } from './highschool'
import { collegeTopics } from './college'
import { skillsTopics } from './skills'
import { examTopics } from './exams'
import { programmingTopics } from './programming'
import { languageTopics } from './languages'

export const TOPICS: Record<string, TopicData> = {
  ...coreTopics,
  ...apTopics,
  ...highSchoolTopics,
  ...collegeTopics,
  ...skillsTopics,
  ...examTopics,
  ...programmingTopics,
  ...languageTopics,
}