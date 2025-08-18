import { VsmData } from './_types'

export const exampleVSMData: VsmData = {
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
} as const
