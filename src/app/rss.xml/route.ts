import dayjs from 'dayjs'
import RSS from 'rss'
import { allPosts } from '@/content'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/site'

export function GET() {
  const posts = allPosts
    .filter((post) => !post.hidden)
    .sort((a, b) => dayjs(b.publishedAt).unix() - dayjs(a.publishedAt).unix())

  const feed = new RSS({
    title: `${SITE_NAME}'s blog`,
    description: SITE_DESCRIPTION,
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: `${SITE_URL}/blog`,
    image_url: `${SITE_URL}/apple-icon.png`,
    language: 'en',
    pubDate: posts[0]?.publishedAt,
    ttl: 1440,
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${SITE_URL}/blog/${post.slug}`,
      date: post.publishedAt,
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
