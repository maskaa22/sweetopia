import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import ArchPanel from '@/components/ArchPanel'
import styles from './Citizens.module.scss'

const Citizens = () => {
  return (
    <section id={SECTION_IDS.CITIZENS} className={styles.root}>
      <img loading="lazy" decoding="async" className={styles.cake} src="/images/sweet-1.webp" alt="" aria-hidden="true" />
      <img loading="lazy" decoding="async" className={styles.lollipop} src="/images/sweet-2.webp" alt="" aria-hidden="true" />
      <img loading="lazy" decoding="async" className={styles.candy} src="/images/sweet-3.webp" alt="" aria-hidden="true" />

      <Container>
        <h2 className={styles.title}>Kingdom residents</h2>

        <div className={styles.grid}>
          <img loading="lazy" decoding="async"
            className={styles.figure}
            src="/images/citizens.webp"
            alt="A smiling pink cupcake character with sprinkles and raspberry ears"
            width={1362}
            height={1155}
          />

          <ArchPanel id="citizens" orbit className={styles.panel}>
            <SvgIcon id="icon-star-4" width={22} height={22} className={styles.starSmall} />

            <div className={styles.copy}>
              <p>Kind and cheerful creatures who love to spend their time eating sweets.</p>
              <p>They wear clothes made of candy and decorate their hair with caramel ribbons.</p>
              <p>
                The residents of the kingdom always smile and laugh, for they live in a world full
                of joy and happiness.
              </p>
            </div>
          </ArchPanel>
        </div>
      </Container>
    </section>
  )
}

export default Citizens
