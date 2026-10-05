import { Link, useParams } from 'react-router-dom'
import { CURRENCY, ROUTES } from '@/lib/constants'
import { PRODUCTS } from '@/lib/products'
import { useCart } from '@/hooks/useCart'
import PageShell from '@/components/PageShell'
import MediaFrame from '@/components/MediaFrame'
import Button from '@/components/Button'
import NotFound from '@/pages/NotFound'
import styles from './ProductDetail.module.scss'

const ProductDetail = () => {
  const { id } = useParams()
  const { add } = useCart()
  const product = PRODUCTS.find((item) => item.id === id)

  // An id that matches nothing is a wrong address, not an empty product page,
  // so it gets the same answer as any other one.
  if (!product) return <NotFound />

  // The description is the pastry chef's build list, held together by middots.
  // Split back apart, it is the layer list it always was.
  const layers = product.description.split('·').map((layer) => layer.trim())

  return (
    <PageShell kicker="From the candy bar" title={product.name}>
      <article className={styles.root}>
        <div className={styles.media}>
          {product.tag ? <span className={styles.tag}>{product.tag}</span> : null}
          {product.image ? (
            <img className={styles.art} src={product.image} alt={product.name} />
          ) : (
            <MediaFrame ratio="square" label={`Photo: ${product.name}`} />
          )}
        </div>

        <div className={styles.body}>
          <h2 className={styles.heading}>What is in it</h2>
          <ul className={styles.layers}>
            {layers.map((layer) => (
              <li key={layer}>{layer}</li>
            ))}
          </ul>

          <div className={styles.buy}>
            <span className={styles.price}>
              {/* The display face has no currency glyph, so the sign is set in
                  the body face beside the amount. */}
              <span className={styles.currency}>{CURRENCY}</span>
              {product.price}
            </span>
            <Button variant="solid" icon="icon-cart" sparkle onClick={() => add(product)}>
              Add to cart
            </Button>
          </div>

          <Link to={ROUTES.PRODUCTS} className={styles.back}>
            &larr; All of the candy bar
          </Link>
        </div>
      </article>
    </PageShell>
  )
}

export default ProductDetail
