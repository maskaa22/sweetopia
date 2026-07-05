import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './House.module.scss'

const House = () => {
  return (
    <StorySection
      id={SECTION_IDS.HOUSE}
      className={styles.root}
      kicker="Побач наживо легендарний"
      title="пряничний дім"
      titleVariant="outline"
      titleTone="blue"
      mediaLabel="Ілюстрація: пряничний дім із льодяниковим дахом"
      reversed
      paragraphs={[
        'Стіни зроблені з пряників, прикрашених глазур’ю та різними фігурками з шоколаду.',
        'Дах укритий льодяниками, що переливаються на сонці. Вікна з мармеладу, а двері — з карамелі.',
        'Усередині ще більше солодощів: підлога з шоколадних плиток, стіни з печива з ванільною начинкою, стеля з різнокольорового безе.',
      ]}
    />
  )
}

export default House
