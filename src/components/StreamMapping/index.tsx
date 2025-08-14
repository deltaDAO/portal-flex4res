import Container from '@components/@shared/atoms/Container'
import { VsmData } from './_types'
import MapSVG from './Map'
import JobList from './JobList'
import { useState } from 'react'

export default function ValueStreamMapping() {
  const [vsmData, setVsmData] = useState<VsmData | null>(null)
  const exampleMapSVGProps: VsmData = {
    saegen: {},
    drehen: {},
    fraesen: {},
    waschen: {},
    messen: {
      ks: {},
      d25: {},
      d40: {},
      rz: '',
      schichten: 0,
      lg: ''
    },
    vormontage: {},
    endMontageD40: {},
    endMontageD25: {},
    funktionspruefung: {},
    verpackung: {}
  }
  return (
    <Container>
      <JobList setVsmData={setVsmData} />
      <MapSVG {...(vsmData || exampleMapSVGProps)} />
    </Container>
  )
}
