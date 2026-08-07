import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import SvgIcon from '@/components/SvgIcon'
import styles from './Kingdom.module.scss'

const Kingdom = () => {
  return (
    <section id={SECTION_IDS.KINGDOM} className={styles.root}>
      <img
        className={styles.cloud}
        src="/images/hero-2.png"
        alt=""
        aria-hidden="true"
        width={1672}
        height={941}
      />

      <SvgIcon id="icon-doodle-arrow" width={100} height={160} className={styles.doodleArrow} />
      <SvgIcon id="icon-doodle-spring" width={170} height={108} className={styles.doodleSpring} />

      <Container className={styles.inner}>
        <SectionTitle kicker="A real kingdom of" variant="outline" tone="mix" align="center">
          sweets
        </SectionTitle>

        <div className={styles.copy}>
          <p>
            Here you’ll find houses made of chocolate, walls of lollipops and roofs
            <span className={styles.accent}>of cotton candy</span>
          </p>
          <p className={styles.indented}>
            You’ll never get the impressions out of your head — the ones you get
            <span className={styles.accent}>the moment you see it</span>
          </p>
        </div>
      </Container>

      <div className={styles.scene}>
        <img
          className={styles.terrain}
          src="/images/kingdom-bg.png"
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
        />
        <img
          className={styles.cart}
          src="/images/kingdom.png"
          alt="An ice cream cart standing among the sugar mountains"
          width={1536}
          height={1024}
        />
      </div>
    </section>
  )
}

export default Kingdom
