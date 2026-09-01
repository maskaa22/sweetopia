import type { ReactNode } from 'react'
import SvgIcon from '@/components/SvgIcon'
import styles from './ArchPanel.module.scss'

interface ArchPanelProps {
  // Suffix for the gradient and mask ids, which have to be unique per instance.
  id: string
  children: ReactNode
  // The panel owns the outline, not the layout -- callers style the box.
  as?: 'div' | 'article'
  // Break on the left shoulder instead of the right; the same geometry under
  // x' = 320 - x, which also flips the sweep flag on the dome.
  mirror?: boolean
  orbit?: boolean
  className?: string
}

// Arch and orbit share one coordinate system so the weave lands exactly:
// whatever is drawn later wins at each crossing. Order is far side of the
// orbit, then the arch over it, then the near side over the arch. Both breaks
// are cut into the geometry rather than dashed -- the box stretches, and a dash
// pattern measured against the stretched path length would not stay put.
const ARCH = {
  dome: 'M1 469V160A159 159 0 0 1 304.1 92.8',
  wall: 'M319 170V469H1',
  silhouette: 'M1 469V160a159 159 0 0 1 318 0v309Z',
}

const ARCH_MIRRORED = {
  dome: 'M319 469V160A159 159 0 0 0 15.9 92.8',
  wall: 'M1 170V469H319',
  silhouette: ARCH.silhouette,
}

const ORBIT_BACK = 'M-78 441.8A235 76 -14 0 1 378 328.2'
const ORBIT_FRONT = ['M378 328.2A235 76 -14 0 1 34.3 478', 'M-38.3 471.1A235 76 -14 0 1 -78 441.8']

const ArchPanel = ({
  id,
  children,
  as: Tag = 'div',
  mirror = false,
  orbit = false,
  className,
}: ArchPanelProps) => {
  const arch = mirror ? ARCH_MIRRORED : ARCH
  const lineId = `${id}-line`
  const maskId = `${id}-outside-arch`

  return (
    <Tag className={[styles.root, mirror ? styles.mirror : '', className].filter(Boolean).join(' ')}>
      <svg className={styles.frame} viewBox="0 0 320 470" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={lineId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-pink)" />
            <stop offset="100%" stopColor="var(--color-blue)" />
          </linearGradient>

          {/* Everything except the arch's silhouette, so the far side of the
              orbit disappears where the arch stands in front of it. */}
          {orbit ? (
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-140" y="-60" width="600" height="640">
              <rect x="-140" y="-60" width="600" height="640" fill="#fff" />
              <path d={arch.silhouette} fill="#000" />
            </mask>
          ) : null}
        </defs>

        {/*
          The mask sits on the outer group, outside the scaling one. Its
          silhouette is written in root user space, the same space the arch is
          drawn in -- put it on the inner, transformed element and it scales
          along with the orbit, cutting somewhere off the wall.
        */}
        {orbit ? (
          <g mask={`url(#${maskId})`}>
            <g className={styles.orbitBack}>
              <path
                d={ORBIT_BACK}
                fill="none"
                stroke={`url(#${lineId})`}
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        ) : null}

        <path
          d={arch.dome}
          fill="none"
          stroke={`url(#${lineId})`}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={arch.wall}
          fill="none"
          stroke={`url(#${lineId})`}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {orbit ? (
          <g className={styles.orbitFront}>
            {ORBIT_FRONT.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke={`url(#${lineId})`}
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ) : null}
      </svg>

      <SvgIcon id="icon-star-4" width={38} height={38} className={styles.starTop} />
      {orbit ? (
        <SvgIcon id="icon-star-4" width={44} height={44} className={styles.starBottom} />
      ) : null}

      {children}
    </Tag>
  )
}

export default ArchPanel
