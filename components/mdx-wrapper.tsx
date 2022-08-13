import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { Heading, Text, Link, Box, useColorModeValue } from '@chakra-ui/react'

const components = {
  h1: (props) => (
    <Heading
      as="h1"
      size="2xl"
      p="16px"
      color={useColorModeValue('brand.600', 'gray.300')}
      {...props}
    />
  ),
  h2: (props) => (
    <Heading
      as="h2"
      size="xl"
      p="16px"
      color={useColorModeValue('brand.600', 'gray.300')}
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      size="lg"
      p="16px"
      color={useColorModeValue('brand.600', 'gray.300')}
      {...props}
    />
  ),
  p: (props) => (
    <Text
      fontSize="md"
      p="16px"
      color={useColorModeValue('brand.600', 'gray.300')}
      {...props}
    />
  ),
  a: (props) => (
    <Link
      fontSize="md"
      color={useColorModeValue('blue.600', 'blue.300')}
      textDecoration="underline"
      {...props}
    />
  ),
  code: (props) => (
    <Box m="16px" p="16px" borderRadius="8px" {...props} overflow="scroll" />
  ),
  img: (props) => (
    <Box p="16px" display="flex" justifyContent="center" alignItems="center">
      <Image {...props} layout="fixed" priority />
    </Box>
  )
}

export default function MDXWrapper(props) {
  return <MDXRemote {...props} components={components} />
}
