import fs from 'fs'
import path from 'path'

// POSTS_PATH is useful when you want to get the path to a specific file
export const BLOG_POST_PATH = path.join(process.cwd(), 'markdown/blog')

// postFilePaths is the list of all md files inside the POSTS_PATH directory
export const blogPostFilePaths = fs
  .readdirSync(BLOG_POST_PATH)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path))
