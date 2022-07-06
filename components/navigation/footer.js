import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import Link from 'next/link'

export default function Footer() {
  return (
    <Box as="footer">
      <Box py={8} textAlign="center">
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          spacing={4}
          justify="center"
          align="center"
        >
          <Stack direction="row" spacing={10}>
            <Link href="/" passHref>
              <Text
                color={useColorModeValue('brand.600', 'gray.300')}
                textDecoration="underline"
                _hover={{
                  cursor: 'pointer'
                }}
              >
                Home
              </Text>
            </Link>
            <Link href="/blog" passHref>
              <Text
                color={useColorModeValue('brand.600', 'gray.300')}
                textDecoration="underline"
                _hover={{
                  cursor: 'pointer'
                }}
              >
                Blog
              </Text>
            </Link>
          </Stack>
        </Container>

        <Container as={Stack} maxW="6xl" py={4} spacing={4}>
          <Text
            fontSize="sm"
            color={useColorModeValue('brand.600', 'gray.300')}
          >
            © Andrew Porter - All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  )
}
