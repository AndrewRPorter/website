import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Link as ChakraLink,
  IconButton
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaRss } from 'react-icons/fa'

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

            <ChakraLink
              href="https://github.com/AndrewRPorter/website"
              target="_blank"
            >
              <Text
                textDecoration="underline"
                color={useColorModeValue('brand.600', 'gray.300')}
                _hover={{
                  cursor: 'pointer'
                }}
              >
                Source
              </Text>
            </ChakraLink>
          </Stack>
        </Container>

        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          spacing={4}
          direction="row"
          justify="center"
          align="center"
        >
          <IconButton
            as="a"
            href="https://github.com/AndrewRPorter"
            aria-label="GitHub"
            target="_blank"
            background="none"
            icon={<FaGithub />}
            size="lg"
          />
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/andrew-porter"
            aria-label="LinkedIn"
            target="_blank"
            background="none"
            icon={<FaLinkedin />}
            size="lg"
          />
          <IconButton
            as="a"
            href="/rss.xml"
            aria-label="RSS feed"
            target="_blank"
            background="none"
            icon={<FaRss />}
            size="lg"
          />
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
