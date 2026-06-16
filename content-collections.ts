import { Context, defineCollection, defineConfig, Meta } from '@content-collections/core'
import { z } from 'zod'
import { compileMDX } from '@content-collections/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
// @ts-expect-error - colorthief node version has no types
import { getColor } from 'colorthief/src/color-thief-node.js'
import path from 'path'
import { argbFromRgb, hexFromArgb, Variant } from '@evowizz/material-color-utilities-canary'


const VARIANT_MAP: Record<string, Variant> = {
  monochrome: Variant.MONOCHROME,
  neutral: Variant.NEUTRAL,
  tonal_spot: Variant.TONAL_SPOT,
  vibrant: Variant.VIBRANT,
  expressive: Variant.EXPRESSIVE,
  fidelity: Variant.FIDELITY,
  content: Variant.CONTENT,
  rainbow: Variant.RAINBOW,
  fruit_salad: Variant.FRUIT_SALAD,
}

type VariantName = keyof typeof VARIANT_MAP
const VARIANT_NAMES = Object.keys(VARIANT_MAP) as [VariantName, ...VariantName[]]

type TransformInput = {
  _meta: Meta
  content: string
  themeColor?: string
  themeVariant?: VariantName
  image?: string
}

async function transform<T extends TransformInput>(document: T, context: Context) {
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

  // Extract theme color from image if not explicitly set
  let themeColor = document.themeColor
  if (!themeColor && document.image) {
    themeColor = (await extractColorFromImage(document.image)) ?? undefined
  }

  // Convert variant name to Variant enum
  const themeVariant = document.themeVariant ? VARIANT_MAP[document.themeVariant] : undefined

  return {
    ...document,
    slug: document._meta.path,
    themeColor,
    themeVariant,
    mdx,
  }
}

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
    themeColor: z.string().optional(),
    themeVariant: z.enum(VARIANT_NAMES).optional(),
    hidden: z.boolean().default(false),
  }),
  transform,
})

const focus = defineCollection({
  name: 'focus',
  directory: 'content/focus',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    overview: z.string(),
    stack: z.array(z.string()),
    role: z.string().optional(),
    image: z.string().optional(),
    themeColor: z.string().optional(),
    themeVariant: z.enum(VARIANT_NAMES).optional(),
    content: z.string(),
    hidden: z.boolean().default(false),
  }),
  transform,
})

export default defineConfig({
  collections: [posts, focus],
})

async function extractColorFromImage(imagePath: string): Promise<string | null> {
  // Skip external URLs and API routes
  if (imagePath.startsWith('http') || imagePath.startsWith('/api/')) {
    return null
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    const [r, g, b] = await getColor(fullPath)
    return hexFromArgb(argbFromRgb(r, g, b))
  } catch (error) {
    console.warn(`Failed to extract color from ${imagePath}:`, error)
    return null
  }
}