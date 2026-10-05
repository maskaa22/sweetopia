import Hero from '@/components/Hero'
import Kingdom from '@/components/Kingdom'
import Citizens from '@/components/Citizens'
import Shop from '@/components/Shop'
import Ruler from '@/components/Ruler'
import Adventure from '@/components/Adventure'
import Characters from '@/components/Characters'
import Garden from '@/components/Garden'
import House from '@/components/House'
import Contact from '@/components/Contact'

// The original landing, now one route among several. The order is load-bearing:
// every seam between two sections is matched to the pair either side of it.
const Home = () => {
  return (
    <>
      <Hero />
      <Kingdom />
      <Citizens />
      <Shop />
      <Ruler />
      <Adventure />
      <Characters />
      <Garden />
      <House />
      <Contact />
    </>
  )
}

export default Home
