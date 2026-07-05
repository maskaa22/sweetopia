import type { ReactNode } from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={[styles.root, className].filter(Boolean).join(' ')}>{children}</div>
}

export default Container
