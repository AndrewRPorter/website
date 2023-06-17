import { GetServerSideProps } from 'next'
import path from 'path'

import { getDataFromFilePath } from '@/utils/grayMatterUtils'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/constants'
import { MarkdownDataInterface } from '@/utils/types'

function generateSiteMap(fileData: MarkdownDataInterface[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.andrewrporter.com</loc>
     </url>
     <url>
       <loc>https://www.andrewrporter.com/blog</loc>
     </url>
     ${fileData
       .map((data) => {
         return `
            <url>
                <loc>https://www.andrewrporter.com/blog/${data.path}</loc>
            </url>
          `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allContent = blogPostFilePaths.map((filePath) => {
    const blogPostFilePath = path.join(BLOG_POST_PATH, filePath)
    const { data } = getDataFromFilePath(blogPostFilePath)
    return data
  })

  const sitemap = generateSiteMap(allContent as MarkdownDataInterface[])

  context.res.setHeader('Content-Type', 'text/xml')
  context.res.write(sitemap)
  context.res.end()

  return {
    props: {}
  }
}

export default SiteMap
