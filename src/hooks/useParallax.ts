import { useEffect, useRef } from 'react'

type Axis = 'x' | 'y'

interface Entry {
  el: HTMLElement
  /** Measured instead of the element itself -- see below. */
  frame: Element
  axis: Axis
  distance: number
}

// One scroll listener and one animation frame for the whole page, however many
// pieces take part. A listener each would run the same layout read over and
// over within a single frame.
const entries = new Set<Entry>()
let queued = 0

const read = () => {
  queued = 0
  const middle = window.innerHeight / 2

  entries.forEach(({ el, frame, axis, distance }) => {
    const box = frame.getBoundingClientRect()

    // How far through its pass the section is, from -1 just below the fold to
    // +1 just above it. Measuring in fractions rather than pixels is what
    // keeps the travel bounded: a plain speed multiplier saturates for most of
    // the time a tall section is on screen, and the piece then sits pinned at
    // the end of its range instead of moving with the scroll.
    const span = middle + box.height / 2
    const progress = Math.max(-1, Math.min(1, (middle - (box.top + box.height / 2)) / span))

    el.style.setProperty(
      axis === 'x' ? '--parallax' : '--parallax-y',
      `${(progress * distance).toFixed(1)}px`,
    )
  })
}

const schedule = () => {
  if (!queued) queued = requestAnimationFrame(read)
}

/**
 * Moves a piece of scenery against the scroll, so the layers read as having
 * depth between them. `distance` is how far it travels, in px, across the
 * whole time its section is on screen.
 *
 * Keep it inside whatever room the piece has: the cloud banks run wider than
 * their sections, and travelling further than that overhang brings an edge
 * into view.
 *
 * The offset is measured from the element's section, never from the element:
 * these pieces are transformed already, `getBoundingClientRect` reports the
 * transformed box, and feeding that back into the transform is a loop that
 * jitters. The section does not move.
 *
 * Writes a custom property rather than `translate` itself, because the same
 * pieces are drifting under their own animation and the two have to add up
 * rather than overwrite each other.
 */
const useParallax = <T extends HTMLElement>(distance: number, axis: Axis = 'x') => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const entry: Entry = { el, frame: el.closest('section') ?? el, axis, distance }
    entries.add(entry)

    if (entries.size === 1) {
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
    }
    schedule()

    return () => {
      entries.delete(entry)
      el.style.removeProperty(axis === 'x' ? '--parallax' : '--parallax-y')

      if (entries.size === 0) {
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        if (queued) {
          cancelAnimationFrame(queued)
          queued = 0
        }
      }
    }
  }, [distance, axis])

  return ref
}

export default useParallax
