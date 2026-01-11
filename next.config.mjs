import { withContentCollections } from '@content-collections/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/placeholder/**',
      },
      {
        pathname: '/content/**',
      },
    ],
  },
}

export default withContentCollections(nextConfig)
