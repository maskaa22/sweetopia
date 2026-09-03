import type { CSSProperties } from 'react'
import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import styles from './Contact.module.scss'

// The board fills the whole frame with line-art sweets, at every size and
// angle. Placement is data, not layout -- there is no rule to it beyond "no
// two alike", so it lives here rather than as sixteen rules in the stylesheet.
// `keep` marks the few that still have room on a phone.
const SCATTER = [
  { src: 'sweet-4.png', top: 20, left: 13, w: 5, rot: -10, keep: true },
  { src: 'sweet-3.png', top: 31, left: 1, w: 12, rot: 18 },
  { src: 'sweet-2.png', top: 47, left: 5, w: 9, rot: -25, keep: true },
  { src: 'sweet-1.png', top: 29, left: 19, w: 13, rot: 8 },
  { src: 'sweet-3.png', top: 16, left: 28, w: 10, rot: -30, keep: true },
  { src: 'sweet-2.png', top: 54, left: 21, w: 8, rot: 15 },
  { src: 'sweet-1.png', top: 18, left: 43, w: 11, rot: -8 },
  { src: 'sweet-4.png', top: 41, left: 37, w: 4, rot: 24 },
  { src: 'sweet-3.png', top: 25, left: 57, w: 10, rot: 12, keep: true },
  { src: 'sweet-2.png', top: 45, left: 62, w: 8, rot: -20 },
  { src: 'sweet-1.png', top: 21, left: 69, w: 12, rot: 14 },
  { src: 'sweet-4.png', top: 35, left: 81, w: 5, rot: -16, keep: true },
  { src: 'sweet-3.png', top: 49, left: 85, w: 11, rot: 26 },
  { src: 'sweet-2.png', top: 15, left: 89, w: 8, rot: -12 },
  { src: 'sweet-1.png', top: 53, left: 47, w: 11, rot: -18 },
  { src: 'sweet-4.png', top: 13, left: 76, w: 4, rot: 30, keep: true },
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
