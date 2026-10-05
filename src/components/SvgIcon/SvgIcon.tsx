import type { CSSProperties } from 'react'
import styles from './SvgIcon.module.scss'

interface SvgIconProps {
  id: string
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
  title?: string
}

const SvgIcon = ({ id, width = 24, height = 24, className, style, title }: SvgIconProps) => {
  return (
    <svg
      className={[styles.root, className].filter(Boolean).join(' ')}
      width={width}
      height={height}
      style={style}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <use href={`/sprite.svg#${id}`} />
    </svg>
  )
}

export default SvgIcon
