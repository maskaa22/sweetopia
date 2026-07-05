import type { Product } from '@/types/content'
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
        <MediaFrame ratio="square" label={`Фото: ${product.name}`} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>
            {product.price}
            <span className={styles.currency}>грн</span>
          </span>
          <Button variant="solid" icon="icon-cart" onClick={() => add(product)}>
            До кошика
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
