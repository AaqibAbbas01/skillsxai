/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core', 'puppeteer'],
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/courses/qa-automation',
        destination: '/professionals/courses/qa-automation',
        permanent: true,
      },
      {
        source: '/courses/data-analyst',
        destination: '/professionals/courses/data-analyst',
        permanent: true,
      },
      {
        source: '/courses/workflow-automation',
        destination: '/professionals/courses/workflow-automation',
        permanent: true,
      },
      {
        source: '/courses/digital-marketing',
        destination: '/professionals/courses/digital-marketing',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
