import path from 'path'
import Link from 'next/link'
import {
  Box,
  Text,
  Heading,
  Divider,
  useColorModeValue
} from '@chakra-ui/react'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/constants'
import { getDataFromFilePath } from '@/utils/grayMatterUtils'
import Layout from '@/components/layout'

export default function Blog({ allContent }) {
  const sortedContent = allContent.sort((curr, compare) =>
    curr.datePublished > compare.datePublished ? -1 : 1
  )

  return (
    <Layout seoTitle="Blog | Andrew Porter">
      <Heading as="h1" fontSize="4xl" py="16px">
        Blog Posts
      </Heading>
      {sortedContent.map((content) => {
        return (
          <>
            <Box p="16px">
              <Divider />
            </Box>
            <Box key={content.title} py="16px">
              <Heading as="h2" fontSize="2xl">
                {content.title}
              </Heading>
              <Text>{content.description}</Text>
              <Text>{content.datePublished}</Text>
              <Link href={`/blog/${content.path}`}>
                <Text
                  color={useColorModeValue('blue.600', 'blue.300')}
                  textDecoration="underline"
                >
                  Read More
                </Text>
              </Link>
            </Box>
          </>
        )
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  const allContent = blogPostFilePaths.map((filePath) => {
    const blogPostFilePath = path.join(BLOG_POST_PATH, filePath)
    const { data } = getDataFromFilePath(blogPostFilePath)
    return data
  })

  return { props: { allContent } }
}
