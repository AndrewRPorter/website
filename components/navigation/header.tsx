import { Box, Flex, IconButton, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box as="header">
      <Box px={{ base: 10, md: 16 }} py={8}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link href="/" passHref>
            <Image
              src="/programmer_icon.png"
              width={75}
              height={75}
              alt="programmer icon representing myself"
              priority
            />
          </Link>

          <Flex alignItems="center" justifyContent="center" gap={6}>
            <Text fontWeight="500" fontSize="md" color={useColorModeValue("gray.600", "white")}  _hover={{ color: useColorModeValue('blue.600', 'blue.200') }}>
              <Link href="/">Home</Link>
            </Text>
            <Text fontWeight="500" fontSize="md"  color={useColorModeValue("gray.600", "white")} _hover={{ color: useColorModeValue('blue.600', 'blue.200') }}>
              <Link href="/blog">Blog</Link>
            </Text>
            <IconButton
              onClick={toggleColorMode}
              aria-label={
                colorMode === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              }
              background="none"
              _hover={{ background: 'none', color: useColorModeValue('blue.600', 'blue.200') }}
              color={useColorModeValue("gray.600", "white")}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              size="lg"
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
