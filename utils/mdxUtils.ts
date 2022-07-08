import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { SerializeOptions } from 'next-mdx-remote/dist/types'
import { MARKDOWN_PATH } from '@/utils/constants'

/**
 * Get MDX data from filename
 * @param {string} fileName JS file name
 * @returns mdxSource data
 */
export const getMDXDataFromFileName = async (
  fileName: string
): Promise<SerializeOptions> => {
  const markdownFileName = fileName.replace('.js', '.md')
  const markdownFilePath = path.join(MARKDOWN_PATH, markdownFileName)
  const source = fs.readFileSync(markdownFilePath)
  return serialize(source.toString())
}
