import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import * as ga from '@/lib/ga'

const TopOfPageButton = dynamic(() => import('@/components/top_of_page_button'))

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

export default function Application({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const refScrollUp = useRef<HTMLDivElement>()

  const handleScrollUp = () => {
    refScrollUp.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
        {/* TODO: look into providing a custom hook to fix this type error: https://stackoverflow.com/a/64151312/8168077.
        This is why we case the type here. */}
        <div ref={refScrollUp as React.RefObject<HTMLDivElement>}></div>
        <TopOfPageButton scrollUp={handleScrollUp} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
