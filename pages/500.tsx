import {
    Box,
    Text,
    Heading,
  } from '@chakra-ui/react'
import Layout from '@/components/layout'

export default function Custom404() {
    return (
        <Layout seoTitle="Blog | Andrew Porter">
            <Box p="16px">
                <Heading as="h1" fontSize="4xl" py="16px">
                An unexpected error occurred
                </Heading>
                <Text>It&apos;s not you, it&apos;s me.</Text>
            </Box>
        </Layout>
    )
}
