import type { ReactNode } from 'react'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import MediaFrame from '@/components/MediaFrame'
import styles from './StorySection.module.scss'

interface StorySectionProps {
  id: string
  kicker: string
  title: ReactNode
  paragraphs: ReactNode[]
  mediaLabel: string
  mediaRatio?: 'square' | 'portrait' | 'landscape'
  titleVariant?: 'outline' | 'filled'
  titleTone?: 'blue' | 'pink' | 'mix'
  kickerTone?: 'gradient' | 'pink' | 'white' | 'blue'
  reversed?: boolean
  className?: string
  footer?: ReactNode
}

const StorySection = ({
  id,
  kicker,
  title,
  paragraphs,
  mediaLabel,
  mediaRatio = 'landscape',
  titleVariant = 'outline',
  titleTone = 'mix',
  kickerTone = 'gradient',
  reversed = false,
  className,
  footer,
}: StorySectionProps) => {
  const rootClass = [styles.root, className].filter(Boolean).join(' ')
  const gridClass = [styles.grid, reversed ? styles.reversed : ''].filter(Boolean).join(' ')

  return (
    <section id={id} className={rootClass}>
      <Container>
        <SectionTitle
          kicker={kicker}
          variant={titleVariant}
          tone={titleTone}
          kickerTone={kickerTone}
          align="center"
        >
          {title}
        </SectionTitle>

        <div className={gridClass}>
          <div className={styles.copy}>
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            {footer ? <div className={styles.footer}>{footer}</div> : null}
          </div>
          <MediaFrame className={styles.media} label={mediaLabel} ratio={mediaRatio} />
        </div>
      </Container>
    </section>
  )
}

export default StorySection
