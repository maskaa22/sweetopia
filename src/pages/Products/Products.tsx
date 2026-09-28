import { PRODUCTS } from '@/lib/products'
import PageShell from '@/components/PageShell'
import ProductCard from '@/components/ProductCard'
import styles from './Products.module.scss'

const Products = () => {
  return (
    <PageShell
      kicker="Everything from the"
      title="candy bar"
      lead="Every treat is handmade, fresh every day and crafted by the kingdom's own residents."
    >
      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageShell>
  )
}

export default Products
