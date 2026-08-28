import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  agentRules: false,
  cacheComponents: true,
  serverExternalPackages: ['shiki'],

  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/api/placeholder/**',
      },
      {
        pathname: '/content/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },
    ],
  },

  async redirects() {
    return [
      redirect('/experiments/inware/privacy_policy', '/inware/privacy_policy'),
      redirect('/inware/privacy_policy.html', '/inware/2022/privacy_policy', false),
      redirect('/inware/privacy_policy', '/inware/2022/privacy_policy', false),
    ]
  },

  async rewrites() {
    return [
      rewrite('/inware/2022/privacy_policy', '/inware/2022/privacy_policy.html'),
      rewrite('/inware/2026/privacy_policy', '/inware/2026/privacy_policy.html'),
    ]
  },

  async headers() {
    return [
      {
        source: '/inware/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

function redirect(source: string, destination: string, permanent: boolean = true) {
  return { source, destination, permanent }
}

function rewrite(source: string, destination: string) {
  return { source, destination }
}

const isProduction = process.env.NODE_ENV === 'production'
const hasVercelToolbar = process.env.VERCEL_ENV === 'preview'

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProduction ? '' : " 'unsafe-eval'"} https://cdn.vercel-insights.com https://va.vercel-scripts.com${hasVercelToolbar ? ' https://vercel.live' : ''}`,
  `style-src 'self' 'unsafe-inline'${hasVercelToolbar ? ' https://vercel.live' : ''}`,
  "img-src 'self' blob: data: https://pbs.twimg.com https://abs.twimg.com",
  "media-src 'self'",
  `connect-src 'self' https://*.vercel-insights.com${isProduction ? '' : ' ws://localhost:* http://localhost:*'}${hasVercelToolbar ? ' https://vercel.live wss://ws-us3.pusher.com' : ''}`,
  "font-src 'self'",
  `frame-src ${hasVercelToolbar ? 'https://vercel.live' : "'none'"}`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isProduction ? ['upgrade-insecure-requests'] : []),
].join('; ')

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

export default withContentCollections(nextConfig)
