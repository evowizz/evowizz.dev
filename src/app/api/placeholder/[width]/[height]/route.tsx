import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ width: string; height: string }> }) {
  const { width, height } = await params
  const w = parseInt(width, 10)
  const h = parseInt(height, 10)

  // Validate and bound dimensions (min 1, max 4096 to prevent memory issues)
  const validW = Math.min(4096, Math.max(1, isNaN(w) ? 800 : w))
  const validH = Math.min(4096, Math.max(1, isNaN(h) ? 600 : h))

  const { searchParams } = new URL(request.url)
  const bgColor = searchParams.get('bgColor') || '#1f1f1f'

  return new ImageResponse(
    <StandardPlaceholder width={validW} height={validH} bgColor={bgColor} textColor={'#6b7280'} />,
    {
      width: validW,
      height: validH,
    },
  )
}

function StandardPlaceholder({
  width,
  height,
  bgColor,
  textColor,
}: {
  width: number
  height: number
  bgColor: string
  textColor: string
}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
      }}
    >
      <div
        style={{
          fontSize: 48,
          color: textColor,
          fontFamily: 'sans-serif',
        }}
      >
        {`${width} × ${height}`}
      </div>
    </div>
  )
}
