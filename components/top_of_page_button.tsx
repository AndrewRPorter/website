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
      {/* TODO: look into providing a custom hook to fix this type error: https://stackoverflow.com/a/64151312/8168077*/}
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
