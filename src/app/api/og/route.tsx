import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// TODO: Replace with specific static background image once available
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text')

  // Font loading
  const fontData = await fetch(new URL('./GoogleSansFlex_120pt-SemiBold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  )

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d2e8d4', // secondary-fixed
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #384b3c 2%, transparent 0%), radial-gradient(circle at 75px 75px, #384b3c 2%, transparent 0%)', // on-secondary-fixed-variant
        backgroundSize: '100px 100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontFamily: 'Google Sans Flex',
          fontSize: 108,
          color: '#0d1f13', // on-secondary-fixed
          whiteSpace: 'pre-wrap',
          padding: '120px',
          fontWeight: 600,
        }}
      >
        {text}
      </div>
    </div>,
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Google Sans Flex',
          data: fontData,
          style: 'normal',
          weight: 600,
        },
      ],
    },
  )
}
