import { MDXRemote } from 'next-mdx-remote'
import { Heading, Text, Link, Box } from '@chakra-ui/react'

const components = {
  h1: (props) => <Heading as="h1" size="2xl" m="16px" {...props} />,
  h2: (props) => <Heading as="h2" size="xl" m="16px" {...props} />,
  h3: (props) => <Heading as="h3" size="lg" m="16px" {...props} />,
  p: (props) => <Text fontSize="md" m="16px" {...props} />,
  a: (props) => <Link fontSize="md" m="16px" {...props} />,
  code: (props) => <Box m="16px" p="16px" borderRadius="8px" {...props} />
}

export default function MDXWrapper(props) {
  return <MDXRemote {...props} components={components} />
}
