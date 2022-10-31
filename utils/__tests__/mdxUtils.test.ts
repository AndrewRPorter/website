import '@testing-library/jest-dom'
import fs from 'fs'
import { getMDXDataFromFileName } from '@/utils/mdxUtils'

describe('mdxUtils', () => {
  it('converts input JS file to associated markdown file', () => {
    const spy = jest.spyOn(fs, 'readFileSync')
    getMDXDataFromFileName('index.js')
    expect(spy).toHaveBeenCalledWith(
      '/Users/andrew/dev/personal/personal_website/markdown/index.md'
    )
  })
})
