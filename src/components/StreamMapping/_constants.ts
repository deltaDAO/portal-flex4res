import { VsmData } from './_types'

export const VSM_ALGO_DIDS = {
  32456:
    'did:op:366460bb62c2da1b3c656c4ce908fb224e28db86d24cd00298b7835f346bc9f8'
} as const

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
