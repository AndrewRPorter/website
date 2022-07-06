import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/mdxUtils'
import Layout from '@/components/layout'

export default function Blog({ allContent }) {
  return (
    <Layout seoTitle="Blog | Andrew Porter">
      {allContent.map((content) => {
        return (
          <div key={content.title}>
            <div>{content.title}</div>
            {content.description} {content.date_published}
            <Link href={`/blog/${content.path}`}>Read More</Link>
          </div>
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
