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
          content.map((kpi) => (
            <div className={styles.kpi} key={`KPI_Item_${kpi.label}`}>
              <h4>{kpi.value}</h4>
              <span>{kpi.label}</span>
            </div>
          ))}
      </div>
    </Container>
  )
}
