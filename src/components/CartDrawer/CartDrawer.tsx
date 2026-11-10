import { useEffect, useRef } from 'react'
import { CURRENCY } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import styles from './CartDrawer.module.scss'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const CartDrawer = () => {
  const { items, count, total, isOpen, status, placed, increment, decrement, remove, checkout, close } =
    useCart()
  const panelRef = useRef<HTMLElement>(null)

  // A modal dialog has three obligations the markup alone does not meet: take
  // focus when it opens, keep Tab inside while it is open, and hand focus back
  // to whatever opened it when it closes. Escape is the way out.
  useEffect(() => {
    if (!isOpen) return

    const panel = panelRef.current
    if (!panel) return

    // Remembered before focus moves, so the cleanup can return to it -- the
    // "Add to cart" button, or the cart icon in the header.
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    panel.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab') return

      const stops = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (stops.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const first = stops[0]
      const last = stops[stops.length - 1]
      const active = document.activeElement

      // Also covers focus having been lost: the button that was pressed can
      // unmount under it (Checkout empties the list), which leaves it on <body>.
      if (!panel.contains(active) || (active === panel && !event.shiftKey)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [isOpen, close])

  // Checkout removes the button that was focused, and the confirmation that
  // replaces it should be where focus lands rather than <body>.
  useEffect(() => {
    if (isOpen && status === 'placed') panelRef.current?.focus()
  }, [isOpen, status])

  return (
    <div className={[styles.root, isOpen ? styles.open : ''].filter(Boolean).join(' ')}>
      <div className={styles.backdrop} onClick={close} aria-hidden="true" />

      <aside
        ref={panelRef}
        tabIndex={-1}
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
