module.exports = {
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
