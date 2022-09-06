import fs from 'fs'
import matter from 'gray-matter'

/**
 * Helper function to get data grey matter data from a markdown file.
 * @param {string} filePath path to blog post markdown
 * @returns gray matter object data
 */
export const getDataFromFilePath = (filePath: string) => {
  const source = fs.readFileSync(filePath)
  return matter(source)
}
