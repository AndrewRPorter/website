import { Box, Text, Heading } from '@chakra-ui/react'
import Layout from '@/components/layout'

export default function Custom404() {
  return (
    <Layout seoTitle="Blog | Andrew Porter">
      <Box p="16px">
        <Heading as="h1" fontSize="4xl" py="16px">
          Page not found
        </Heading>
        <Text>
          Looks like you are searching for a page that does not exist. Sorry
          about that.
        </Text>
      </Box>
    </Layout>
  )
}
