import Head from 'next/head'
import Footer from '@/components/navigation/footer'
import Header from '@/components/navigation/header'
import { Box, Container } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  seoTitle?: string
  description?: string
  ogImage?: string
}

const DEFAULT_SEO_TITLE = 'Andrew Porter - Software Engineer'
const DEFAULT_SEO_DESCRIPTION = "Andrew Porter's personal website and blog."
const DEFAULT_OG_IMAGE = '/programmer_icon.png'

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta
          property="og:image"
          content={props.ogImage ? props.ogImage : DEFAULT_OG_IMAGE}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        ></meta>
        <meta
          name="description"
          content={
            props.description ? props.description : DEFAULT_SEO_DESCRIPTION
          }
        ></meta>
        <meta
          property="og:title"
          content={props.seoTitle ? props.seoTitle : DEFAULT_SEO_TITLE}
        />
        <title>{props.seoTitle ? props.seoTitle : DEFAULT_SEO_TITLE}</title>
      </Head>
      <Box>
        <Header />
        <Box as="main">
          <Container py={8} maxWidth="4xl">
            {props.children}
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  )
}
