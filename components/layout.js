import Head from 'next/head'
import PropTypes from 'prop-types'
import Footer from '@/components/navigation/footer'
import Header from '@/components/navigation/header'
import { Box, Container } from '@chakra-ui/react'

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
      <Box>
        <Header />
        <Box as="main">
          <Container py={8} maxWidth="4xl">
            {children}
          </Container>
        </Box>
        <Footer />
      </Box>
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
