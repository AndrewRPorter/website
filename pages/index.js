import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Layout from '../components/layout'

export default function Home({ source }) {
  return (
    <Layout>
      <MDXRemote {...source} />
    </Layout>
  )
}

export async function getStaticProps() {
  const source = `
  # Hi, my name is Andrew Porter

  I'm a Software Engineer at Wayfair supporting our international expansion efforts.

  I enjoy writing web applications. Besides writing code, I like working out, investing, playing golf and cooking.

  <br />

  <span>
  <a href="https://github.com/AndrewRPorter" target="_blank">GitHub</a>
  {' - '}
  <a href="https://www.linkedin.com/in/andrew-porter/" target="_blank">LinkedIn</a>
  </span>
  `
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}
