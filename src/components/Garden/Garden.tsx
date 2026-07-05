import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import MediaFrame from '@/components/MediaFrame'
import styles from './Garden.module.scss'

const Garden = () => {
  return (
    <section id={SECTION_IDS.GARDEN} className={styles.root}>
      <Container className={styles.inner}>
        <SectionTitle kicker="Потрап у прекрасний" tone="mix" kickerTone="white">
          солодкий сад
        </SectionTitle>
        <p className={styles.lead}>
          Тут ростуть дерева з тістечок і квіти з льодяників, стоять фонтани з морозива та лавки,
          вкриті глазур’ю.
        </p>
        <MediaFrame
          className={styles.art}
          ratio="landscape"
          label="Ілюстрація: солодкий сад із карамельними деревами та фонтанами"
        />
      </Container>
    </section>
  )
}

export default Garden
