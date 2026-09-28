import { BRAND } from '@/lib/constants'
import PageShell from '@/components/PageShell'
import styles from './About.module.scss'

// Placeholder copy in the site's own voice -- written to be replaced.
const About = () => {
  return (
    <PageShell
      kicker="A few words about"
      title="the kingdom"
      lead={`${BRAND} began as a single sugar cloud and a very determined cat.`}
    >
      <div className={styles.prose}>
        <p>
          Everything here is made by the residents themselves. The Sugar Queen keeps the recipes,
          Mr. Marshmallow keeps the oven warm, and the Sugar Thief keeps everyone honest about how
          much is left.
        </p>
        <p>
          Nothing is mass produced. Each cake is assembled the morning it is sent out, which is why
          the candy bar only ever holds a handful of things at once, and why some of them run out.
        </p>
        <p>
          The gingerbread house is open to visitors, the garden is open to anyone who can find it,
          and the kitchen is open to nobody at all.
        </p>
      </div>
    </PageShell>
  )
}

export default About
