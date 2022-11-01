// Typically this is around 200-250 for non-technical articles
// but due to the nature of these articles we reduce the number.
export const AVG_WORDS_PER_MINUTE = 150

/**
 * Calculates the reading time for a given article.
 * @param markdownContent raw string content from a markdown blog post
 */
export const calculateReadingTime = (markdownContent: string) => {
  const words = numWords(markdownContent)
  return Math.ceil(words / AVG_WORDS_PER_MINUTE)
}

export const numWords = (inputString: string) => {
  return inputString.trim().split(/\s+/).length
}
