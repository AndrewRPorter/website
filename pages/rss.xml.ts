import { GetServerSideProps } from 'next'
import path from 'path'

import { getDataFromFilePath } from '@/utils/grayMatterUtils'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/constants'
import { MarkdownDataInterface } from '@/utils/types'

function generateRSS(fileData: MarkdownDataInterface[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
    <title>Andrew R. Porter blog posts</title>
    <link>https://www.andrewrporter.com</link>
    <atom:link href="https://www.andrewrporter.com/rss.xml" rel="self" type="application/rss+xml" />
    <description>I am a remote Software Engineer at GitHub on the billing team. I enjoy writing web applications with Python and Next.js. Forever learning how to write good code... When I'm not writing code, you can find me in the gym, snowboarding, or picking up random hobbies for short periods of time.</description>
        ${fileData
          .map((data) => {
            return `
            <item>
                <title>${data.title.replaceAll('&', '&amp;')}</title>
                <link>${data.path}</link>
                <description>${data.description}</description>
                <guid>${data.path}</guid>
                <pubDate>${new Date(data.datePublished).toUTCString()}</pubDate>
            </item>
            `
          })
          .join('')}
    </channel>
    </rss>
 `
}

function RSS() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allContent = blogPostFilePaths.map((filePath) => {
    const blogPostFilePath = path.join(BLOG_POST_PATH, filePath)
    const { data } = getDataFromFilePath(blogPostFilePath)
    return data
  })

  const rss = generateRSS(allContent as MarkdownDataInterface[])

  context.res.setHeader('Content-Type', 'text/xml')
  context.res.write(rss)
  context.res.end()

  return {
    props: {}
  }
}

export default RSS
