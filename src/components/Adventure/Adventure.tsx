import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Adventure.module.scss'

const Adventure = () => {
  return (
    <StorySection
      id={SECTION_IDS.ADVENTURE}
      className={styles.root}
      kicker="Every flight here is"
      title="an unforgettable trip"
      titleVariant="filled"
      titleTone="pink"
      mediaLabel="Illustration: a lollipop plane in clouds of hearts"
      paragraphs={[
        'A flight on a plane of lollipops, with chocolate wings, caramel engines and a vanilla fuselage.',
        'Buckle up your marshmallow seatbelts and set off on the sweetest journey of your life.',
      ]}
    />
  )
}

export default Adventure
