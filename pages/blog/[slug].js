import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '@/utils/mdxUtils'
import Layout from '@/components/layout'
import PropTypes from 'prop-types'
import rehypeHighlight from 'rehype-highlight'
import MDXWrapper from '@/components/mdx-wrapper'

export default function BlogPost({ source, frontMatter }) {
  return (
    <Layout {...frontMatter}>
      <MDXWrapper {...source} />
    </Layout>
  )
}

BlogPost.propTypes = {
  source: PropTypes.object.isRequired,
  frontMatter: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    setoTitle: PropTypes.string,
    description: PropTypes.string,
    datePublished: PropTypes.string
  }).isRequired
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.md`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight]
    }
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}
