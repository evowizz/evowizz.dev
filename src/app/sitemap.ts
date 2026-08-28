import type { MetadataRoute } from 'next'
import { allCaseStudies, allPosts } from '@/content'
import { DESTINATIONS, SITE_URL } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const destinations: MetadataRoute.Sitemap = DESTINATIONS.map((destination) => ({
    url: new URL(destination.path, SITE_URL).toString(),
  }))

  const posts: MetadataRoute.Sitemap = allPosts
    .filter((post) => !post.hidden)
    .map((post) => ({
      url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
      lastModified: post.publishedAt,
    }))

  const caseStudies: MetadataRoute.Sitemap = allCaseStudies
    .filter((caseStudy) => !caseStudy.hidden)
    .map((caseStudy) => ({
      url: new URL(`/case-studies/${caseStudy.slug}`, SITE_URL).toString(),
    }))

  return [...destinations, ...caseStudies, ...posts]
}
