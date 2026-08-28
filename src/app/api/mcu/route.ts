import { NextRequest, NextResponse } from 'next/server'
import { parsePaletteRequest, requestPalette } from '@/lib/mcu'

export async function GET(request: NextRequest) {
  const palette = parsePaletteRequest(request.nextUrl.searchParams)

  if (!palette) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }

  return NextResponse.json(requestPalette(palette))
}
