import { Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

type Props = {
  datePublished: string
}

const BlogMetaData = (props: Props) => {
  const router = useRouter()
  const locale = router.locale
  // TODO: create shared date formatter so we have consistent dates here with the dates on the
  // blog index page. Or, we can pass around formatted dates.
  const formattedDate = new Date(
    Date.parse(props.datePublished)
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Box pt={4}>
      <Text fontSize="xs">Posted on: {formattedDate}</Text>
    </Box>
  )
}

export default BlogMetaData
