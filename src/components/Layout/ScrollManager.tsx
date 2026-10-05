import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// A single page keeps its scroll position when the URL changes, which on a new
// route means landing halfway down it. This puts each one at the top -- unless
// the URL names an anchor, which is the one case where a jump is the point.
//
// The anchor is looked for on a frame rather than straight away: the target
// section may not be in the tree yet on the render that the navigation causes.
const ScrollManager = () => {
  // `key` changes on every navigation, even one to the address already shown.
  // Without it, clicking the same anchor a second time does nothing, which is
  // exactly when someone wants it: they have scrolled away and want to go back.
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView()
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}

export default ScrollManager
