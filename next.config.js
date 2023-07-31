/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})


const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        port: '',
        // pathname: '/my-bucket/**',
      },
    ],
    experimental: {
      images: {
        allowFutureImage: true,
      },
    },
  },
})

module.exports = nextConfig
