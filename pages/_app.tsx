import { useEffect, useState, useRef } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, IconButton } from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export default function Application({ Component, pageProps }: AppProps) {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const refScrollUp = useRef<HTMLDivElement>()

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)
  })

  const handleVisibleButton = () => {
    const position = window.pageYOffset
    if (position > 100) {
      return setShowScrollToTop(true)
    } else if (position < 100) {
      return setShowScrollToTop(false)
    }
  }

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ChakraProvider theme={extendTheme(config)}>
      <div ref={refScrollUp}></div>
      {showScrollToTop && (
        <IconButton
          position="fixed"
          bottom="8%"
          right="8%"
          onClick={handleScrollUp}
          aria-label="Go to top of page"
          icon={<ChevronUpIcon />}
        />
      )}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
