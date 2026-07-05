import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Adventure.module.scss'

const Adventure = () => {
  return (
    <StorySection
      id={SECTION_IDS.ADVENTURE}
      className={styles.root}
      kicker="Кожен політ у цій країні —"
      title="незабутня пригода"
      titleVariant="filled"
      titleTone="pink"
      mediaLabel="Ілюстрація: літак із льодяників у хмарах із сердечок"
      paragraphs={[
        'Політ на літаку з льодяників, шоколадними крилами, карамельними двигунами та ванільним фюзеляжем.',
        'Пристебніться зефірними ременями — і вирушайте назустріч найсолодшій подорожі свого життя.',
      ]}
    />
  )
}

export default Adventure
