import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Citizens.module.scss'

const Citizens = () => {
  return (
    <StorySection
      id={SECTION_IDS.CITIZENS}
      className={styles.root}
      kicker="Знайомтесь із"
      title="мешканцями"
      titleVariant="filled"
      titleTone="pink"
      mediaLabel="Ілюстрація: усміхнений персонаж-морозиво"
      mediaRatio="square"
      paragraphs={[
        'Добрі та веселі створіння, які люблять проводити час за поїданням солодощів.',
        'Вони носять одяг із цукерок і прикрашають своє волосся карамельними стрічками.',
        'Мешканці королівства завжди усміхаються та сміються, адже живуть у світі, повному радості й щастя.',
      ]}
    />
  )
}

export default Citizens
