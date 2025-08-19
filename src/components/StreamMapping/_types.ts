interface BzZz {
  bz?: number
  zz?: string
}

interface Montage {
  pz?: number
  zz?: string
  schichten?: number
  lg?: string
}

export interface VsmData {
  saegen: {
    bzD25?: number
    bzD40?: number
    zzD25?: number
    zzD40?: number
    rz?: string
    oee?: number
    schichten?: number
    lg?: number
    kommentar?: string
  }
  drehen: {
    pz?: number
    zz?: string
    rz?: string
    oee?: number
    schichten?: number
    pm?: number
    lg?: number
    kommentar?: string
  }
  fraesen: {
    pzD25?: number
    pzD40?: number
    zzD25?: number
    zzD40?: number
    rz?: string
    oee?: number
    schichten?: number
    pm?: number
    lg?: number
    kommentar?: string
  }
  waschen: {
    zz?: number
    schichten?: number
    ruesten?: number
    lg?: number
  }
  messen: {
    ks?: BzZz
    d25?: BzZz
    d40?: BzZz
    rz?: string
    schichten?: number
    lg?: string
    kommentar?: string
  }
  vormontage: Montage
  endMontageD40: Montage
  endMontageD25: Montage
  funktionspruefung: {
    pz?: number
    zz?: string
    scan?: number
    bzZz?: number
    schichten?: number
    ausschuss?: string
    lg?: string
  }
  verpackung: {
    bz?: number
    zz?: number
    schichten?: number
  }
}

export interface RawRow {
  Prozess: string
  Teil?: string
  Prozesszeit_s?: string
  PZ_Durchmesser_mm?: string
  Zykluszeit_s?: string
  Bearbeitungszeit_s?: string
  Ruestzeit_s?: string
  Schichten?: string
  Losgroesse?: string
  OEE?: string
  Prozessmenge?: string
  Ausschuss?: string
  Kommentar?: string
}
