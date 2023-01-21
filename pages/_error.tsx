import { Box, Text, Heading } from '@chakra-ui/react'
import Layout from '@/components/layout'

interface Props {
  statusCode: number
}

export default function Error({ statusCode }: Props) {
  return (
    <Layout seoTitle="Blog | Andrew Porter">
      <Box p="16px">
        <Heading as="h1" fontSize="4xl" py="16px">
          An unexpected error occurred ({statusCode})
        </Heading>
        <Text>It&apos;s not you, it&apos;s me.</Text>
      </Box>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
