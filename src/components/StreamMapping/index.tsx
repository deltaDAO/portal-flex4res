import Container from '@components/@shared/atoms/Container'
import { VsmData } from './_types'
import MapSVG from './Map'
import JobList from './JobList'
import { useState } from 'react'
import { exampleVSMData } from './_constants'
import MapData from './MapData'
import styles from './index.module.css'

export default function ValueStreamMapping() {
  const [vsmData, setVsmData] = useState<VsmData>(exampleVSMData)
  return (
    <Container>
      <JobList setVsmData={setVsmData} />
      <div className={styles.svgContainer}>
        <MapSVG {...vsmData} />
        <MapData {...vsmData} />
      </div>
    </Container>
  )
}
