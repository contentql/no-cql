import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/public': ['./public/**/*'],
  },
  experimental: {
    reactCompiler: false,
  },
  output: 'standalone',
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     // Localhost: http://charan.localhost:3000/...
  //     {
  //       source: '/:path((?!admin|api).*)',
  //       destination: '/:tenant/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           // charan.localhost → tenant = charan
  //           value: '^(?<tenant>[^.]+)\\.localhost(:\\d+)?$',
  //         },
  //       ],
  //     },
  //     // Production: acme.example.com → tenant = acme
  //     {
  //       source: '/:path((?!admin|api).*)',
  //       destination: '/:tenant/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: '^(?<tenant>[^.]+)\\.example\\.com$',
  //         },
  //       ],
  //     },
  //   ]
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'pin-hcms.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'https://pub-ce94fe258c7740b3a579a329e72059e4.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
