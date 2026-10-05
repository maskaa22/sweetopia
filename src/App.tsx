import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import About from '@/pages/About'
import Auth from '@/pages/Auth'
import NotFound from '@/pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.PRODUCT} element={<ProductDetail />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.LOGIN} element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
