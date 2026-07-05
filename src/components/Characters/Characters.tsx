import { SECTION_IDS } from '@/lib/constants'
import { CHARACTERS } from '@/lib/characters'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import CharacterCard from '@/components/CharacterCard'
import styles from './Characters.module.scss'

const Characters = () => {
  return (
    <section id={SECTION_IDS.CHARACTERS} className={styles.root}>
      <Container>
        <SectionTitle kicker="Meet the other" variant="filled" tone="pink" align="center">
          residents
        </SectionTitle>
        <div className={styles.grid}>
          {CHARACTERS.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Characters
