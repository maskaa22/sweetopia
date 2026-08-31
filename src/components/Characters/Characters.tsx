import { SECTION_IDS } from '@/lib/constants'
import { CHARACTERS } from '@/lib/characters'
import SvgIcon from '@/components/SvgIcon'
import CharacterCard from '@/components/CharacterCard'
import type { CardLayout, CardShape } from '@/components/CharacterCard'
import styles from './Characters.module.scss'

// Presentation only, keyed by character id, so the data file stays free of
// layout. Each card gets its own frame shape, content order and slot on the
// scattered board.
const CARDS: Record<
  string,
  { image: string; shape: CardShape; layout: CardLayout; orbit?: boolean }
> = {
  'sugar-tree': { image: '/images/characters/1.png', shape: 'arch-mirror', layout: 'art-first' },
  'dark-choco': { image: '/images/characters/2.png', shape: 'pill', layout: 'text-first' },
  'sugar-thief': { image: '/images/characters/3.png', shape: 'wide', layout: 'row' },
  'sugar-queen': {
    image: '/images/characters/4.png',
    shape: 'arch',
    layout: 'text-first',
    orbit: true,
  },
  'mr-marshmallow': { image: '/images/characters/5.png', shape: 'pill', layout: 'text-first' },
}

const SPARKS = ['sparkA', 'sparkB', 'sparkC', 'sparkD', 'sparkE'] as const

const Characters = () => {
  return (
    <section id={SECTION_IDS.CHARACTERS} className={styles.root}>
      <div className={styles.stage}>
        {CHARACTERS.map((character) => {
          const card = CARDS[character.id]
          if (!card) return null

          return (
            <CharacterCard
              key={character.id}
              character={character}
              image={card.image}
              shape={card.shape}
              layout={card.layout}
              orbit={card.orbit}
              className={styles[character.id]}
            />
          )
        })}

        {SPARKS.map((spark) => (
          <SvgIcon
            key={spark}
            id="icon-star-4"
            width={30}
            height={30}
            className={[styles.spark, styles[spark]].join(' ')}
          />
        ))}

        <img
          className={styles.lollipop}
          src="/images/sweet-2.png"
          alt=""
          aria-hidden="true"
          width={412}
          height={504}
        />

        <h2 className={styles.title}>Meet the other residents of Sweetopia</h2>
      </div>
    </section>
  )
}

export default Characters
