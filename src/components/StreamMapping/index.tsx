import Container from '@components/@shared/atoms/Container'
import MapSVG, { MapSVGProps } from './map'

export default function ValueStreamMapping() {
  const exampleMapSVGProps: MapSVGProps = {
    saegen: {
      bzD25: 120,
      bzD40: 95,
      zzD25: 80,
      zzD40: 70,
      rz: 'RZ-SG-01',
      oee: 0.85,
      schichten: 3,
      lg: 101
    },
    drehen: {
      pz: 150,
      zz: 'ZZ-DR-02',
      rz: 'RZ-DR-01',
      oee: 0.78,
      schichten: 2,
      pm: 45,
      lg: 102
    },
    fraesen: {
      pzD25: 130,
      pzD40: 110,
      zzD25: 90,
      zzD40: 85,
      rz: 'RZ-FR-01',
      oee: 0.82,
      schichten: 2,
      pm: 50,
      lg: 103
    },
    waschen: {
      zz: 60,
      schichten: 1,
      ruesten: 15,
      lg: 104
    },
    messen: {
      ks: { bz: 40, zz: 'ZZ-MS-KS' },
      d25: { bz: 35, zz: 'ZZ-MS-D25' },
      d40: { bz: 30, zz: 'ZZ-MS-D40' },
      rz: 'RZ-MS-01',
      schichten: 1,
      lg: 'LG-MS-01'
    },
    vormontage: {
      pz: 100,
      zz: 'ZZ-VM-01',
      schichten: 2,
      lg: 'LG-VM-01'
    },
    endMontageD40: {
      pz: 90,
      zz: 'ZZ-EM40-01',
      schichten: 2,
      lg: 'LG-EM40-01'
    },
    endMontageD25: {
      pz: 85,
      zz: 'ZZ-EM25-01',
      schichten: 2,
      lg: 'LG-EM25-01'
    },
    funktionspruefung: {
      pz: 75,
      zz: 'ZZ-FP-01'
    }
  }
  return (
    <Container>
      <MapSVG {...exampleMapSVGProps} />
    </Container>
  )
}
