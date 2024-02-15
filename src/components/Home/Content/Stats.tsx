import React, { ReactElement } from 'react'
import styles from './Stats.module.css'
import Container from '../../@shared/atoms/Container'

export default function Stats({
  content
}: {
  content: { label: string; value: number }[]
}): ReactElement {
  return (
    <Container className={styles.container}>
      <h2>Key Dates</h2>
      <div className={styles.content}>
        {content &&
          content.map((stat) => (
            <div className={styles.stat} key={`stat_item_${stat.label}`}>
              <h4>{stat.value}</h4>
              <span>{stat.label}</span>
            </div>
          ))}
      </div>
    </Container>
  )
}
