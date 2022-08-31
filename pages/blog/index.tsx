import { GetStaticProps } from 'next'
import path from 'path'
import Link from 'next/link'
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
import { Fragment } from 'react'
import { useRouter } from 'next/router'

type Props = {
  allContent: {
    title: string
    description: string
    datePublished: string
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
      weekday: 'long',
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
            <Fragment key={content.title}>
              <Box p="16px">
                <Divider />
              </Box>
              <Box py="16px">
                <Heading as="h2" fontSize="2xl">
                  {content.title}
                </Heading>
                <Text>{content.description}</Text>
                <Text>{formatDate(content.datePublished)}</Text>
                <Link href={`/blog/${content.path}`}>
                  <Text
                    color={useColorModeValue('blue.600', 'blue.300')}
                    textDecoration="underline"
                    _hover={{ cursor: 'pointer' }}
                  >
                    Read More
                  </Text>
                </Link>
              </Box>
            </Fragment>
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
