import { GetStaticProps } from 'next'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Text,
  Heading,
  Divider,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/constants'
import { getDataFromFilePath } from '@/utils/grayMatterUtils'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'

// TODO: create shared props for these front matter values
type Props = {
  allContent: {
    title: string
    description: string
    datePublished: string
    ogImagePath: string
    ogImageAlt: string
    path: string
  }[]
}

export default function Blog(props: Props) {
  const router = useRouter()
  const locale = router.locale

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
      <Box p="16px">
        <Heading as="h1" fontSize="4xl" py="16px">
          Blog Posts
        </Heading>
        {sortedContent.map((content) => {
          return (
            <Box key={content.title}>
              <Box p="16px">
                <Divider />
              </Box>

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
                <Box py="16px">
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>{formatDate(content.datePublished)} by Andrew Porter</Text>
                  <Heading as="h2" fontSize="2xl">
                    {content.title}
                  </Heading>
                  <Text>{content.description}</Text>
                  <Link href={`/blog/${content.path}`}>
                    <Text
                      color={useColorModeValue('blue.600', 'blue.300')}
                      textDecoration="underline"
                      _hover={{ cursor: 'pointer' }}
                    >
                      Read more
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
  const allContent = blogPostFilePaths.map((filePath) => {
    const blogPostFilePath = path.join(BLOG_POST_PATH, filePath)
    const { data } = getDataFromFilePath(blogPostFilePath)
    return data
  })

  return { props: { allContent } }
}
