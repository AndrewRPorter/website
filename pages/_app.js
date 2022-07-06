import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export default function Application({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendTheme(config)}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
