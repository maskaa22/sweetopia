import { SECTION_IDS, BRAND } from '@/lib/constants'
import Container from '@/components/Container'
import MediaFrame from '@/components/MediaFrame'
import SvgIcon from '@/components/SvgIcon'
import styles from './Hero.module.scss'

const Hero = () => {
  return (
    <section id={SECTION_IDS.HERO} className={styles.root}>
      <Container className={styles.inner}>
        <ul className={styles.topline}>
          <li>
            одна маленька
            <br />
            Солодка галактика
          </li>
          <li>
            світ, де все зроблено
            <br />
            зі солодкого
          </li>
          <li>
            всесвіт
            <br />
            із твоїх снів
          </li>
        </ul>

        <h1 className={styles.title}>
          {BRAND}
          <SvgIcon id="icon-sparkle" width={40} height={40} className={styles.sparkle} />
        </h1>

        <MediaFrame
          className={styles.art}
          ratio="landscape"
          label="Головна ілюстрація: пряничний дім на цукрових хмарах"
        />
      </Container>
    </section>
  )
}

export default Hero
