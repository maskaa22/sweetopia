import { SECTION_IDS, BRAND } from '@/lib/constants'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import styles from './Hero.module.scss'

const Hero = () => {
  return (
    <section id={SECTION_IDS.HERO} className={styles.root}>
      <Container className={styles.inner}>
        <ul className={styles.topline}>
          <li>
            one little
            <br />
            sweet galaxy
          </li>
          <li>
            a world where everything
            <br />
            is made of candy
          </li>
          <li>
            a universe
            <br />
            from your dreams
          </li>
        </ul>

        <h1 className={styles.title}>
          {BRAND}
          <SvgIcon id="icon-sparkle" width={40} height={40} className={styles.sparkle} />
        </h1>

        <img
          className={styles.art}
          src="/images/hero.png"
          alt="A candy gingerbread house floating on pink sugar clouds"
          width={1024}
          height={1024}
        />
      </Container>
    </section>
  )
}

export default Hero
