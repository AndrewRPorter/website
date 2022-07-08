import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MARKDOWN_PATH } from '@/utils/constants'

/**
 * Get MDX data from filename
 * @param {string} fileName JS file name
 * @returns mdxSource data
 */
export const getMDXDataFromFileName = async (fileName) => {
  const markdownFileName = fileName.replace('.js', '.md')
  const markdownFilePath = path.join(MARKDOWN_PATH, markdownFileName)
  const source = fs.readFileSync(markdownFilePath)
  const mdxSource = await serialize(source)
  return mdxSource
}
