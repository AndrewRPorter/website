import Image from 'next/image'
import NextLink from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { Heading, Text, Link, Box, useColorModeValue } from '@chakra-ui/react'

const components = {
  h1: ({ id, ...props }) =>
    id ? (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as="h1"
            size="2xl"
            p="16px"
            color={useColorModeValue('brand.600', 'gray.300')}
            {...props}
            _hover={{
              _before: {
                fontSize: '28px',
                content: '"#"',
                position: 'relative',
                marginLeft: '-1.2ch',
                paddingRight: '0.2ch'
              }
            }}
          />
        </NextLink>
      </Link>
    ) : (
      <Heading
        as="h1"
        size="2xl"
        p="16px"
        color={useColorModeValue('brand.600', 'gray.300')}
        {...props}
      />
    ),
  h2: ({ id, ...props }) =>
    id ? (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as="h2"
            size="xl"
            p="16px"
            id={id}
            color={useColorModeValue('brand.600', 'gray.300')}
            {...props}
            _hover={{
              _before: {
                fontSize: '28px',
                content: "'#'",
                position: 'relative',
                marginLeft: '-1.2ch',
                paddingRight: '0.2ch'
              }
            }}
          />
        </NextLink>
      </Link>
    ) : (
      <Heading
        as="h2"
        size="xl"
        p="16px"
        color={useColorModeValue('brand.600', 'gray.300')}
        {...props}
      />
    ),
  h3: ({ id, ...props }) =>
    id ? (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as="h3"
            size="md"
            p="16px"
            color={useColorModeValue('brand.600', 'gray.300')}
            {...props}
            _hover={{
              _before: {
                content: '"#"',
                position: 'relative',
                marginLeft: '-1.2ch',
                paddingRight: '0.2ch'
              }
            }}
          />
        </NextLink>
      </Link>
    ) : (
      <Heading
        as="h3"
        size="md"
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
  inlineCode: (props) => (
    <Box
      as="span"
      p={0.5}
      backgroundColor={useColorModeValue('gray.200', 'gray.600')}
      {...props}
    />
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
