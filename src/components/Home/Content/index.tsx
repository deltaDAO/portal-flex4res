import { ReactElement } from 'react'
import styles from './index.module.css'
import classNames from 'classnames/bind'
import content from '../../../../content/pages/home/content.json'
import Markdown from '@components/@shared/Markdown'
import Button from '@components/@shared/atoms/Button'
import InteractiveModalImage from '@components/@shared/atoms/InteractiveModalImage'
import KPIs from './KPIs'

const cx = classNames.bind(styles)

interface HomeContentData {
  teaser: {
    title: string
    tagline: string
  }
  paragraphs: {
    title: string
    body: string
    cta: string
    ctaTo: string
    image?: string
  }[]
  kpis: {
    label: string
  }[]
}

export default function HomeContent(): ReactElement {
  const { paragraphs, teaser, kpis }: HomeContentData = content

  return (
    <div className={styles.container}>
      <div className={styles.teaser}>
        <h1>{teaser.title}</h1>
        <h2>{teaser.tagline}</h2>
      </div>
      <div className={styles.paragraphs}>
        {paragraphs.map((paragraph, i) => (
          <div
            key={paragraph.title}
            className={
              i % 2 === 1
                ? cx({ paragraph: true, mirror: true })
                : styles.paragraph
            }
          >
            {paragraph.image && (
              <div className={styles.interactivity}>
                <InteractiveModalImage
                  src={paragraph.image}
                  alt={paragraph.title}
                />
              </div>
            )}
            <div
              className={`${styles.content} ${
                paragraph.image ? '' : styles.centered
              }`}
            >
              <h2>{paragraph.title}</h2>
              <Markdown text={paragraph.body} />
              <Button href={paragraph.ctaTo} style="primary">
                {paragraph.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <KPIs content={kpis} />
    </div>
  )
}
