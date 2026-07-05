import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './House.module.scss'

const House = () => {
  return (
    <StorySection
      id={SECTION_IDS.HOUSE}
      className={styles.root}
      kicker="See the legendary"
      title="gingerbread house"
      titleVariant="outline"
      titleTone="blue"
      mediaLabel="Illustration: a gingerbread house with a lollipop roof"
      reversed
      paragraphs={[
        'The walls are made of gingerbread decorated with glaze and all kinds of chocolate figurines.',
        'The roof is covered with lollipops that shimmer in the sun. The windows are of marmalade, and the doors of caramel.',
        'Inside there are even more sweets: floors of chocolate tiles, walls of vanilla-filled biscuits and a ceiling of colorful meringue.',
      ]}
    />
  )
}

export default House
