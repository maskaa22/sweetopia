import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import SvgIcon from '@/components/SvgIcon'
import styles from './House.module.scss'

const House = () => {
  return (
    <section id={SECTION_IDS.HOUSE} className={styles.root}>
      {/* Both come with their own lean and their own pink-to-blue stroke, so
          they are placed as they are -- no tilt, no tint. */}
      <img
        className={styles.popsicle}
        src="/images/sweet-4.png"
        alt=""
        aria-hidden="true"
        width={518}
        height={1024}
      />
      <img
        className={styles.wrapper}
        src="/images/sweet-3.png"
        alt=""
        aria-hidden="true"
        width={534}
        height={308}
      />

      <Container className={styles.stage}>
        <div className={styles.head}>
          {/* Broken by hand: the board sets it as two stacked lines, and at
              this size the second one is what the house stands beside. */}
          <SectionTitle kicker="See the legendary" variant="outline" tone="mix" align="start">
            <>
              gingerbread
              <br />
              house
            </>
          </SectionTitle>

          <SvgIcon id="icon-sparkle" width={28} height={28} className={styles.sparkA} />
          <SvgIcon id="icon-sparkle" width={18} height={18} className={styles.sparkB} />
          <SvgIcon id="icon-sparkle" width={40} height={40} className={styles.sparkC} />
        </div>

        <div className={styles.copy}>
          <p>
            The walls are made of gingerbread decorated with glaze and all kinds of chocolate
            figurines.
          </p>
          <p>
            The roof is covered with lollipops that shimmer in the sun. The windows are of
            marmalade, and the doors of caramel.
          </p>
          <p>
            Inside there are even more sweets: floors of chocolate tiles, walls of vanilla-filled
            biscuits and a ceiling of colorful meringue.
          </p>

          <SvgIcon id="icon-doodle-arrow" width={100} height={160} className={styles.arrow} />
        </div>

        {/* The same house as the Hero -- this section is where you finally get
            up close to it, so it is deliberately the identical asset. */}
        <img
          className={styles.art}
          src="/images/hero.png"
          alt="A gingerbread house with a lollipop roof, marmalade windows and caramel doors"
          width={1024}
          height={1024}
        />
      </Container>

      {/* Hero's cloud again, run past both edges so the house reads as standing
          on a bank rather than on a single puff. */}
      <img
        className={styles.cloud}
        src="/images/hero-2.png"
        alt=""
        aria-hidden="true"
        width={1664}
        height={936}
      />
    </section>
  )
}

export default House
