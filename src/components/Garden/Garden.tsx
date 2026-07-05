import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import MediaFrame from '@/components/MediaFrame'
import styles from './Garden.module.scss'

const Garden = () => {
  return (
    <section id={SECTION_IDS.GARDEN} className={styles.root}>
      <Container className={styles.inner}>
        <SectionTitle kicker="Step into the wonderful" tone="mix" kickerTone="white">
          candy garden
        </SectionTitle>
        <p className={styles.lead}>
          Here grow trees of pastries and flowers of lollipops, with fountains of ice cream and
          benches covered in glaze.
        </p>
        <MediaFrame
          className={styles.art}
          ratio="landscape"
          label="Illustration: a candy garden with caramel trees and fountains"
        />
      </Container>
    </section>
  )
}

export default Garden
