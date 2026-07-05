import { SECTION_IDS } from '@/lib/constants'
import StorySection from '@/components/StorySection'
import styles from './Kingdom.module.scss'

const Kingdom = () => {
  return (
    <StorySection
      id={SECTION_IDS.KINGDOM}
      className={styles.root}
      kicker="A real kingdom of"
      title="sweets"
      titleVariant="outline"
      titleTone="mix"
      mediaLabel="Illustration: an ice cream cart among the sugar mountains"
      reversed
      paragraphs={[
        <>
          Here you’ll find houses made of chocolate, walls of lollipops and roofs{' '}
          <strong>of cotton candy</strong>.
        </>,
        <>
          You’ll never get the impressions out of your head — the ones you get{' '}
          <strong>the moment you see it</strong>.
        </>,
      ]}
    />
  )
}

export default Kingdom
