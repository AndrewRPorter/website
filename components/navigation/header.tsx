import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box as="header">
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box>
            <Link href="/">Home</Link>
          </Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
