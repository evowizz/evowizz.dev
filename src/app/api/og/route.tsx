import { NextRequest } from 'next/server'
import { buildOgImage } from '@/lib/og/og-image'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text')

  return buildOgImage({ title: text })
}
