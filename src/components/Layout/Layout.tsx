import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import ScrollManager from '@/components/Layout/ScrollManager'

// The frame every page sits in. The cart lives here rather than on a page, so
// it survives navigation with whatever is in it.
const Layout = () => {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

export default Layout
