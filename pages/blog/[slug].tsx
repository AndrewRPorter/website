import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { blogPostFilePaths, BLOG_POST_PATH } from '@/utils/constants'
import Layout from '@/components/layout'
import rehypeHighlight from 'rehype-highlight'
import MDXWrapper from '@/components/mdx-wrapper'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import rehypeSlug from 'rehype-slug'

type Props = {
  source: any
  frontMatter: {
    title: string
    seoTitle: string
    description: string
    path: string
    datePublished: string
  }
}

export default function BlogPost(props: Props) {
  return (
    <Layout {...props.frontMatter}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{props.frontMatter.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <MDXWrapper {...props.source} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const postFilePath = path.join(BLOG_POST_PATH, `${slug}.md`)
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
      frontMatter: data
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
