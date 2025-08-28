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
import { VsmData } from './_types'
import { useProfile } from '@context/Profile'
import { exampleVSMData } from './_constants'
import { Signer } from 'ethers'
import { accessDetails, getCsv, toVsmData } from './_utils'
import VSMDownloads from './DownloadsList'

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

    const filteredJobs = downloads.filter((job: DownloadedAsset) => {
      const tags = job?.asset?.metadata?.tags || []
      return tags.some((tag: string) => tag?.toLowerCase() === 'vsm')
    })

    setJobs(filteredJobs)
  }, [downloads, chainIds])

  async function handleUseIt(asset: DownloadedAsset) {
    const fullAsset = await accessDetails(asset, accountIdToUse)
    let downloadUrl: string | undefined
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
    const csvData = await getCsv(downloadUrl)
    const newVsmData = toVsmData(csvData)
    setVsmData(newVsmData)
  }

  return (
    <div className={styles.accordionWrapper}>
      <Accordion title="Datasets" defaultExpanded>
        <VSMDownloads
          accountId={accountId}
          handleUseIt={handleUseIt}
          jobs={jobs}
        />

        <div className={styles.actions}>
          <Button
            onClick={() => {
              setVsmData(exampleVSMData)
            }}
          >
            Clear Data
          </Button>
        </div>
      </Accordion>
    </div>
  )
}
