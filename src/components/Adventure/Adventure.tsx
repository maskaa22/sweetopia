import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import styles from './Adventure.module.scss'

// Sprinkled around the plane. Size is in px, the rest positions each one.
const HEARTS = [
  { key: 'a', size: 46, className: 'heartA' },
  { key: 'b', size: 34, className: 'heartB' },
  { key: 'c', size: 58, className: 'heartC' },
  { key: 'd', size: 40, className: 'heartD' },
  { key: 'e', size: 28, className: 'heartE' },
  { key: 'f', size: 50, className: 'heartF' },
] as const

const Adventure = () => {
  return (
    <section id={SECTION_IDS.ADVENTURE} className={styles.root}>
      <img
        className={styles.clouds}
        src="/images/adventure-fly3.png"
        alt=""
        aria-hidden="true"
        width={1672}
        height={940}
      />
      <img
        className={styles.balloon}
        src="/images/adventure-fly2.png"
        alt=""
        aria-hidden="true"
        width={1024}
        height={1536}
      />
      <img
        className={styles.candy}
        src="/images/sweet-3.png"
        alt=""
        aria-hidden="true"
        width={534}
        height={308}
      />
      <SvgIcon id="icon-doodle-spring" width={170} height={108} className={styles.trail} />

      {HEARTS.map(({ key, size, className }) => (
        <SvgIcon
          key={key}
          id="icon-heart"
          width={size}
          height={size}
          className={[styles.heart, styles[className]].join(' ')}
        />
      ))}

      <div className={styles.stage}>
        <img
          className={styles.plane}
          src="/images/adventure-fly.png"
          alt="An aeroplane made of candy, its cabin packed with gumballs"
          width={1254}
          height={1254}
        />

        <div className={styles.side}>
          {/*
            A prop, not a control: the buttons are spans so nothing announces
            itself as clickable when there is nothing behind it. The copy inside
            is real text.
          */}
          <div className={styles.dialog}>
            <div className={styles.dialogBar} aria-hidden="true">
              <span className={styles.dialogClose}>
                <SvgIcon id="icon-close" width={11} height={11} />
              </span>
            </div>
            <div className={styles.dialogBody}>
              <p>
                A flight on a plane of lollipops, with chocolate wings, caramel engines and a vanilla
                fuselage.
              </p>
              <div className={styles.dialogActions} aria-hidden="true">
                <span className={styles.accept}>accept</span>
                <span className={styles.decline}>decline</span>
              </div>
            </div>
          </div>

          <SvgIcon id="icon-star-4" width={26} height={26} className={styles.spark} />

          <h2 className={styles.title}>Every flight here is an unforgettable trip</h2>
        </div>
      </div>

      <Container>
        <p className={styles.note}>
          Buckle up your marshmallow seatbelts and set off on the sweetest journey of your life.
        </p>
      </Container>
    </section>
  )
}

export default Adventure
