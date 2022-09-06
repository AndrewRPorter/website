/**
 * This file helps setup GA tracking on our site as laid out in:
 * https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/.
 *
 */

// log the pageview with their URL
export const pageview = (url: string) => {
  // we cast window to any here to avoid type errors on gtag not existing.
  ;(window as any)?.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url
  })
}

type Event_Props = {
  action: string
  params: object
}

// log specific events happening.
export const event = ({ action, params }: Event_Props) => {
  // we cast window to any here to avoid type errors on gtag not existing.
  ;(window as any)?.gtag('event', action, params)
}
