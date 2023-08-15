import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/constants'
import Layout from '@/components/layout'
import rehypeHighlight from 'rehype-highlight'
import MDXWrapper from '@/components/mdx-wrapper'
import BlogMetaData from '@/components/blog/blog_meta_data'
import rehypeSlug from 'rehype-slug'
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types'

type Props = {
  source: MDXRemoteSerializeResult
  frontMatter: {
    title: string
    seoTitle: string
    description: string
    path: string
    ogImagePath: string
    datePublished: string
    keywords: string[]
  }
  markdownContent: string
}

export default function BlogPost(props: Props) {
  return (
    <Layout {...props.frontMatter}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/night-owl.min.css"
      />
      <BlogMetaData
        datePublished={props.frontMatter.datePublished}
        markdownContent={props.markdownContent}
        pageTitle={props.frontMatter.title}
      />
      <MDXWrapper {...props.source} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(BLOG_POST_PATH, `${params?.slug}.md`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight, rehypeSlug]
    }
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      markdownContent: source.toString()
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPostFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}
