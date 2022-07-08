import path from 'path'
import Layout from '@/components/layout'
import MDXWrapper from '@/components/mdx-wrapper'
import { getMDXDataFromFileName } from '@/utils/mdxUtils'

export default function Home({ source }) {
  return (
    <Layout>
      <MDXWrapper {...source} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileName = path.basename(__filename)
  const mdxSource = await getMDXDataFromFileName(fileName)
  return { props: { source: mdxSource } }
}
