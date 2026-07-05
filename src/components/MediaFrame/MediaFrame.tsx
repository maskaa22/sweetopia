import SvgIcon from '@/components/SvgIcon'
import styles from './MediaFrame.module.scss'

interface MediaFrameProps {
  label: string
  src?: string
  alt?: string
  ratio?: 'square' | 'portrait' | 'landscape'
  className?: string
}

// Slot for artwork that will be generated later. Drop a `src` in to replace
// the placeholder with the real image.
const MediaFrame = ({ label, src, alt, ratio = 'landscape', className }: MediaFrameProps) => {
  const rootClass = [styles.root, styles[ratio], className].filter(Boolean).join(' ')

  if (src) {
    return (
      <figure className={rootClass}>
        <img src={src} alt={alt ?? label} loading="lazy" />
      </figure>
    )
  }

  return (
    <figure className={rootClass} data-placeholder>
      <SvgIcon id="icon-lollipop" width={36} height={36} className={styles.icon} />
      <figcaption className={styles.caption}>{label}</figcaption>
    </figure>
  )
}

export default MediaFrame
