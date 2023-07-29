/** @type {import('next').NextConfig} */
const config = {
    // your Next.js configuration
    experimental: {
        serverActions: true,
    },
}

module.exports =
    process.env.ANALYZE === 'true'
        ? require('@next/bundle-analyzer')({
              enabled: process.env.ANALYZE === 'true',
          })(config)
        : config
