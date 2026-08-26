import { NextRequest } from 'next/server'
import { buildOgImage } from '@/lib/og/og-image'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text')
  const description = searchParams.get('description') ?? undefined

  return buildOgImage({ title: text, description })
}
