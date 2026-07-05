import styles from './SvgIcon.module.scss'

interface SvgIconProps {
  id: string
  width?: number
  height?: number
  className?: string
  title?: string
}

const SvgIcon = ({ id, width = 24, height = 24, className, title }: SvgIconProps) => {
  return (
    <svg
      className={[styles.root, className].filter(Boolean).join(' ')}
      width={width}
      height={height}
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
