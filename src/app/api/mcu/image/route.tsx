import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
import { parsePaletteRequest, requestPalette } from '@/lib/mcu'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const paletteRequest = parsePaletteRequest(params)

  if (!paletteRequest) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }

  const palette = requestPalette(paletteRequest)
  const labels = params.has('labels') && !paletteRequest.full

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'black',
      }}
    >
      {Object.entries(palette).map(([key, value]) => (
        <div
          key={key}
          style={{
            backgroundColor: value,
            flex: '1 1 0%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {labels && (
            <span
              style={{
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                textShadow: '0 0 4px black',
              }}
            >
              {key}
            </span>
          )}

          {paletteRequest.full && key === '500' && (
            <span
              style={{
                color: 'white',
                fontSize: '1rem',
                textAlign: 'center',
                textShadow: '0 0 4px black',
              }}
            >
              +
            </span>
          )}
        </div>
      ))}
    </div>,
    {
      width: 1920,
      height: 1080,
    },
  )
}
