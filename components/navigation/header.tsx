import {
  Box,
  Flex,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
  useColorMode
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaHome } from 'react-icons/fa'
import Link from 'next/link'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box as="header">
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box>
            <Link href="/" passHref>
              <Button as="a" leftIcon={<FaHome />} aria-label="Go Home">
                Home
              </Button>
            </Link>
          </Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <IconButton
                onClick={toggleColorMode}
                aria-label={
                  colorMode === 'light'
                    ? 'Switch to dark mode'
                    : 'Switch to light mode'
                }
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
