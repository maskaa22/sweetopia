import { BRAND } from '@/lib/constants'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.root}>
      <Container className={styles.inner}>
        <span>Designed by {BRAND} studio</span>
        <span className={styles.center}>All images generated with AI</span>
        <span className={styles.love}>
          made with great love
          <SvgIcon id="icon-heart" width={16} height={16} className={styles.heart} />
        </span>
      </Container>
    </footer>
  )
}

export default Footer
