import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skillsxai.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/schools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/professionals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/professionals/courses/qa-automation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/professionals/courses/data-analyst`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/professionals/courses/workflow-automation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/professionals/courses/digital-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const blogSlugs = [
    { slug: 'complete-guide-playwright-automation-testing-2026', date: '2026-04-18' },
    { slug: 'playwright-vs-selenium-which-should-you-learn-2026', date: '2026-04-17' },
    { slug: 'how-to-become-data-analyst-india-complete-roadmap-2026', date: '2026-04-16' },
    { slug: 'playwright-vs-cypress-head-to-head-comparison-2026', date: '2026-04-15' },
    { slug: 'playwright-tutorial-beginners-write-first-test-30-minutes', date: '2026-04-14' },
    { slug: 'sql-for-data-analysts-20-queries-you-must-know', date: '2026-04-13' },
    { slug: 'qa-automation-tester-salary-india-2026-complete-breakdown', date: '2026-04-12' },
    { slug: 'data-analyst-interview-questions-answers-2026', date: '2026-04-11' },
    { slug: 'best-automation-testing-tools-2026-comparison-guide', date: '2026-04-10' },
    { slug: 'what-are-ai-agents-beginners-complete-guide', date: '2026-04-09' },
    { slug: 'n8n-automation-tutorial-build-first-workflow', date: '2026-04-08' },
    { slug: 'power-bi-vs-tableau-which-data-viz-tool-2026', date: '2026-04-07' },
    { slug: 'the-top-5-skills-you-need-for-the-ai-era', date: '2026-01-06' },
  ]

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
