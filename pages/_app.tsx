import { useEffect, useState, useRef } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import {
  ChakraProvider,
  extendTheme,
  IconButton,
  type ThemeConfig
} from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import * as ga from '@/lib/ga'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

export default function Application({ Component, pageProps }: AppProps) {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const refScrollUp = useRef<HTMLDivElement>()
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)
  })

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const handleVisibleButton = () => {
    const position = window.pageYOffset
    if (position > 100) {
      return setShowScrollToTop(true)
    } else if (position < 100) {
      return setShowScrollToTop(false)
    }
  }

  const handleScrollUp = () => {
    refScrollUp?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      <ChakraProvider theme={extendTheme({ config })}>
        {/* TODO: look into providing a custom hook to fix this type error: https://stackoverflow.com/a/64151312/8168077*/}
        <div ref={refScrollUp as React.RefObject<HTMLDivElement>}></div>
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
    </>
  )
}
