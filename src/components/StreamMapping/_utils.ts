import { LoggerInstance } from '@oceanprotocol/lib'
import type { VsmData, CsvRow } from './_types'
import { getAccessDetails } from '@utils/accessDetailsAndPricing'
import Papa from 'papaparse'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'

function num(value?: string) {
  return yup
    .number()
    .transform((_, originalValue) => {
      if (originalValue == null) return undefined
      const trimmedValue = String(originalValue).trim()
      if (!trimmedValue) return undefined
      const parsedNumber = Number(trimmedValue.replace(',', '.'))
      return Number.isFinite(parsedNumber) ? parsedNumber : undefined
    })
    .nullable()
    .validateSync(value)
}

function norm(value?: string) {
  return (value || '').trim().toLowerCase()
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
    const processName = norm(row.Prozess)
    if (!processName) continue // Skip empty process names

    switch (processName) {
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
        vsm.saegen.oee ??= num(row.OEE) * 100
        vsm.saegen.schichten ??= num(row.Schichten)
        vsm.saegen.lg ??= num(row.Losgroesse)
        vsm.saegen.kommentar ??= row.Kommentar?.trim()
        break
      }

      case 'kolbenstangen drehen': {
        vsm.drehen.pz = num(row.Prozesszeit_s)
        vsm.drehen.zz = row.Zykluszeit_s?.trim()
        vsm.drehen.rz = row.Ruestzeit_s?.trim()
        vsm.drehen.oee = num(row.OEE) * 100
        vsm.drehen.schichten = num(row.Schichten)
        vsm.drehen.pm = num(row.Prozessmenge)
        vsm.drehen.lg = num(row.Losgroesse)
        vsm.drehen.kommentar = row.Kommentar?.trim()
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
        vsm.fraesen.oee ??= num(row.OEE) * 100
        vsm.fraesen.schichten ??= num(row.Schichten)
        vsm.fraesen.pm ??= num(row.Prozessmenge)
        vsm.fraesen.lg ??= num(row.Losgroesse)
        vsm.fraesen.kommentar ??= row.Kommentar?.trim()
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

        vsm.messen.rz = row.Ruestzeit_s?.trim() ?? vsm.messen.rz
        vsm.messen.schichten = num(row.Schichten) ?? vsm.messen.schichten
        vsm.messen.lg = row.Losgroesse?.trim() || vsm.messen.lg
        vsm.messen.kommentar = row.Kommentar?.trim() || vsm.messen.kommentar
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
        vsm.funktionspruefung.scan = parseInt(
          row.Kommentar?.trim().match(/^\d+/)[0] // Extracts leading number
        )
        vsm.funktionspruefung.bzZz = parseInt(
          row.Kommentar?.trim().match(/(\d+)\s*s?$/i)[0] // Extracts trailing number
        )
        vsm.funktionspruefung.schichten = num(row.Schichten)
        vsm.funktionspruefung.ausschuss = row.Ausschuss
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

export async function accessDetails(asset, accountId: string) {
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
  try {
    const response = await axios.get(downloadLink)
    const csvData = response.data
    const parsedData = Papa.parse(csvData, {
      header: true
    })
    return parsedData.data as CsvRow[]
  } catch (error) {
    toast.error('Error fetching CSV:', error)
    LoggerInstance.error('Error fetching CSV:', error)
  }
}
