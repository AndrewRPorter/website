import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaRss, FaStackOverflow } from 'react-icons/fa'

export default function Footer() {
  return (
    <Box as="footer">
      <Box py={8} textAlign="center">
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
            color={useColorModeValue('gray.600', 'white')}
            _hover={{
              background: 'none',
              color: useColorModeValue('blue.600', 'blue.200')
            }}
          />
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/andrew-porter"
            aria-label="LinkedIn"
            target="_blank"
            background="none"
            icon={<FaLinkedin />}
            size="lg"
            color={useColorModeValue('gray.600', 'white')}
            _hover={{
              background: 'none',
              color: useColorModeValue('blue.600', 'blue.200')
            }}
          />
          <IconButton
            as="a"
            href="https://stackoverflow.com/users/8168077/aporter1031"
            aria-label="Stock Overflow"
            target="_blank"
            background="none"
            icon={<FaStackOverflow />}
            size="lg"
            color={useColorModeValue('gray.600', 'white')}
            _hover={{
              background: 'none',
              color: useColorModeValue('blue.600', 'blue.200')
            }}
          />
          <IconButton
            as="a"
            href="/rss.xml"
            aria-label="RSS feed"
            target="_blank"
            background="none"
            icon={<FaRss />}
            size="lg"
            color={useColorModeValue('gray.600', 'white')}
            _hover={{
              background: 'none',
              color: useColorModeValue('blue.600', 'blue.200')
            }}
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
