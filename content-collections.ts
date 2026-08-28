import { Context, defineCollection, defineConfig, Meta } from '@content-collections/core'
import { z } from 'zod'
import { compileMDX } from '@content-collections/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getColor } from 'colorthief'
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

  let themeColor = document.themeColor
  if (!themeColor && document.image) {
    themeColor = (await extractColorFromImage(document.image)) ?? undefined
  }

  // Without a color, ThemeOverride keeps the site theme, so the variant stays unset too.
  let themeVariant = document.themeVariant ? VARIANT_MAP[document.themeVariant] : undefined
  if (themeVariant === undefined && themeColor) {
    themeVariant = Variant.TONAL_SPOT
  }

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

const caseStudies = defineCollection({
  name: 'caseStudies',
  directory: 'content/case-studies',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    overview: z.string(),
    stack: z.array(z.string()),
    role: z.string().optional(),
    image: z.string(),
    themeColor: z.string().optional(),
    themeVariant: z.enum(VARIANT_NAMES).optional(),
    content: z.string(),
    hidden: z.boolean().default(false),
  }),
  transform,
})

export default defineConfig({
  content: [posts, caseStudies],
})

async function extractColorFromImage(imagePath: string): Promise<string | null> {
  if (imagePath.startsWith('http') || imagePath.startsWith('/api/')) {
    return null
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    // colorthief v3 quantizes in OKLCH by default, so pin to rgb to match prior output
    const color = await getColor(fullPath, { colorSpace: 'rgb' })
    if (!color) return null
    const { r, g, b } = color.rgb()
    return hexFromArgb(argbFromRgb(r, g, b))
  } catch (error) {
    console.warn(`Failed to extract color from ${imagePath}:`, error)
    return null
  }
}
