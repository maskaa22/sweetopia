import type { CSSProperties, ReactNode } from 'react'
import SvgIcon from '@/components/SvgIcon'
import styles from './Button.module.scss'

// Where each spark sits against the button and when it takes its turn. Placed
// by hand rather than spread evenly: an even ring reads as a loading spinner,
// and the delays are uneven for the same reason -- in step they flash as one.
//
// All of them sit on the pill or just over its edge. Silver only reads against
// the button's own colour; out on the white card it disappears.
const SPARKS = [
  { top: '-14%', left: '9%', size: 13, delay: 0 },
  { top: '-18%', left: '39%', size: 10, delay: 0.22 },
  { top: '-8%', left: '69%', size: 12, delay: 0.09 },
  { top: '22%', left: '90%', size: 15, delay: 0.34 },
  { top: '74%', left: '25%', size: 11, delay: 0.46 },
  { top: '80%', left: '58%', size: 13, delay: 0.15 },
  { top: '38%', left: '3%', size: 10, delay: 0.29 },
]

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'solid' | 'outline'
  icon?: string
  /** Scatters silver stars that twinkle while the button is hovered. */
  sparkle?: boolean
  onClick?: () => void
}

const Button = ({
  children,
  href,
  variant = 'solid',
  icon,
  sparkle = false,
  onClick,
}: ButtonProps) => {
  const className = [styles.root, styles[variant], sparkle ? styles.sparkling : '']
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {icon ? <SvgIcon id={icon} width={20} height={20} /> : null}

      {sparkle
        ? SPARKS.map((spark, index) => (
            <SvgIcon
              key={index}
              id="icon-star-4"
              width={spark.size}
              height={spark.size}
              className={styles.spark}
              style={
                {
                  top: spark.top,
                  left: spark.left,
                  '--delay': `${spark.delay}s`,
                } as CSSProperties
              }
            />
          ))
        : null}
    </>
  )

  if (href) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  )
}

export default Button
