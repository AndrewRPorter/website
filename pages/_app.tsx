import { useEffect, useState, useRef } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, Button } from '@chakra-ui/react'
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
        <Button
          position="fixed"
          bottom="8%"
          left="92%"
          onClick={handleScrollUp}
        >
          <ChevronUpIcon />
        </Button>
      )}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
