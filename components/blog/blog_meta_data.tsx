import { Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { calculateReadingTime } from '@/utils/blogUtils'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

type Props = {
  datePublished: string
  markdownContent: string
  pageTitle: string
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
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{props.pageTitle}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box pt={4}>
        <Text fontSize="xs">
          Posted on: {formattedDate} • {readingTime} minute read
        </Text>
      </Box>
    </Box>
  )
}

export default BlogMetaData
