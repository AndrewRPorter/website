import { GetStaticProps } from 'next'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Text,
  Heading,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/constants'
import { getDataFromFilePath } from '@/utils/grayMatterUtils'
import Layout from '@/components/layout'
import {ArrowForwardIcon} from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { MarkdownDataInterface } from '@/utils/types'

type Props = {
  allContent: MarkdownDataInterface[]
}

export default function Blog(props: Props) {
  const router = useRouter()
  const locale = router.locale

  const linkColor = useColorModeValue('blue.600', 'blue.300')
  const mutedTextColor = useColorModeValue('gray.600', 'gray.300')

  const sortedContent = props.allContent.sort((curr, compare) => {
    const parsedCurrentDate = Date.parse(curr.datePublished)
    const parsedCompareDate = Date.parse(compare.datePublished)
    return parsedCurrentDate > parsedCompareDate ? -1 : 1
  })

  /**
   * Parses and formats an input date string from grey-matter
   *
   * @param date input date string of form year-month-date
   * @returns formatted date string
   */
  const formatDate = (date: string): string => {
    return new Date(Date.parse(date)).toLocaleDateString(locale, {
      timeZone: "America/New_York",
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout seoTitle="Blog | Andrew Porter">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Blog</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box p={4}>
        <Heading as="h1" fontSize="4xl" py="16px" textAlign="center">
          Blog Posts
        </Heading>
        {sortedContent.map((content) => {
          return (
            <Box key={content.title}>
              <Box
                display="flex"
                alignItems={content.ogImagePath ? 'center' : 'start'}
              >
                {content.ogImagePath && (
                  <Box pr={4}>
                    <Image
                      src={content.ogImagePath}
                      width={100}
                      height={100}
                      alt={content.ogImageAlt}
                    />
                  </Box>
                )}
                <Box py="16px" display="flex" flexDirection="column" gap={3}>
                  <Heading as="h2" fontSize="2xl">
                    {content.title}
                  </Heading>
                  <Text fontSize="sm" color={mutedTextColor}>
                    {formatDate(content.datePublished)} by Andrew Porter
                  </Text>
                  <Text>{content.description}</Text>
                  <Link href={`/blog/${content.path}`}>
                    <Text
                      color={linkColor}
                      fontSize="lg"
                      fontWeight="bold"
                      textDecoration="underline"
                      _hover={{ cursor: 'pointer' }}
                    >
                      Read more <ArrowForwardIcon />
                    </Text>
                  </Link>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: can we get locale in here?
  const allContent = blogPostFilePaths.map((filePath) => {
    const blogPostFilePath = path.join(BLOG_POST_PATH, filePath)
    const { data } = getDataFromFilePath(blogPostFilePath)
    return data
  })

  return { props: { allContent } }
}
