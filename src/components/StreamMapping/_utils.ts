import { Asset, LoggerInstance } from '@oceanprotocol/lib'
import type { VsmData, CsvRow } from './_types'
import { getAccessDetails } from '@utils/accessDetailsAndPricing'
import Papa from 'papaparse'
import { toast } from 'react-toastify'
import axios from 'axios'

function normalizeNumber(input?: string | number | null): number | undefined {
  if (input === null) return undefined
  const trimmedString = String(input).trim()
  if (!trimmedString) return undefined
  const parsedNumber = Number(trimmedString.replace(',', '.'))
  return Number.isFinite(parsedNumber) ? parsedNumber : undefined
}

function normalizeString(value?: string) {
function normalizeString(value?: string) {
  // If value is null, undefined, or an empty string, return '' immediately.
  if (!value) {
    return ''
  }
  return value.trim().toLowerCase()
}
}

/**
 * Transforms CSV rows into VSM data format.
 * @param rows - The CSV rows to transform.
 * @returns The transformed VSM data.
 */
export function toVsmData(rows: CsvRow[]): VsmData {
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
    const processName = normalizeString(row.Prozess)
    if (!processName) continue // Skip empty process names

    switch (processName) {
      case 'sägen':
      case 'saegen': {
        const teil = (row.Teil || '').toUpperCase()
        if (teil === 'D25') {
          vsm.saegen.bzD25 = normalizeNumber(row.Bearbeitungszeit_s)
          vsm.saegen.zzD25 = normalizeNumber(row.Zykluszeit_s)
        } else if (teil === 'D40') {
          vsm.saegen.bzD40 = normalizeNumber(row.Bearbeitungszeit_s)
          vsm.saegen.zzD40 = normalizeNumber(row.Zykluszeit_s)
        }
        vsm.saegen.rz ??= row.Ruestzeit_s?.trim()
        vsm.saegen.oee ??= normalizeNumber(row.OEE) * 100
        vsm.saegen.schichten ??= normalizeNumber(row.Schichten)
        vsm.saegen.lg ??= normalizeNumber(row.Losgroesse)
        vsm.saegen.kommentar ??= row.Kommentar?.trim()
        break
      }

      case 'kolbenstangen drehen': {
        vsm.drehen.pz = normalizeNumber(row.Prozesszeit_s)
        vsm.drehen.zz = row.Zykluszeit_s?.trim()
        vsm.drehen.rz = row.Ruestzeit_s?.trim()
        vsm.drehen.oee = normalizeNumber(row.OEE) * 100
        vsm.drehen.schichten = normalizeNumber(row.Schichten)
        vsm.drehen.pm = normalizeNumber(row.Prozessmenge)
        vsm.drehen.lg = normalizeNumber(row.Losgroesse)
        vsm.drehen.kommentar = row.Kommentar?.trim()
        break
      }

      case 'gehäuseboden fräsen':
      case 'gehaeuseboden fraesen': {
        const teil = (row.Teil || '').toUpperCase()
        if (teil === 'D25') {
          vsm.fraesen.pzD25 = normalizeNumber(row.Prozesszeit_s)
          vsm.fraesen.zzD25 = normalizeNumber(row.Zykluszeit_s)
        } else if (teil === 'D40') {
          vsm.fraesen.pzD40 = normalizeNumber(row.Prozesszeit_s)
          vsm.fraesen.zzD40 = normalizeNumber(row.Zykluszeit_s)
        }
        vsm.fraesen.rz ??= row.Ruestzeit_s?.trim()
        vsm.fraesen.oee ??= normalizeNumber(row.OEE) * 100
        vsm.fraesen.schichten ??= normalizeNumber(row.Schichten)
        vsm.fraesen.pm ??= normalizeNumber(row.Prozessmenge)
        vsm.fraesen.lg ??= normalizeNumber(row.Losgroesse)
        vsm.fraesen.kommentar ??= row.Kommentar?.trim()
        break
      }

      case 'waschen': {
        vsm.waschen.zz = normalizeNumber(row.Zykluszeit_s)
        vsm.waschen.schichten = normalizeNumber(row.Schichten)
        vsm.waschen.ruesten = normalizeNumber(row.Ruestzeit_s)
        vsm.waschen.lg = normalizeNumber(row.Losgroesse)
        break
      }

      case 'messen': {
        const target = (row.Teil || '').toUpperCase()
        const setBzZz = (key: 'ks' | 'd25' | 'd40') => {
          vsm.messen[key].bz = normalizeNumber(row.Prozesszeit_s)
          vsm.messen[key].zz = row.Zykluszeit_s?.trim()
        }
        if (target === 'KS') setBzZz('ks')
        else if (target === 'D25') setBzZz('d25')
        else if (target === 'D40') setBzZz('d40')

        vsm.messen.rz = row.Ruestzeit_s?.trim() ?? vsm.messen.rz
        vsm.messen.schichten =
          normalizeNumber(row.Schichten) ?? vsm.messen.schichten
        vsm.messen.lg = row.Losgroesse?.trim() || vsm.messen.lg
        vsm.messen.kommentar = row.Kommentar?.trim() || vsm.messen.kommentar
        break
      }

      case 'vormontage': {
        vsm.vormontage.pz = normalizeNumber(row.Prozesszeit_s)
        vsm.vormontage.zz = row.Zykluszeit_s?.trim()
        vsm.vormontage.schichten = normalizeNumber(row.Schichten)
        vsm.vormontage.lg = row.Losgroesse?.trim()
        break
      }

      case 'endmontage': {
        const teil = (row.Teil || '').toUpperCase()
        const tgt = teil === 'D40' ? 'endMontageD40' : 'endMontageD25'
        const m = vsm[tgt as 'endMontageD25' | 'endMontageD40']
        m.pz = normalizeNumber(row.Prozesszeit_s)
        m.zz = row.Zykluszeit_s?.trim()
        m.schichten = normalizeNumber(row.Schichten)
        m.lg = row.Losgroesse?.trim()
        break
      }

      case 'funktionsprüfung':
      case 'funktionspruefung': {
        vsm.funktionspruefung.pz = normalizeNumber(row.Prozesszeit_s)
        vsm.funktionspruefung.zz = row.Zykluszeit_s?.trim()
        vsm.funktionspruefung.scan = parseInt(
          row.Kommentar?.trim().match(/^\d+/)[0] // Extracts leading number
        )
        vsm.funktionspruefung.bzZz = parseInt(
          row.Kommentar?.trim().match(/(\d+)\s*s?$/i)[0] // Extracts trailing number
        )
        vsm.funktionspruefung.schichten = normalizeNumber(row.Schichten)
        vsm.funktionspruefung.ausschuss = row.Ausschuss
        vsm.funktionspruefung.lg = row.Losgroesse?.trim()
        break
      }

      case 'verpackung': {
        vsm.verpackung.bz = normalizeNumber(row.Prozesszeit_s)
        vsm.verpackung.zz = normalizeNumber(row.Zykluszeit_s)
        vsm.verpackung.schichten = normalizeNumber(row.Schichten)
        break
      }

      default:
        break
    }
  }

  return vsm
}

export async function accessDetails(asset: Asset, accountId: string) {
  const accessDetails = await getAccessDetails(
    asset.chainId,
    asset.services[0].datatokenAddress,
    asset.services[0].timeout,
    accountId
  )
  const fullAsset = {
    ...asset,
    accessDetails
  }
  return fullAsset
}

export async function getCsv(downloadLink: string): Promise<CsvRow[]> {
  let csvData: string
  try {
    const response = await axios.get(downloadLink)
    csvData = response.data
  } catch (error) {
    toast.error('Error fetching CSV:', error)
    LoggerInstance.error('Error fetching CSV:', error)
  }
  try {
    const parsedData = Papa.parse(csvData, {
      header: true
    })
    return parsedData.data as CsvRow[]
  } catch (error) {
    toast.error('Error parsing CSV:', error)
    LoggerInstance.error('Error parsing CSV:', error)
  }
}
