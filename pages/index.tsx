import { GetStaticProps, NextPage } from 'next'
import path from 'path'
import Layout from '@/components/layout'
import MDXWrapper from '@/components/mdx-wrapper'
import { getMDXDataFromFileName } from '@/utils/mdxUtils'
import { SerializeOptions } from 'next-mdx-remote/dist/types'

const Home: NextPage = (props: SerializeOptions) => {
  return (
    <Layout>
      <MDXWrapper {...props} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const fileName = path.basename(__filename)
  const mdxSource = await getMDXDataFromFileName(fileName)
  return { props: mdxSource }
}

export default Home
