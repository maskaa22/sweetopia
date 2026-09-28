import { useEffect, useState } from 'react'
import { NavLink as RouterNavLink, Link, useLocation } from 'react-router-dom'
import { BRAND, NAV_LINKS, ROUTES } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import styles from './Header.module.scss'

const Header = () => {
  const { count, open } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const { key } = useLocation()

  // Shut on any navigation. Clicking a link inside the menu is the usual way
  // out of it, and a menu left standing over the page you just asked for is
  // the thing people complain about.
  useEffect(() => setMenuOpen(false), [key])

  useEffect(() => {
    if (!menuOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const link = ({ isActive }: { isActive: boolean }) =>
    // Only the page links can be current; an anchor on the landing page would
    // otherwise light up for the whole of it.
    [styles.link, isActive ? styles.current : ''].filter(Boolean).join(' ')

  return (
    <header className={styles.root}>
      <Container className={styles.inner}>
        <Link to={ROUTES.HOME} className={styles.brand}>
          {BRAND}
        </Link>

        <nav
          id="main-nav"
          className={[styles.nav, menuOpen ? styles.navOpen : ''].filter(Boolean).join(' ')}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((item) => (
            <RouterNavLink
              key={item.to}
              to={item.to}
              end
              className={item.to.includes('#') ? styles.link : link}
            >
              {item.label}
            </RouterNavLink>
          ))}
        </nav>

        <div className={styles.controls}>
          <Link to={ROUTES.LOGIN} className={styles.account} aria-label="Sign in">
            <SvgIcon id="icon-user" width={22} height={22} />
          </Link>

          <button
            type="button"
            className={styles.menu}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <SvgIcon id={menuOpen ? 'icon-close' : 'icon-menu'} width={24} height={24} />
          </button>

          <button type="button" className={styles.cart} onClick={open} aria-label="Open cart">
            <SvgIcon id="icon-cart" width={24} height={24} />
            {count > 0 ? <span className={styles.badge}>{count}</span> : null}
          </button>
        </div>
      </Container>
    </header>
  )
}

export default Header
