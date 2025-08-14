import { ReactElement, useEffect, useState } from 'react'
import Page from '@shared/Page'
import { useRouter } from 'next/router'
import ValueStreamMapping from '@components/StreamMapping'
import content from 'content/pages/valueStreamMapping.json'
import ProfileProvider from '@context/Profile'
import { useAccount } from 'wagmi'
import { useAutomation } from '@context/Automation/AutomationProvider'
import { isAddress } from 'ethers/lib/utils.js'

export default function PageValueStreamMapping(): ReactElement {
  const router = useRouter()

  const { title, description } = content
  const { address: accountId } = useAccount()
  const { autoWallet } = useAutomation()
  const [finalAccountId, setFinalAccountId] = useState<string>()
  const [ownAccount, setOwnAccount] = useState(false)

  // Have accountId in path take over, if not present fall back to web3
  useEffect(() => {
    async function init() {
      if (!router?.route) return

      // Path is root /usecases/value-stream-mapping, have web3 take over
      if (router.route === '/usecases/value-stream-mapping') {
        setFinalAccountId(accountId)
        setOwnAccount(true)
        return
      }

      const pathAccount = router.query.account as string

      // Path has ETH address
      if (isAddress(pathAccount)) {
        setOwnAccount(
          pathAccount === accountId || pathAccount === autoWallet?.address
        )
        const finalAccountId = pathAccount || accountId
        setFinalAccountId(finalAccountId)
      }
    }
    init()
  }, [router, accountId, autoWallet?.address])

  return (
    <ProfileProvider accountId={finalAccountId} ownAccount={ownAccount}>
      <Page title={title} description={description} uri={router.route}>
        <ValueStreamMapping />
      </Page>
    </ProfileProvider>
  )
}
