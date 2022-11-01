import { Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { calculateReadingTime } from '@/utils/blogUtils'

type Props = {
  datePublished: string
  markdownContent: string
}

const BlogMetaData = (props: Props) => {
  const router = useRouter()
  const locale = router.locale
  // TODO: create shared date formatter so we have consistent dates here with the dates on the
  // blog index page. Or, we can pass around formatted dates.
  const formattedDate = new Date(
    Date.parse(props.datePublished)
  ).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const readingTime = calculateReadingTime(props.markdownContent)

  return (
    <Box pt={4}>
      <Text fontSize="xs">
        Posted on: {formattedDate} • {readingTime} minute read
      </Text>
    </Box>
  )
}

export default BlogMetaData
