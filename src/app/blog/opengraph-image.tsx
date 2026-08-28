import { buildOgImage, OG_IMAGE_SIZE } from '@/lib/og/og-image'
import { title, description } from './page'

export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return buildOgImage({ title, description })
}
