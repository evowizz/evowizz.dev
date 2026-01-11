import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'
import { compileMDX } from '@content-collections/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    content: z.string(),
    image: z.string().optional(),
    hidden: z.boolean().default(false),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: {
              light: 'github-light',
              dark: 'dark-plus',
            },
            keepBackground: false,
          },
        ],
      ],
    })
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
