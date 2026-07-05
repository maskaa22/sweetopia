import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import Hero from '@/components/Hero'
import Kingdom from '@/components/Kingdom'
import Citizens from '@/components/Citizens'
import Ruler from '@/components/Ruler'
import Adventure from '@/components/Adventure'
import Characters from '@/components/Characters'
import Garden from '@/components/Garden'
import House from '@/components/House'
import Shop from '@/components/Shop'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Kingdom />
        <Citizens />
        <Ruler />
        <Adventure />
        <Characters />
        <Garden />
        <House />
        <Shop />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

export default App
