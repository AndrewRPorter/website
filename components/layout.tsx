import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '@/components/navigation/header'
import { Box, Container } from '@chakra-ui/react'

const DynamicFooter = dynamic(() => import('@/components/navigation/footer'), {
  ssr: false
})

type Props = {
  children: React.ReactNode
  seoTitle?: string
  description?: string
  ogImagePath?: string
  keywords?: string[]
}

const DEFAULT_SEO_TITLE = 'Andrew Porter - Software Engineer'
const DEFAULT_SEO_DESCRIPTION = "Andrew Porter's personal website and blog."
const DEFAULT_OG_IMAGE = '/programmer_icon.png'
const DEFAULT_KEYWORDS = [
  'Andrew Porter',
  "Andrew Porter Blog",
  'Andrew Porter Software Engineer',
  'Andrew Porter Software Developer',
  "Software Development Blog",
  "Software Engineering Blog"
]

export default function Layout(props: Props) {
  const keywords = props.keywords ? props.keywords : DEFAULT_KEYWORDS

  return (
    <>
      <Head>
        <title>{props.seoTitle ? props.seoTitle : DEFAULT_SEO_TITLE}</title>

        <meta charSet="utf-8" />
        <meta name="author" content="Andrew Porter" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta
          name="description"
          content={
            props.description ? props.description : DEFAULT_SEO_DESCRIPTION
          }
        />
        <meta
          property="og:image"
          content={props.ogImagePath ? props.ogImagePath : DEFAULT_OG_IMAGE}
        />
        <meta
          property="og:title"
          content={props.seoTitle ? props.seoTitle : DEFAULT_SEO_TITLE}
        />
          <meta name="keywords" content={keywords.join(', ')} />
      </Head>
      <Box>
        <Header />
        <Box as="main">
          <Container py={3} maxWidth="4xl">
            {props.children}
          </Container>
        </Box>
        {/* Load footer dynamically to attempt to realize a perf gain  */}
        <DynamicFooter />
      </Box>
    </>
  )
}
