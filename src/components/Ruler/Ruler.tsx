import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Ruler.module.scss'

const Ruler = () => {
  return (
    <StorySection
      id={SECTION_IDS.RULER}
      className={styles.root}
      kicker="Править цією країною"
      title="Солодоцар"
      titleVariant="outline"
      titleTone="pink"
      mediaLabel="Ілюстрація: король Солодоцар у карамельній короні"
      mediaRatio="portrait"
      paragraphs={[
        'Великий і величний солодкий чоловік, який править королівством уже багато солодких століть.',
        'Може бачити майбутнє крізь призму солодких снів і завжди знає, кому подарувати найбільшу цукерку.',
      ]}
    />
  )
}

export default Ruler
