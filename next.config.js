/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3']
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif']
  }
}

module.exports = nextConfig