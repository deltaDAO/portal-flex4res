import React, { ReactElement } from 'react'
import styles from './KPIs.module.css'
import Container from '../../@shared/atoms/Container'

export default function KPIs({
  content
}: {
  content: { label: string }[]
}): ReactElement {
  return (
    <Container className={styles.container}>
      <h2>Key Dates</h2>
      <div className={styles.content}>
        {content &&
          content.map((kpi) => (
            <div className={styles.kpi} key={`KPI_Item_${kpi.label}`}>
              <h4>123</h4>
              <span>{kpi.label}</span>
            </div>
          ))}
      </div>
    </Container>
  )
}
