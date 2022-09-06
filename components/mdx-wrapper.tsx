import Image from 'next/image'
import NextLink from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { Heading, Text, Link, Box } from '@chakra-ui/react'

/**
 * Typically we would use the useColorModeValue hook here to differentiate dark
 * styles from light styles. However, this would cause some errors in this file
 * regarding using hooks outside of a react component/function component.
 *
 * See more info on this here: https://github.com/chakra-ui/chakra-ui/discussions/4177.
 */
const components = {
  h1: ({ id, ...props }) =>
    id ? (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as="h1"
            size="2xl"
            p="16px"
            color="brand.600"
            _dark={{ color: 'gray.300' }}
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
        color="brand.600"
        _dark={{ color: 'gray.300' }}
        {...props}
      />
    ),
  h2: ({ id, ...props }) => {
    id ? (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as="h2"
            size="xl"
            p="16px"
            id={id}
            color="brand.600"
            _dark={{ color: 'gray.300' }}
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
        color="brand.600"
        _dark={{ color: 'gray.300' }}
        {...props}
      />
    )
  },
  h3: ({ id, ...props }) =>
    id ? (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as="h3"
            size="md"
            p="16px"
            color="brand.600"
            _dark={{ color: 'gray.300' }}
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
        color="brand.600"
        _dark={{ color: 'gray.300' }}
        {...props}
      />
    ),
  p: (props) => (
    <Text
      fontSize="md"
      p="16px"
      color="brand.600"
      _dark={{ color: 'gray.300' }}
      {...props}
    />
  ),
  a: (props) => (
    <Link
      fontSize="md"
      color="brand.600"
      _dark={{ color: 'gray.300' }}
      textDecoration="underline"
      {...props}
    />
  ),
  code: (props) => (
    <Box m="16px" p="16px" borderRadius="8px" overflowX="auto" {...props} />
  ),
  inlineCode: (props) => (
    <Box
      as="span"
      p={0.5}
      _dark={{ backgroundColor: 'gray.600' }}
      backgroundColor="gray.200"
      {...props}
    />
  ),
  img: (props) => (
    <Box p="16px" display="flex" justifyContent="center" alignItems="center">
      <Image alt="" {...props} layout="fixed" priority />
    </Box>
  )
}

export default function MDXWrapper(props) {
  return <MDXRemote {...props} components={components} />
}
