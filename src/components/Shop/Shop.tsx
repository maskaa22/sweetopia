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
        <SectionTitle kicker="Скуштуй королівство —" variant="outline" tone="mix" align="center">
          кенді-бар
        </SectionTitle>
        <p className={styles.lead}>
          Забери шматочок Солодії додому. Усі солодощі — ручної роботи, свіжі щодня та за рецептами
          самих мешканців королівства.
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
