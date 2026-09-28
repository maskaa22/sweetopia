import { Link } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'
import PageShell from '@/components/PageShell'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <PageShell
      kicker="There is no such"
      title="sweet here"
      lead="Whatever you were looking for has been eaten, or never existed."
    >
      <Link to={ROUTES.HOME} className={styles.back}>
        Back to the kingdom
      </Link>
    </PageShell>
  )
}

export default NotFound
