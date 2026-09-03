import type { CSSProperties } from 'react'
import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import styles from './Contact.module.scss'

// The board fills the whole frame with line-art sweets, at every size and
// angle. Placement is data, not layout -- there is no rule to it beyond "no
// two alike" -- so it lives here rather than as three dozen rules in the
// stylesheet. Loosely banded by `top` so the cover stays even; everything
// else is jittered. `keep` marks the few that still have room on a phone.
const SCATTER = [
  { src: 'sweet-4.png', top: 12, left: 3, w: 4, rot: -14 },
  { src: 'sweet-3.png', top: 10, left: 12, w: 9, rot: 22 },
  { src: 'sweet-1.png', top: 15, left: 24, w: 10, rot: -9 },
  { src: 'sweet-3.png', top: 11, left: 37, w: 9, rot: -28, keep: true },
  { src: 'sweet-2.png', top: 13, left: 48, w: 7, rot: 16 },
  { src: 'sweet-1.png', top: 12, left: 58, w: 10, rot: 10 },
  { src: 'sweet-4.png', top: 9, left: 71, w: 4, rot: 28 },
  { src: 'sweet-2.png', top: 14, left: 79, w: 7, rot: -18 },
  { src: 'sweet-3.png', top: 12, left: 89, w: 9, rot: 14 },

  { src: 'sweet-2.png', top: 24, left: 1, w: 8, rot: -22, keep: true },
  { src: 'sweet-4.png', top: 22, left: 11, w: 5, rot: 8 },
  { src: 'sweet-1.png', top: 26, left: 19, w: 11, rot: 12 },
  { src: 'sweet-3.png', top: 23, left: 32, w: 9, rot: -16 },
  { src: 'sweet-1.png', top: 21, left: 44, w: 10, rot: -6 },
  { src: 'sweet-2.png', top: 27, left: 56, w: 8, rot: 20 },
  { src: 'sweet-1.png', top: 24, left: 66, w: 11, rot: -12, keep: true },
  { src: 'sweet-4.png', top: 26, left: 80, w: 5, rot: 18 },
  { src: 'sweet-3.png', top: 22, left: 88, w: 10, rot: 26 },

  { src: 'sweet-1.png', top: 37, left: 2, w: 10, rot: 15 },
  { src: 'sweet-2.png', top: 35, left: 14, w: 8, rot: -26, keep: true },
  { src: 'sweet-4.png', top: 39, left: 25, w: 5, rot: 10 },
  { src: 'sweet-3.png', top: 36, left: 33, w: 9, rot: 24 },
  { src: 'sweet-4.png', top: 34, left: 61, w: 5, rot: -20 },
  { src: 'sweet-2.png', top: 38, left: 69, w: 8, rot: 12 },
  { src: 'sweet-3.png', top: 36, left: 82, w: 10, rot: -14, keep: true },
  { src: 'sweet-1.png', top: 34, left: 91, w: 10, rot: 20 },

  { src: 'sweet-2.png', top: 49, left: 3, w: 9, rot: 18 },
  { src: 'sweet-1.png', top: 47, left: 14, w: 11, rot: -14 },
  { src: 'sweet-3.png', top: 51, left: 27, w: 9, rot: 12 },
  { src: 'sweet-4.png', top: 48, left: 74, w: 5, rot: -24 },
  { src: 'sweet-2.png', top: 50, left: 82, w: 8, rot: 22, keep: true },
  { src: 'sweet-1.png', top: 46, left: 90, w: 11, rot: -10 },

  { src: 'sweet-3.png', top: 58, left: 8, w: 9, rot: -20 },
  { src: 'sweet-2.png', top: 60, left: 20, w: 7, rot: 14 },
  { src: 'sweet-1.png', top: 57, left: 76, w: 10, rot: 16 },
  { src: 'sweet-3.png', top: 59, left: 88, w: 9, rot: -24 },
]

const Contact = () => {
  return (
    <section id={SECTION_IDS.CONTACT} className={styles.root}>
      {/* Hero's cloud twice over: flipped at the top so its puffy edge faces
          down into the section, and the right way up at the foot. */}
      <img
        className={styles.cloudTop}
        src="/images/hero-2.png"
        alt=""
        aria-hidden="true"
        width={1664}
        height={936}
      />

      {SCATTER.map((sweet, index) => (
        <img
          key={index}
          className={[styles.sweet, sweet.keep ? styles.sweetKeep : ''].filter(Boolean).join(' ')}
          src={`/images/${sweet.src}`}
          alt=""
          aria-hidden="true"
          // Width goes through a custom property rather than straight onto the
          // element: an inline width would beat any rule, and the few that
          // survive onto a phone have to come up in size to read at all.
          style={
            {
              top: `${sweet.top}%`,
              left: `${sweet.left}%`,
              '--sweet-w': `${sweet.w}%`,
              transform: `rotate(${sweet.rot}deg)`,
            } as CSSProperties
          }
        />
      ))}

      <Container className={styles.inner}>
        <SectionTitle kicker="We’re waiting for you in" variant="filled" align="center">
          Sweetopia
        </SectionTitle>

        <div className={styles.stage}>
          <img
            className={styles.cat}
            src="/images/cat.png"
            alt="A fluffy candy-floss kitten with cotton-candy fur"
            width={1024}
            height={1536}
          />

          <span className={[styles.bubble, styles.bubbleLeft].join(' ')}>
            And there are
            <br />
            sugar kitties
          </span>
          <span className={[styles.bubble, styles.bubbleRight].join(' ')}>So sweet in here!</span>
        </div>
      </Container>

      <img
        className={styles.cloudBase}
        src="/images/hero-2.png"
        alt=""
        aria-hidden="true"
        width={1664}
        height={936}
      />
    </section>
  )
}

export default Contact
