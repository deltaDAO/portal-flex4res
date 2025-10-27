import Container from '@components/@shared/atoms/Container'
import { VsmData } from './_types'
import MapSVG from '@images/Wertstrom_CIP_Demonstrator.svg'
import { useState } from 'react'
import { exampleVSMData } from './_constants'
import MapData from './MapData'
import styles from './index.module.css'
import DownloadList from './DownloadList'

export default function ValueStreamMapping() {
  const [vsmData, setVsmData] = useState<VsmData>(exampleVSMData)
  return (
    <Container>
      <DownloadList setVsmData={setVsmData} />
      <div className={styles.svgContainer}>
        <MapSVG />
        <MapData {...vsmData} />
      </div>
    </Container>
  )
}
