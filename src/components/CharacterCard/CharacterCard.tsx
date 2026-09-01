import type { Character } from '@/types/content'
import SvgIcon from '@/components/SvgIcon'
import ArchPanel from '@/components/ArchPanel'
import styles from './CharacterCard.module.scss'

export type CardShape = 'arch' | 'arch-mirror' | 'pill' | 'wide'
export type CardLayout = 'art-first' | 'text-first' | 'row'

interface CharacterCardProps {
  character: Character
  image: string
  shape?: CardShape
  layout?: CardLayout
  orbit?: boolean
  className?: string
}

// preserveAspectRatio is off on all of these so one outline stretches to
// whatever the card ends up being; non-scaling-stroke keeps the rule hairline
// thin however far it is pulled.
//
// Breaks are cut into the geometry rather than dashed, because a dash pattern
// is measured after preserveAspectRatio stretches the box and would not stay
// put. `gapStar` marks the midpoint of that break. The arches are not here --
// they come from ArchPanel, shared with Citizens.
const FRAMES: Record<
  Exclude<CardShape, 'arch' | 'arch-mirror'>,
  {
    viewBox: string
    paths: string[]
    gapStar?: boolean
    echo?: boolean
  }
> = {
  // One unbroken run from partway down the right edge, round the bottom, up the
  // left and back over the cap -- what is left out is the break on the right
  // shoulder, where its own star sits.
  //
  // The caps are rx 49 about x=50 so they meet the walls at x=1 and x=99. At 48
  // they stop short, which puts the wall's own endpoint outside the ellipse;
  // SVG then rescales the radii to reach it and the arc swings the wrong way,
  // tearing a second gap open at the top.
  pill: {
    viewBox: '0 0 100 140',
    paths: ['M99 62V94A49 45 0 0 1 1 94V46A49 45 0 0 1 94.4 27'],
    gapStar: true,
    echo: true,
  },
  // Runs from partway along the bottom edge, round the left cap, across the top
  // and down the right cap -- the break is what is left out, low on the right.
  wide: {
    viewBox: '0 0 200 70',
    paths: ['M120 69H35A34 34 0 0 1 35 1H165A34 34 0 0 1 186.9 61'],
    gapStar: true,
  },
}

const CharacterCard = ({
  character,
  image,
  shape = 'arch',
  layout = 'art-first',
  orbit = false,
  className,
}: CharacterCardProps) => {
  const rootClass = [styles.root, styles[shape], styles[layout], className]
    .filter(Boolean)
    .join(' ')

  const body = (
    <>
      <img className={styles.art} src={image} alt="" aria-hidden="true" />

      <div className={styles.text}>
        <h3 className={styles.name}>{character.name}</h3>
        <p className={styles.desc}>{character.description}</p>
      </div>
    </>
  )

  // The arch is the same panel Citizens uses, so it comes from there rather
  // than being drawn again here -- outline, ring and break stars included.
  if (shape === 'arch' || shape === 'arch-mirror') {
    return (
      <ArchPanel
        as="article"
        id={`character-${character.id}`}
        mirror={shape === 'arch-mirror'}
        orbit={orbit}
        className={rootClass}
      >
        {body}
      </ArchPanel>
    )
  }

  const frame = FRAMES[shape]
  const gradientId = `character-frame-${character.id}`

  return (
    <article className={rootClass}>
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

      {/* Second copy of the outline, offset. It reuses the gradient defined
          above rather than declaring its own -- url(#id) resolves across the
          document, not just within one svg. */}
      {frame.echo ? (
        <svg
          className={styles.frameEcho}
          viewBox={frame.viewBox}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
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
      ) : null}

      {frame.gapStar ? (
        <SvgIcon id="icon-star-4" width={28} height={28} className={styles.gapStar} />
      ) : null}

      {body}
    </article>
  )
}

export default CharacterCard
