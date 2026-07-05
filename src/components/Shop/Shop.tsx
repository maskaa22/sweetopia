import { SECTION_IDS } from '@/lib/constants'
import { PRODUCTS } from '@/lib/products'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import ProductCard from '@/components/ProductCard'
import styles from './Shop.module.scss'

const Shop = () => {
  return (
    <section id={SECTION_IDS.SHOP} className={styles.root}>
      <Container>
        <SectionTitle kicker="Taste the kingdom —" variant="outline" tone="mix" align="center">
          candy bar
        </SectionTitle>
        <p className={styles.lead}>
          Take a piece of Sweetopia home. Every treat is handmade, fresh every day and crafted by
          the kingdom’s own residents.
        </p>

        <div className={styles.grid}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Shop
