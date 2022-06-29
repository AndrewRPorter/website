import Head from 'next/head'
import PropTypes from 'prop-types'

export default function Layout({ children, seoTitle, description }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        ></meta>
        <meta name="description" content={description}></meta>
        <title>{seoTitle}</title>
      </Head>
      <>{children}</>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  title: PropTypes.string
}

Layout.defaultProps = {
  seoTitle: 'Andrew Porter',
  description: "Andrew Porter's personal website."
}
