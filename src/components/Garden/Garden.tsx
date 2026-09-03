import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import SvgIcon from '@/components/SvgIcon'
import styles from './Garden.module.scss'

const Garden = () => {
  return (
    <section id={SECTION_IDS.GARDEN} className={styles.root}>
      {/* The teal lens sits on a field that runs from the colour Characters
          closes on to the one House opens with, so the ground either side of
          the curve matches its neighbour and neither seam shows. */}
      <div className={styles.dome}>
        {/* Thin arcs echoing each edge, set in from it. Decorative only. */}
        <span className={styles.archLine} aria-hidden="true" />

        <Container className={styles.inner}>
          <SectionTitle
            kicker="Step into the wonderful"
            variant="outline"
            tone="white"
            kickerTone="white"
            className={styles.head}
          >
            candy garden
          </SectionTitle>

          <SvgIcon id="icon-star-4" width={26} height={26} className={styles.sparkLeft} />
          <SvgIcon id="icon-star-4" width={18} height={18} className={styles.sparkRight} />

          <p className={styles.lead}>
            Here grow trees of pastries and flowers of lollipops, with fountains of ice cream and
            benches covered in glaze.
          </p>
        </Container>

        <img
          className={styles.art}
          src="/images/garden.png"
          alt="A candy garden of blossom trees, lollipop lamps and a striped bench"
          width={1536}
          height={1024}
        />

        {/* The foot curves the same way the top does rather than mirroring it,
            so it is a shape of its own: border-radius can only round a corner
            inward, which would bow the base the other way. */}
        <span className={styles.baseFill} aria-hidden="true" />
        <span className={styles.baseLine} aria-hidden="true" />
      </div>
    </section>
  )
}

export default Garden
