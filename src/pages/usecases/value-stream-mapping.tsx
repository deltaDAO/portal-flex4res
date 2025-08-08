import { ReactElement } from 'react'
import Page from '@shared/Page'
import { useRouter } from 'next/router'
import ValueStreamMapping from '@components/StreamMapping'
import content from 'content/pages/valueStreamMapping.json'

export default function PageValueStreamMapping(): ReactElement {
  const router = useRouter()

  const { title, description } = content

  return (
    <Page title={title} description={description} uri={router.route}>
      <ValueStreamMapping />
    </Page>
  )
}
