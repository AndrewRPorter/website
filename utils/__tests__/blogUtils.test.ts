import {
  calculateReadingTime,
  numWords,
  AVG_WORDS_PER_MINUTE
} from '@/utils/blogUtils'

describe('blogUtils', () => {
  describe('calculateReadingTime', () => {
    it('calculates correct reading time', () => {
      const inputString = 'test '.repeat(AVG_WORDS_PER_MINUTE * 3).trim()
      const readingTime = calculateReadingTime(inputString)
      expect(readingTime).toBe(3)
    })

    it('rounds up reading time when not a whole number', () => {
      const inputString = 'test '.repeat(AVG_WORDS_PER_MINUTE - 1).trim()
      const readingTime = calculateReadingTime(inputString)
      expect(readingTime).toBe(1)
    })
  }),
    describe('numWords', () => {
      it('calculates number of words from a plain input string', () => {
        const inputString = 'test '.repeat(5).trim()
        const words = numWords(inputString)
        expect(words).toBe(5)
      })
    })
})
