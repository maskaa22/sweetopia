import type { ReactNode } from 'react'
import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
  kicker: string
  children: ReactNode
  variant?: 'outline' | 'filled'
  tone?: 'blue' | 'pink' | 'mix'
  kickerTone?: 'gradient' | 'pink' | 'white' | 'blue'
  align?: 'start' | 'center'
  as?: 'h1' | 'h2'
}

const SectionTitle = ({
  kicker,
  children,
  variant = 'outline',
  tone = 'mix',
  kickerTone = 'gradient',
  align = 'center',
  as: Tag = 'h2',
}: SectionTitleProps) => {
  const rootClass = [styles.root, styles[`align-${align}`]].join(' ')
  const bigClass = [styles.big, styles[variant], styles[`tone-${tone}`]].join(' ')

  return (
    <div className={rootClass}>
      {kicker ? (
        <span className={[styles.kicker, styles[`kicker-${kickerTone}`]].join(' ')}>{kicker}</span>
      ) : null}
      {children ? <Tag className={bigClass}>{children}</Tag> : null}
    </div>
  )
}

export default SectionTitle
