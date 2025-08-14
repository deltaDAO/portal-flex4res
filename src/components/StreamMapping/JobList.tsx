import {
  getErrorMessage,
  LoggerInstance,
  ProviderInstance
} from '@oceanprotocol/lib'
import { ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount, useSigner } from 'wagmi'
import { useAutomation } from '../../@context/Automation/AutomationProvider'
import { useUserPreferences } from '../../@context/UserPreferences'
import Accordion from '../@shared/Accordion'
import Button from '../@shared/atoms/Button'
import styles from './JobList.module.css'
import { RawRow, VsmData } from './_types'
import ComputeDownloads from '@components/Profile/History/Downloads'
import { useProfile } from '@context/Profile'
import { VSM_ALGO_DIDS } from './_constants'
import { Signer } from 'ethers'
import { getAccessDetails } from '@utils/accessDetailsAndPricing'
import Papa from 'papaparse'
import { toVsmData } from './_utils'

export default function JobList({
  setVsmData
}: {
  setVsmData: (vsmData: VsmData) => void
}): ReactElement {
  const { address: accountId } = useAccount()
  const { chainIds } = useUserPreferences()
  const { downloads } = useProfile()
  const [jobs, setJobs] = useState<DownloadedAsset[]>()
  const [signerToUse, setSignerToUse] = useState<Signer | undefined>()
  const [accountIdToUse, setAccountIdToUse] = useState<string | undefined>()
  const { data: signer } = useSigner()
  const { isAutomationEnabled, autoWallet } = useAutomation()
  useEffect(() => {
    setSignerToUse(isAutomationEnabled ? autoWallet : signer)
    setAccountIdToUse(isAutomationEnabled ? autoWallet?.address : accountId)
  }, [isAutomationEnabled, accountId, autoWallet, signer])

  useEffect(() => {
    if (!downloads) return

    const filteredJobs = downloads.filter(
      (e) => e.asset.id === VSM_ALGO_DIDS[chainIds[0]]
    )

    setJobs(filteredJobs)
    console.log('JobList', filteredJobs)
  }, [downloads, chainIds])

  async function accessDetails(asset) {
    const accessDetails = await getAccessDetails(
      asset.chainId,
      asset.services[0].datatokenAddress,
      asset.services[0].timeout,
      accountIdToUse
    )
    const fullAsset = {
      ...asset,
      accessDetails
    }
    return fullAsset
  }

  async function getCsv(downloadLink): Promise<RawRow[]> {
    const response = await fetch(downloadLink)
    const csvData = await response.text()
    const parsedData = Papa.parse(csvData, {
      header: true
    })
    return parsedData.data as RawRow[]
  }

  const handleUseIt = async (asset) => {
    const fullAsset = await accessDetails(asset)
    let downloadUrl
    try {
      downloadUrl = await ProviderInstance.getDownloadUrl(
        fullAsset.id,
        fullAsset.services[0].id,
        0,
        fullAsset.accessDetails.validOrderTx,
        fullAsset.services[0].serviceEndpoint,
        signerToUse
      )
    } catch (error) {
      const message = getErrorMessage(error.message)
      LoggerInstance.error('[Provider Get download url] Error:', message)
      toast.error(message)
    }
    console.log('Use it clicked', { fullAsset, downloadUrl })
    const csvData = await getCsv(downloadUrl)
    console.log('CSV Data:', csvData)
    const newVsmData = toVsmData(csvData)
    console.log('New VSM Data:', newVsmData)
    setVsmData(newVsmData)
  }

  return (
    <div className={styles.accordionWrapper}>
      <Accordion title="Compute Jobs" defaultExpanded>
        <ComputeDownloads accountId={accountId} />

        <div className={styles.actions}>
          <Button
            onClick={() => {
              handleUseIt(jobs[0].asset)
            }}
          >
            Clear Data
          </Button>
        </div>
      </Accordion>
    </div>
  )
}
