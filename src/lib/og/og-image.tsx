import { readFile } from 'node:fs/promises'
import { cacheLife } from 'next/cache'
import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/config/site'

export const OG_IMAGE_SIZE = { width: 1920, height: 1080 }

type OgImageContent = {
  title: string | null
  description?: string
}

export async function buildOgImage({ title, description }: OgImageContent) {
  const fontData = await getFont()

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '110px 120px',
        backgroundColor: '#f5f8f2', // surface
        backgroundImage: 'radial-gradient(circle at 32px 32px, rgba(13, 31, 19, 0.16) 6%, transparent 0%)', // on-surface at low opacity
        backgroundSize: '64px 64px',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontFamily: 'Google Sans Flex',
          fontSize: 44,
          color: '#3f4b41', // on-surface-variant
          fontWeight: 600,
        }}
      >
        evowizz.dev
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Google Sans Flex',
            fontSize: 108,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: '#0d1f13', // on-surface
            fontWeight: 600,
            whiteSpace: 'pre-wrap',
            textWrap: 'balance',
          }}
        >
          {title ?? SITE_NAME}
        </div>
        {description ? (
          <div
            style={{
              display: 'flex',
              marginTop: 36,
              fontFamily: 'Google Sans Flex',
              fontSize: 46,
              lineHeight: 1.4,
              color: '#3f4b41',
              fontWeight: 600,
              maxWidth: 1300,
              textWrap: 'balance',
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
    </div>,
    {
      ...OG_IMAGE_SIZE,
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

async function getFont(): Promise<ArrayBuffer> {
  'use cache'
  cacheLife('max')

  // Node's fetch rejects file URLs, so the font is read from disk instead.
  const file = await readFile(new URL('./GoogleSansFlex_120pt-SemiBold.ttf', import.meta.url))
  // Copy out of Node's shared buffer pool into an exactly sized, cache-serializable ArrayBuffer.
  return new Uint8Array(file).buffer as ArrayBuffer
}
