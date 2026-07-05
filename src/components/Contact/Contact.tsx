import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import MediaFrame from '@/components/MediaFrame'
import Button from '@/components/Button'
import styles from './Contact.module.scss'

const Contact = () => {
  return (
    <section id={SECTION_IDS.CONTACT} className={styles.root}>
      <Container className={styles.inner}>
        <SectionTitle kicker="Ми чекаємо на вас у" variant="filled" tone="pink" align="center">
          Солодії
        </SectionTitle>

        <div className={styles.stage}>
          <span className={[styles.bubble, styles.bubbleLeft].join(' ')}>
            І є цукрові котики
          </span>
          <MediaFrame
            className={styles.cat}
            ratio="square"
            label="Ілюстрація: пухнастий цукровий котик"
          />
          <span className={[styles.bubble, styles.bubbleRight].join(' ')}>Тут солоденько!</span>
        </div>

        <Button href={`#${SECTION_IDS.SHOP}`} variant="solid" icon="icon-arrow-right">
          Обрати солодощі
        </Button>
      </Container>
    </section>
  )
}

export default Contact
