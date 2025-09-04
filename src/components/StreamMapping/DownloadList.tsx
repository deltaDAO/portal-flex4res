import {
  Asset,
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
import styles from './DownloadList.module.css'
import { VsmData } from './_types'
import { useProfile } from '@context/Profile'
import { exampleVSMData } from './_constants'
import { Signer } from 'ethers'
import { accessDetails, getCsv, toVsmData } from './_utils'
import VSMDownloads from './Downloads'

export default function DownloadList({
  setVsmData
}: {
  setVsmData: (vsmData: VsmData) => void
}): ReactElement {
  const { address: accountId } = useAccount()
  const { chainIds } = useUserPreferences()
  const { downloads } = useProfile()
  const [filteredDownloads, setFilteredDownloads] =
    useState<DownloadedAsset[]>()
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

    const filteredDownloadList = downloads.filter(
      (download: DownloadedAsset) => {
        const tags = download?.asset?.metadata?.tags || []
        return tags.some((tag: string) => tag?.toLowerCase() === 'vsm')
      }
    )

    setFilteredDownloads(filteredDownloadList)
  }, [downloads, chainIds])

  async function handleSelectDataset(asset: Asset) {
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
          handleSelectDataset={handleSelectDataset}
          downloads={filteredDownloads}
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
