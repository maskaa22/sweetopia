import { CURRENCY } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import styles from './CartDrawer.module.scss'

const CartDrawer = () => {
  const { items, count, total, isOpen, status, placed, increment, decrement, remove, checkout, close } =
    useCart()

  return (
    <div className={[styles.root, isOpen ? styles.open : ''].filter(Boolean).join(' ')}>
      <div className={styles.backdrop} onClick={close} aria-hidden="true" />

      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        aria-hidden={!isOpen}
      >
        <header className={styles.head}>
          <h2 className={styles.title}>Your cart</h2>
          <button type="button" className={styles.close} onClick={close} aria-label="Close cart">
            <SvgIcon id="icon-close" width={22} height={22} />
          </button>
        </header>

        {/* Three states, and the order matters: straight after checkout the
            cart is empty too, and the confirmation has to win over the empty
            message. */}
        {status === 'placed' ? (
          <div className={styles.placed}>
            <SvgIcon id="icon-star-4" width={44} height={44} className={styles.placedIcon} />
            <h3>Thank you!</h3>
            <p>
              Your order is on its way from the kingdom&rsquo;s own kitchen. The sugar couriers
              have it.
            </p>
            <p className={styles.placedSum}>
              Paid <span className={styles.currency}>{CURRENCY}</span>
              {placed}
            </p>
            <Button variant="outline" onClick={close}>
              Back to the candy bar
            </Button>
          </div>
        ) : count === 0 ? (
          <div className={styles.empty}>
            <SvgIcon id="icon-lollipop" width={44} height={44} />
            <p>Your cart is empty. Pick something sweet from the candy bar!</p>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.info}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.unit}>
                      {CURRENCY}
                      {item.price} / pc
                    </span>
                  </div>
                  <div className={styles.qty}>
                    <button
                      type="button"
                      onClick={() => decrement(item.id)}
                      aria-label={`Remove one ${item.name}`}
                    >
                      <SvgIcon id="icon-minus" width={16} height={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increment(item.id)}
                      aria-label={`Add one ${item.name}`}
                    >
                      <SvgIcon id="icon-plus" width={16} height={16} />
                    </button>
                  </div>
                  <span className={styles.sum}>
                    {CURRENCY}
                    {item.price * item.quantity}
                  </span>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <SvgIcon id="icon-close" width={16} height={16} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className={styles.foot}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.total}>
                  {/* The display face has no currency glyph -- see the
                      stylesheet. The sign is set in the body face instead. */}
                  <span className={styles.currency}>{CURRENCY}</span>
                  {total}
                </span>
              </div>
              <Button variant="solid" icon="icon-arrow-right" onClick={checkout}>
                Checkout
              </Button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
