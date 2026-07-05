import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Citizens.module.scss'

const Citizens = () => {
  return (
    <StorySection
      id={SECTION_IDS.CITIZENS}
      className={styles.root}
      kicker="Meet the"
      title="residents"
      titleVariant="filled"
      titleTone="pink"
      mediaLabel="Illustration: a smiling ice-cream character"
      mediaRatio="square"
      paragraphs={[
        'Kind and cheerful creatures who love to spend their time eating sweets.',
        'They wear clothes made of candy and decorate their hair with caramel ribbons.',
        'The residents of the kingdom always smile and laugh, for they live in a world full of joy and happiness.',
      ]}
    />
  )
}

export default Citizens
