import type { ReactNode } from 'react'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import styles from './PageShell.module.scss'

interface PageShellProps {
  kicker: string
  title: ReactNode
  lead?: ReactNode
  children: ReactNode
}

// The frame the inner pages share: the field, the heading block and the
// measure. Written once so a second page cannot drift from the first.
const PageShell = ({ kicker, title, lead, children }: PageShellProps) => {
  return (
    <section className={styles.root}>
      <Container className={styles.inner}>
        <SectionTitle kicker={kicker} variant="outline" tone="mix" align="center">
          {title}
        </SectionTitle>

        {lead ? <p className={styles.lead}>{lead}</p> : null}

        {children}
      </Container>
    </section>
  )
}

export default PageShell
