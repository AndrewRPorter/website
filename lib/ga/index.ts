/**
 * This file helps setup GA traacking on our site as laid out in:
 * https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
 */

// log the pageview with their URL
export const pageview = (url: string) => {
  if (window !== undefined) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
  if (window !== undefined) {
    window.gtag('event', action, params)
  }
}
