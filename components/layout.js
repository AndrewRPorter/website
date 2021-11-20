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
      <div className="wrapper">{children}</div>
      <style jsx>{`
        .wrapper {
          max-width: 36rem;
          margin: 0 auto;
          padding: 1.5rem;
        }
      `}</style>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
        }
        :root {
          --site-color: royalblue;
          --divider-color: rgba(0, 0, 0, 0.4);
        }
        html {
          font: 100%/1.5 system-ui;
        }
        a {
          color: inherit;
          text-decoration-color: var(--divider-color);
          text-decoration-thickness: 2px;
        }
        a:hover {
          color: var(--site-color);
          text-decoration-color: currentcolor;
        }
        h1,
        p {
          margin-bottom: 1.5rem;
        }
        code {
          font-family: 'Menlo';
        }
      `}</style>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  title: PropTypes.string
}

Layout.defaultProps = {
  seoTitle: 'Andrew R. Porter',
  description: ''
}
