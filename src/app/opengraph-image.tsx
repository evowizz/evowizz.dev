import { SITE_DESCRIPTION, SITE_NAME } from '@/config/site'
import { buildOgImage, OG_IMAGE_SIZE } from '@/lib/og/og-image'

export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return buildOgImage({ title: SITE_NAME, description: SITE_DESCRIPTION })
}
