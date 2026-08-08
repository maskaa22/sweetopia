import { SECTION_IDS } from '@/lib/constants'
import Container from '@/components/Container'
import SvgIcon from '@/components/SvgIcon'
import styles from './Citizens.module.scss'

const Citizens = () => {
  return (
    <section id={SECTION_IDS.CITIZENS} className={styles.root}>
      <img className={styles.cake} src="/images/sweet-1.png" alt="" aria-hidden="true" />
      <img className={styles.lollipop} src="/images/sweet-2.png" alt="" aria-hidden="true" />
      <img className={styles.candy} src="/images/sweet-3.png" alt="" aria-hidden="true" />

      <Container>
        <h2 className={styles.title}>Kingdom residents</h2>

        <div className={styles.grid}>
          <img
            className={styles.figure}
            src="/images/citizens.png"
            alt="A smiling pink cupcake character with sprinkles and raspberry ears"
            width={1362}
            height={1155}
          />

          <div className={styles.panel}>
            {/*
              Arch and orbit share one coordinate system so the weave lands
              exactly: whatever is drawn later wins at each crossing. Order is
              far side of the orbit, then the arch over it, then the near side
              over the arch. Both breaks are cut into the geometry rather than
              dashed -- the box stretches, and a dash pattern measured against
              the stretched path length would not stay put.
            */}
            <svg
              className={styles.frame}
              viewBox="0 0 320 470"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="citizens-line" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-pink)" />
                  <stop offset="100%" stopColor="var(--color-blue)" />
                </linearGradient>

                {/* Everything except the arch's silhouette, so the far side of
                    the orbit disappears where the arch stands in front of it. */}
                <mask
                  id="citizens-outside-arch"
                  maskUnits="userSpaceOnUse"
                  x="-140"
                  y="-60"
                  width="600"
                  height="640"
                >
                  <rect x="-140" y="-60" width="600" height="640" fill="#fff" />
                  <path d="M1 469V160a159 159 0 0 1 318 0v309Z" fill="#000" />
                </mask>
              </defs>

              {/*
                The mask sits on the outer group, outside the scaling one. Its
                silhouette is written in root user space, the same space the
                arch is drawn in -- put it on the inner, transformed element and
                it scales along with the orbit, cutting somewhere off the wall.
              */}
              <g mask="url(#citizens-outside-arch)">
                <g className={styles.orbitBack}>
                  <path
                    d="M-78 441.8A235 76 -14 0 1 378 328.2"
                    fill="none"
                    stroke="url(#citizens-line)"
                    strokeWidth="1.6"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>

              <path
                d="M1 469V160A159 159 0 0 1 304.1 92.8"
                fill="none"
                stroke="url(#citizens-line)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M319 170V469H1"
                fill="none"
                stroke="url(#citizens-line)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />

              <g className={styles.orbitFront}>
                <path
                  d="M378 328.2A235 76 -14 0 1 34.3 478"
                  fill="none"
                  stroke="url(#citizens-line)"
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M-38.3 471.1A235 76 -14 0 1 -78 441.8"
                  fill="none"
                  stroke="url(#citizens-line)"
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            </svg>

            <SvgIcon id="icon-star-4" width={38} height={38} className={styles.starTop} />
            <SvgIcon id="icon-star-4" width={44} height={44} className={styles.starBottom} />
            <SvgIcon id="icon-star-4" width={22} height={22} className={styles.starSmall} />

            <div className={styles.copy}>
              <p>Kind and cheerful creatures who love to spend their time eating sweets.</p>
              <p>They wear clothes made of candy and decorate their hair with caramel ribbons.</p>
              <p>
                The residents of the kingdom always smile and laugh, for they live in a world full
                of joy and happiness.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Citizens
