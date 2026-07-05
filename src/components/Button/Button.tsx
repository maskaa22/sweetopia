import type { ReactNode } from 'react'
import SvgIcon from '@/components/SvgIcon'
import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'solid' | 'outline'
  icon?: string
  onClick?: () => void
}

const Button = ({ children, href, variant = 'solid', icon, onClick }: ButtonProps) => {
  const className = [styles.root, styles[variant]].join(' ')
  const content = (
    <>
      <span>{children}</span>
      {icon ? <SvgIcon id={icon} width={20} height={20} /> : null}
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
