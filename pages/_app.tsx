import { useEffect, useState, useRef } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ChakraProvider, extendTheme, IconButton } from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import * as ga from '@/lib/ga'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
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
    refScrollUp.current.scrollIntoView({ behavior: 'smooth' })
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
    </>
  )
}
