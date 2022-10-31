import { GetStaticProps } from 'next'
import path from 'path'
import Layout from '@/components/layout'
import MDXWrapper from '@/components/mdx-wrapper'
import { getMDXDataFromFileName } from '@/utils/mdxUtils'
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types'

interface Props {
  mdxResult: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Home = (props: Props) => {
  return (
    <Layout>
      <MDXWrapper compiledSource={props.mdxResult.compiledSource} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // __filename here will end in .js as static pages are compiled to
  // .next/server/pages/filename.js. For example, this __filename is
  // ~/dev/personal/personal_website/.next/server/pages/index.js.
  const fileName = path.basename(__filename)
  const mdxSource = await getMDXDataFromFileName(fileName)
  return { props: { mdxResult: mdxSource } }
}

export default Home
