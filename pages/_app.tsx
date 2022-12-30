import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const TopOfPageButton = dynamic(() => import('@/components/top_of_page_button'))

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

export default function Application({ Component, pageProps }: AppProps) {
  const refScrollUp = useRef<HTMLDivElement>()

  const handleScrollUp = () => {
    refScrollUp.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Analytics />
      <ChakraProvider theme={extendTheme({ config })}>
        {/* TODO: look into providing a custom hook to fix this type error: https://stackoverflow.com/a/64151312/8168077.
        This is why we case the type here. */}
        <div ref={refScrollUp as React.RefObject<HTMLDivElement>}></div>
        <TopOfPageButton scrollUp={handleScrollUp} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
