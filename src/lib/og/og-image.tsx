/* eslint-disable @next/next/no-img-element */
// The img below is satori markup, never a DOM element.
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
  const background = await getBackground()
  const fontData = await getFont()

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
      }}
    >
      <img
        src={background}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '110px 120px',
          position: 'relative',
        }}
      >
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
              fontSize: 108,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              fontFamily: 'Google Sans Flex',
              color: '#0d1f13', // on-surface
              fontWeight: 600,
              whiteSpace: 'pre-wrap',
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
                color: '#3f4b41', // on-surface-variant
                fontWeight: 600,
                maxWidth: 1300,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
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

async function getBackground(): Promise<string> {
  'use cache'
  cacheLife('max')

  const file = await readFile(new URL('./background.png', import.meta.url))
  return `data:image/png;base64,${file.toString('base64')}`
}

async function getFont(): Promise<ArrayBuffer> {
  'use cache'
  cacheLife('max')

  // Node's fetch rejects file URLs, so the font is read from disk instead.
  const file = await readFile(new URL('./GoogleSansFlex_120pt-SemiBold.ttf', import.meta.url))
  // Copy out of Node's shared buffer pool into an exactly sized, cache-serializable ArrayBuffer.
  return new Uint8Array(file).buffer as ArrayBuffer
}
