import type { VsmData, RawRow } from './_types'

const num = (v?: string) => {
  if (v == null) return undefined
  const s = String(v).trim()
  if (!s) return undefined
  const n = Number(s.replace(',', '.'))
  return Number.isFinite(n) ? n : undefined
}

const percent = (v?: string) => {
  if (!v) return undefined
  const m = String(v).match(/([\d.,]+)/)
  if (!m) return undefined
  const n = Number(m[1].replace(',', '.'))
  if (!Number.isFinite(n)) return undefined
  return n > 1 ? n / 100 : n
}

const norm = (s?: string) => (s || '').trim().toLowerCase()

export function toVsmData(rows: RawRow[]): VsmData {
  const vsm: VsmData = {
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

  for (const row of rows) {
    const p = norm(row.Prozess)
    if (!p) continue

    switch (p) {
      case 'sägen':
      case 'saegen': {
        const teil = (row.Teil || '').toUpperCase()
        if (teil === 'D25') {
          vsm.saegen.bzD25 = num(row.Bearbeitungszeit_s)
          vsm.saegen.zzD25 = num(row.Zykluszeit_s)
        } else if (teil === 'D40') {
          vsm.saegen.bzD40 = num(row.Bearbeitungszeit_s)
          vsm.saegen.zzD40 = num(row.Zykluszeit_s)
        }
        vsm.saegen.rz ??= row.Ruestzeit_s?.trim()
        vsm.saegen.oee ??= num(row.OEE)
        vsm.saegen.schichten ??= num(row.Schichten)
        vsm.saegen.lg ??= num(row.Losgroesse)
        break
      }

      case 'kolbenstangen drehen': {
        vsm.drehen.pz = num(row.Prozesszeit_s)
        vsm.drehen.zz = row.Zykluszeit_s?.trim()
        vsm.drehen.rz = row.Ruestzeit_s?.trim()
        vsm.drehen.oee = num(row.OEE)
        vsm.drehen.schichten = num(row.Schichten)
        vsm.drehen.pm = num(row.Prozessmenge)
        vsm.drehen.lg = num(row.Losgroesse)
        break
      }

      case 'gehäuseboden fräsen':
      case 'gehaeuseboden fraesen': {
        const teil = (row.Teil || '').toUpperCase()
        if (teil === 'D25') {
          vsm.fraesen.pzD25 = num(row.Prozesszeit_s)
          vsm.fraesen.zzD25 = num(row.Zykluszeit_s)
        } else if (teil === 'D40') {
          vsm.fraesen.pzD40 = num(row.Prozesszeit_s)
          vsm.fraesen.zzD40 = num(row.Zykluszeit_s)
        }
        vsm.fraesen.rz ??= row.Ruestzeit_s?.trim()
        vsm.fraesen.oee ??= num(row.OEE)
        vsm.fraesen.schichten ??= num(row.Schichten)
        vsm.fraesen.pm ??= num(row.Prozessmenge)
        vsm.fraesen.lg ??= num(row.Losgroesse)
        break
      }

      case 'waschen': {
        vsm.waschen.zz = num(row.Zykluszeit_s)
        vsm.waschen.schichten = num(row.Schichten)
        vsm.waschen.ruesten = num(row.Ruestzeit_s)
        vsm.waschen.lg = num(row.Losgroesse)
        break
      }

      case 'messen': {
        const target = (row.Teil || '').toUpperCase()
        const setBzZz = (key: 'ks' | 'd25' | 'd40') => {
          vsm.messen[key].bz = num(row.Prozesszeit_s)
          vsm.messen[key].zz = row.Zykluszeit_s?.trim()
        }
        if (target === 'KS') setBzZz('ks')
        else if (target === 'D25') setBzZz('d25')
        else if (target === 'D40') setBzZz('d40')

        // Common messen fields (same across its rows)
        vsm.messen.rz = row.Ruestzeit_s?.trim() ?? vsm.messen.rz ?? ''
        vsm.messen.schichten = num(row.Schichten) ?? vsm.messen.schichten ?? 0
        vsm.messen.lg = row.Losgroesse?.trim() || vsm.messen.lg || ''
        break
      }

      case 'vormontage': {
        vsm.vormontage.pz = num(row.Prozesszeit_s)
        vsm.vormontage.zz = row.Zykluszeit_s?.trim()
        vsm.vormontage.schichten = num(row.Schichten)
        vsm.vormontage.lg = row.Losgroesse?.trim()
        break
      }

      case 'endmontage': {
        const teil = (row.Teil || '').toUpperCase()
        const tgt = teil === 'D40' ? 'endMontageD40' : 'endMontageD25'
        const m = vsm[tgt as 'endMontageD25' | 'endMontageD40']
        m.pz = num(row.Prozesszeit_s)
        m.zz = row.Zykluszeit_s?.trim()
        m.schichten = num(row.Schichten)
        m.lg = row.Losgroesse?.trim()
        break
      }

      case 'funktionsprüfung':
      case 'funktionspruefung': {
        vsm.funktionspruefung.pz = num(row.Prozesszeit_s)
        vsm.funktionspruefung.zz = row.Zykluszeit_s?.trim()
        vsm.funktionspruefung.scan = row.Kommentar?.trim()
        vsm.funktionspruefung.bzZz = undefined // not derivable from given data
        vsm.funktionspruefung.schichten = num(row.Schichten)
        vsm.funktionspruefung.ausschuss = percent(row.Ausschuss)
        vsm.funktionspruefung.lg = row.Losgroesse?.trim()
        break
      }

      case 'verpackung': {
        vsm.verpackung.bz = num(row.Prozesszeit_s)
        vsm.verpackung.zz = num(row.Zykluszeit_s)
        vsm.verpackung.schichten = num(row.Schichten)
        break
      }

      default:
        break
    }
  }

  return vsm
}
