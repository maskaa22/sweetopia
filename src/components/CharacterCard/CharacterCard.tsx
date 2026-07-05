import type { Character } from '@/types/content'
import MediaFrame from '@/components/MediaFrame'
import styles from './CharacterCard.module.scss'

interface CharacterCardProps {
  character: Character
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <article className={styles.root}>
      <MediaFrame
        className={styles.art}
        ratio="square"
        label={`Character: ${character.name}`}
      />
      <span className={styles.role}>{character.role}</span>
      <h3 className={styles.name}>{character.name}</h3>
      <p className={styles.desc}>{character.description}</p>
    </article>
  )
}

export default CharacterCard
