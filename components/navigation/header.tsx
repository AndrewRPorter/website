import { Box, Flex, IconButton, Stack, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box as="header">
      <Box px={{ base: 8, md: 16 }} py={8}>
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

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <IconButton
                onClick={toggleColorMode}
                aria-label={
                  colorMode === 'light'
                    ? 'Switch to dark mode'
                    : 'Switch to light mode'
                }
                background="none"
                _hover={{ background: 'none' }}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                size="lg"
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
