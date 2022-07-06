import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import { Box, Text, Heading, Divider } from '@chakra-ui/react'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/mdxUtils'
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
              <Link href={`/blog/${content.path}`}>Read More</Link>
            </Box>
          </>
        )
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  const allContent = []
  const filePaths = blogPostFilePaths

  for (const filePath of filePaths) {
    const blogPostFilePath = path.join(BLOG_POST_PATH, filePath)
    const source = fs.readFileSync(blogPostFilePath)

    const { data } = matter(source)
    allContent.push({ ...data, path: filePath.replace('.md', '') })
  }

  return { props: { allContent } }
}
