import Image, { ImageProps } from 'next/image'
import NextLink from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import {
  Heading,
  Text,
  Link,
  Box,
  HeadingProps,
  BoxProps,
  TextProps,
  LinkProps,
  ListProps,
  UnorderedList,
  OrderedList,
  ListItem,
  ListItemProps
} from '@chakra-ui/react'

/**
 * Typically we would use the useColorModeValue hook here to differentiate dark
 * styles from light styles. However, this would cause some errors in this file
 * regarding using hooks outside of a react component/function component.
 *
 * See more info on this here: https://github.com/chakra-ui/chakra-ui/discussions/4177.
 */
const components = {
  h1: ({ id, ...props }: HeadingProps) =>
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
  h2: ({ id, ...props }: HeadingProps) =>
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
    ),
  h3: ({ id, ...props }: HeadingProps) =>
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
  p: (props: TextProps) => (
    <Text
      fontSize="md"
      p="16px"
      color="brand.600"
      _dark={{ color: 'gray.300' }}
      {...props}
    />
  ),
  a: (props: LinkProps) => (
    <Link
      fontSize="md"
      color="blue.600"
      _dark={{ color: 'gray.300' }}
      textDecoration="underline"
      {...props}
    />
  ),
  code: (props: BoxProps) => (
    <Box m="16px" p="16px" borderRadius="8px" overflowX="auto" {...props} />
  ),
  ul: (props: ListProps) => (
    <Box p="16px" ml="16px" display="flex">
      <UnorderedList {...props} />
    </Box>
  ),
  ol: (props: ListProps) => (
    <Box p="16px" ml="16px" display="flex">
      <OrderedList {...props} />
    </Box>
  ),
  li: (props: ListItemProps) => <ListItem {...props} />,
  inlineCode: (props: BoxProps) => (
    <Box
      as="span"
      p={0.5}
      _dark={{ backgroundColor: 'gray.600' }}
      backgroundColor="gray.200"
      {...props}
    />
  ),
  img: (props: ImageProps) => (
    <Box p="16px" display="flex" justifyContent="center" alignItems="center">
      <Image alt="" {...props} layout="fixed" priority />
    </Box>
  )
}

export default function MDXWrapper(props: any) {
  return <MDXRemote {...props} components={components} />
}
