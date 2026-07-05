import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Ruler.module.scss'

const Ruler = () => {
  return (
    <StorySection
      id={SECTION_IDS.RULER}
      className={styles.root}
      kicker="This land is ruled by the"
      title="Sugar King"
      titleVariant="outline"
      titleTone="pink"
      mediaLabel="Illustration: the Sugar King in a caramel crown"
      mediaRatio="portrait"
      paragraphs={[
        'A great and majestic sweet man who has ruled the kingdom for many sugary centuries.',
        'He can see the future through the prism of sweet dreams and always knows who deserves the biggest candy.',
      ]}
    />
  )
}

export default Ruler
