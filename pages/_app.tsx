import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={extendTheme(config)}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
