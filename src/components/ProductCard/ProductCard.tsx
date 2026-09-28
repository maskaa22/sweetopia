import { Link } from 'react-router-dom'
import type { Product } from '@/types/content'
import { CURRENCY, productPath } from '@/lib/constants'
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
      {/* The art and the name link through; the cart button deliberately does
          not sit inside that link -- a control nested in a link is reachable
          twice and fires the wrong thing half the time. */}
      <Link to={productPath(product.id)} className={styles.media} aria-label={product.name}>
        {product.tag ? <span className={styles.tag}>{product.tag}</span> : null}
        {/* The art carries its own empty margin and the pieces are not all the
            same shape, so it is fitted into a square rather than filling one.
            Without one yet, the slot shows the placeholder frame. */}
        {product.image ? (
          <img className={styles.art} src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <MediaFrame className={styles.slot} ratio="square" label={`Photo: ${product.name}`} />
        )}
      </Link>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link to={productPath(product.id)} className={styles.nameLink}>
            {product.name}
          </Link>
        </h3>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>
            <span className={styles.currency}>{CURRENCY}</span>
            {product.price}
          </span>
          <Button variant="solid" icon="icon-cart" sparkle onClick={() => add(product)}>
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
