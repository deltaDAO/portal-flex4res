import { ReactElement } from 'react'
import Page from '@shared/Page'
import ValueStreamMapping from '@components/StreamMapping'
import content from 'content/pages/valueStreamMapping.json'
import ProfileProvider from '@context/Profile'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'

export default function PageValueStreamMapping(): ReactElement {
  const router = useRouter()
  const { title, description } = content
  const { address: accountId } = useAccount()

  return (
    <ProfileProvider accountId={accountId} ownAccount>
      <Page title={title} description={description} uri={router.route}>
        <ValueStreamMapping />
      </Page>
    </ProfileProvider>
  )
}
