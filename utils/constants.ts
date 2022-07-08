import fs from 'fs'
import path from 'path'

export const MARKDOWN_PATH = path.join(process.cwd(), 'markdown')
export const BLOG_POST_PATH = path.join(MARKDOWN_PATH, 'blog')

// blogPostFilePaths is the list of all md files inside the BLOG_POST_PATH directory
export const blogPostFilePaths = fs
  .readdirSync(BLOG_POST_PATH)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path))
