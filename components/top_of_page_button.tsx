import { ChevronUpIcon } from '@chakra-ui/icons'
import { useState, useEffect, useRef } from 'react'
import { IconButton } from '@chakra-ui/react'

interface Props {
  scrollUp: () => void
}

export default function TopOfPageButton(props: Props) {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  useEffect(() => {
    const handleVisibleButton = () => {
      const position = window.pageYOffset
      if (position > 100) {
        return setShowScrollToTop(true)
      } else if (position < 100) {
        return setShowScrollToTop(false)
      }
    }

    window.addEventListener('scroll', handleVisibleButton)
  })

  return (
    <>
      {showScrollToTop && (
        <IconButton
          position="fixed"
          bottom="8%"
          right="8%"
          onClick={props.scrollUp}
          aria-label="Go to top of page"
          icon={<ChevronUpIcon />}
        />
      )}
    </>
  )
}
