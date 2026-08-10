import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import styles from './Ruler.module.scss'

// Traits ride arcs drawn around the cupcake, so the letters themselves turn
// with the contour. All arcs are centred on the cupcake -- cx 810, cy 487 in
// the artwork's own 1536x1024 frame -- which keeps the ring concentric with the
// drawing at any size. Radii vary per arc because the cupcake is not an
// ellipse: the dome is narrower than the base, so the two upper arcs pull in.
//
// Angles run clockwise from east. Each arc is drawn in its reading direction
// and every phrase is centred on its own sector. Direction is not free: on the
// lower half, an arc swept the wrong way puts the text past 180° of rotation
// and it renders upside down, which is why `arts` runs opposite to `subjects`.
const TRAITS = [
  {
    key: 'powder',
    text: 'Can turn sand into powdered sugar',
    // 166° -> 248°, up the left shoulder of the dome. Same radius as the other
    // arcs, so it hugs the dome; the small rotation off the top is all that is
    // needed to stop its tail short of the leaf.
    d: 'M373.4 563.9A450 318 0 0 1 641.4 192.2',
  },
  {
    key: 'fellow',
    text: 'Big and benevolent fellow',
    // 286° -> 8°, down the right shoulder
    d: 'M934 181.3A450 318 0 0 1 1255.6 531.3',
  },
  // The two beside the cup run straight rather than curved. Both are pushed out
  // along their normal so the middle of the run does not fall against the cup,
  // and pitched steeper than the chord they started from -- 68° off horizontal
  // rather than 55° -- which tucks the head of each phrase in towards the
  // cupcake and swings its tail away, following the flare of the case.
  {
    key: 'arts',
    text: 'Devoted to the arts',
    // straight, down the left side of the cup. Slid down its own line to keep
    // clear of the phrase above, which had to drop to miss the leaf.
    d: 'M319.9 558.9L440.5 857.1',
  },
  {
    key: 'subjects',
    text: 'Loves his loyal subjects',
    // straight, down the right side of the cup
    d: 'M1315.1 494.8L1173.1 846',
  },
  {
    key: 'future',
    text: 'Sees the future through a prism of sweetness',
    // Flat, echoing the base of the case. Set low enough that the ascenders
    // clear the cup -- the glyphs sit above this line, not below it.
    d: 'M440 840L1180 840',
  },
] as const

const Ruler = () => {
  return (
    <section id={SECTION_IDS.RULER} className={styles.root}>
      <Container>
        <SectionTitle
          kicker="This land is ruled by the"
          variant="outline"
          tone="mix"
          align="center"
          className={styles.head}
        >
          Sugar King
        </SectionTitle>
      </Container>

      <div className={styles.stage}>
        <div className={styles.cake}>
          <img
            className={styles.cakeArt}
            src="/images/ruler-keks.png"
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
          />

          <svg className={styles.ring} viewBox="0 0 1536 1024">
            <defs>
              {TRAITS.map(({ key, d }) => (
                <path key={key} id={`ruler-arc-${key}`} d={d} fill="none" />
              ))}
            </defs>
            {TRAITS.map(({ key, text }) => (
              <text key={key}>
                <textPath href={`#ruler-arc-${key}`} startOffset="50%" textAnchor="middle">
                  {text}
                </textPath>
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Sits outside .stage so it anchors to the section, not the cupcake's
          column. */}
      <img
        className={styles.king}
        src="/images/ruler.png"
        alt="The Sugar King on a candy throne, holding a lollipop sceptre"
        width={1536}
        height={1024}
      />
    </section>
  )
}

export default Ruler
