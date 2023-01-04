const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  async redirects() {
    return [
      {
        source: '/blog/alias_suggestion_script',
        destination: '/blog/identify_potential_aliases',
        permanent: true
      }
    ]
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
