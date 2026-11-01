import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@dep/shared'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    typedRoutes: false,
  },
}

export default nextConfig
