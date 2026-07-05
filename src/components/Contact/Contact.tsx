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
        <SectionTitle kicker="We’re waiting for you in" variant="filled" tone="pink" align="center">
          Sweetopia
        </SectionTitle>

        <div className={styles.stage}>
          <span className={[styles.bubble, styles.bubbleLeft].join(' ')}>
            And there are sugar kitties
          </span>
          <MediaFrame
            className={styles.cat}
            ratio="square"
            label="Illustration: a fluffy sugar kitty"
          />
          <span className={[styles.bubble, styles.bubbleRight].join(' ')}>So sweet in here!</span>
        </div>

        <Button href={`#${SECTION_IDS.SHOP}`} variant="solid" icon="icon-arrow-right">
          Choose your sweets
        </Button>
      </Container>
    </section>
  )
}

export default Contact
