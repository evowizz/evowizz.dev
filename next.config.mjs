/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/placeholder/**',
      },
    ],
  },
}

export default nextConfig
