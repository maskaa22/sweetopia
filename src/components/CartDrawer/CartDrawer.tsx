import { CURRENCY } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'
import SvgIcon from '@/components/SvgIcon'
import Button from '@/components/Button'
import styles from './CartDrawer.module.scss'

const CartDrawer = () => {
  const { items, count, total, isOpen, increment, decrement, remove, close } = useCart()

  return (
    <div className={[styles.root, isOpen ? styles.open : ''].filter(Boolean).join(' ')}>
      <div className={styles.backdrop} onClick={close} aria-hidden="true" />

      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Кошик"
        aria-hidden={!isOpen}
      >
        <header className={styles.head}>
          <h2 className={styles.title}>Твій кошик</h2>
          <button
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Закрити кошик"
          >
            <SvgIcon id="icon-close" width={22} height={22} />
          </button>
        </header>

        {count === 0 ? (
          <div className={styles.empty}>
            <SvgIcon id="icon-lollipop" width={44} height={44} />
            <p>Кошик поки порожній. Обери щось солоденьке в кенді-барі!</p>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.info}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.unit}>
                      {item.price} {CURRENCY} / шт
                    </span>
                  </div>
                  <div className={styles.qty}>
                    <button
                      type="button"
                      onClick={() => decrement(item.id)}
                      aria-label={`Зменшити «${item.name}»`}
                    >
                      <SvgIcon id="icon-minus" width={16} height={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increment(item.id)}
                      aria-label={`Додати «${item.name}»`}
                    >
                      <SvgIcon id="icon-plus" width={16} height={16} />
                    </button>
                  </div>
                  <span className={styles.sum}>
                    {item.price * item.quantity} {CURRENCY}
                  </span>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => remove(item.id)}
                    aria-label={`Прибрати «${item.name}»`}
                  >
                    <SvgIcon id="icon-close" width={16} height={16} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className={styles.foot}>
              <div className={styles.totalRow}>
                <span>Разом</span>
                <span className={styles.total}>
                  {total} {CURRENCY}
                </span>
              </div>
              <Button variant="solid" icon="icon-arrow-right">
                Оформити замовлення
              </Button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
