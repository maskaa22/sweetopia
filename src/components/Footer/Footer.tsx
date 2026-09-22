import { BRAND } from '@/lib/constants'
import Container from '@/components/Container'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.root}>
      <Container className={styles.inner}>
        <p className={styles.item}>
          <span className={styles.label}>designed by</span>
          <span className={styles.name}>{BRAND} studio</span>
        </p>
        <p className={[styles.item, styles.center].join(' ')}>
          <span className={styles.label}>all rights reserved</span>
          {/* The year and the mark are one unit -- no break between them. */}
          <span className={styles.name}>
            &copy;&nbsp;2027 {BRAND}
          </span>
        </p>
        <p className={[styles.item, styles.end].join(' ')}>
          <span className={styles.label}>with a great love of</span>
          <span className={styles.name}>sweets</span>
        </p>
      </Container>
    </footer>
  )
}

export default Footer
