import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Kingdom.module.scss'

const Kingdom = () => {
  return (
    <StorySection
      id={SECTION_IDS.KINGDOM}
      className={styles.root}
      kicker="Справжнє королівство"
      title="солодощів"
      titleVariant="outline"
      titleTone="mix"
      mediaLabel="Ілюстрація: візок із морозивом посеред цукрових гір"
      reversed
      paragraphs={[
        <>
          Тут можна побачити будинки з шоколаду, стіни з льодяників і дахи{' '}
          <strong>з цукрової вати</strong>.
        </>,
        <>
          Ви ніколи не зможете викинути з голови ті враження, які отримаєте,{' '}
          <strong>побачивши одного разу</strong>.
        </>,
      ]}
    />
  )
}

export default Kingdom
