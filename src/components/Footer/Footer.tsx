import { BRAND } from '@/lib/constants'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.root}>
      <Container className={styles.inner}>
        <span>Дизайн — студія {BRAND}</span>
        <span className={styles.center}>
          Усі зображення згенеровані в&nbsp;нейромережі
        </span>
        <span className={styles.love}>
          зроблено з великою любов’ю
          <SvgIcon id="icon-heart" width={16} height={16} className={styles.heart} />
        </span>
      </Container>
    </footer>
  )
}

export default Footer
