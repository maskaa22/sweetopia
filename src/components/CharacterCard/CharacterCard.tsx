import type { Character } from '@/types/content'
import SvgIcon from '@/components/SvgIcon'
import styles from './CharacterCard.module.scss'

export type CardShape = 'arch' | 'pill' | 'wide'
export type CardLayout = 'art-first' | 'text-first' | 'row'

interface CharacterCardProps {
  character: Character
  image: string
  shape?: CardShape
  layout?: CardLayout
  className?: string
}

// preserveAspectRatio is off on all of these so one outline stretches to
// whatever the card ends up being; non-scaling-stroke keeps the rule hairline
// thin however far it is pulled.
//
// The arch is the Citizens panel mirrored: x' = 320 - x, which also flips the
// sweep flag on the dome, so its break lands on the left shoulder instead of
// the right. The break is cut into the geometry rather than dashed, because a
// dash pattern is measured after preserveAspectRatio stretches the box and
// would not stay put. `gapStar` marks the midpoint of that break.
const FRAMES: Record<CardShape, { viewBox: string; paths: string[]; gapStar?: boolean }> = {
  arch: {
    viewBox: '0 0 320 470',
    paths: ['M319 469V160A159 159 0 0 0 15.9 92.8', 'M1 170V469H319'],
    gapStar: true,
  },
  pill: { viewBox: '0 0 100 140', paths: ['M1 46A48 45 0 0 1 99 46V94A48 45 0 0 1 1 94Z'] },
  wide: { viewBox: '0 0 200 70', paths: ['M35 1H165A34 34 0 0 1 165 69H35A34 34 0 0 1 35 1Z'] },
}

const CharacterCard = ({
  character,
  image,
  shape = 'arch',
  layout = 'art-first',
  className,
}: CharacterCardProps) => {
  const frame = FRAMES[shape]
  const gradientId = `character-frame-${character.id}`

  return (
    <article
      className={[styles.root, styles[shape], styles[layout], className].filter(Boolean).join(' ')}
    >
      <svg
        className={styles.frame}
        viewBox={frame.viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-pink)" />
            <stop offset="100%" stopColor="var(--color-blue)" />
          </linearGradient>
        </defs>
        {frame.paths.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {frame.gapStar ? (
        <SvgIcon id="icon-star-4" width={28} height={28} className={styles.gapStar} />
      ) : null}

      <img className={styles.art} src={image} alt="" aria-hidden="true" />

      <div className={styles.text}>
        <h3 className={styles.name}>{character.name}</h3>
        <p className={styles.desc}>{character.description}</p>
      </div>
    </article>
  )
}

export default CharacterCard
