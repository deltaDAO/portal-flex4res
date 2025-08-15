import Container from '@components/@shared/atoms/Container'
import { VsmData } from './_types'
import MapSVG from './Map'
import JobList from './JobList'
import { useState } from 'react'
import { exampleVSMData } from './_constants'

export default function ValueStreamMapping() {
  const [vsmData, setVsmData] = useState<VsmData>(exampleVSMData)
  return (
    <Container>
      <JobList setVsmData={setVsmData} />
      <MapSVG {...vsmData} />
    </Container>
  )
}
