import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import fs from 'fs'
import Layout from '@/components/layout'
import MDXWrapper from '@/components/mdx-wrapper'

export default function Home({ source }) {
  return (
    <Layout>
      <MDXWrapper {...source} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileName = path.basename(__filename)
  const markdownFileName = fileName.replace('.js', '.md')
  const markdownFilePath = path.join('markdown', markdownFileName)
  const source = fs.readFileSync(markdownFilePath)
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}
