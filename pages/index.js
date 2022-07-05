import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import fs from 'fs'
import Layout from '@/components/layout'

export default function Home({ source }) {
  return (
    <Layout>
      <MDXRemote {...source} />
    </Layout>
  )
}

export async function getStaticProps() {
  const markdownPath = path.join('markdown', `index.md`)
  const source = fs.readFileSync(markdownPath)
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}
