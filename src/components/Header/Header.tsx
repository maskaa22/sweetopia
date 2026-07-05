import { BRAND, NAV_LINKS } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import styles from './Header.module.scss'

const Header = () => {
  const { count, open } = useCart()

  return (
    <header className={styles.root}>
      <Container className={styles.inner}>
        <a href="#hero" className={styles.brand}>
          {BRAND}
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <button type="button" className={styles.cart} onClick={open} aria-label="Open cart">
          <SvgIcon id="icon-cart" width={24} height={24} />
          {count > 0 ? <span className={styles.badge}>{count}</span> : null}
        </button>
      </Container>
    </header>
  )
}

export default Header
