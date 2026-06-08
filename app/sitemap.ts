import { MetadataRoute } from 'next'
import { TOPICS } from './learn/topics'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.learnpathnow.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const learnPages: MetadataRoute.Sitemap = Object.keys(TOPICS).map(slug => ({
    url: `${baseUrl}/learn/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticPages, ...learnPages]
}