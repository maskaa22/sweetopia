import type { Product } from '@/types/content'
import { CURRENCY } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'
import MediaFrame from '@/components/MediaFrame'
import Button from '@/components/Button'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { add } = useCart()

  return (
    <article className={styles.root}>
      <div className={styles.media}>
        {product.tag ? <span className={styles.tag}>{product.tag}</span> : null}
        <MediaFrame ratio="square" label={`Photo: ${product.name}`} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>
            <span className={styles.currency}>{CURRENCY}</span>
            {product.price}
          </span>
          <Button variant="solid" icon="icon-cart" onClick={() => add(product)}>
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
