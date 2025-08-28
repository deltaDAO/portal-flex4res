import { ReactElement, use, useEffect, useState } from 'react'
import Table, { TableOceanColumn } from '@shared/atoms/Table'
import Time from '@shared/atoms/Time'
import AssetTitle from '@shared/AssetListTitle'
import NetworkName from '@shared/NetworkName'
import { useProfile } from '@context/Profile'
import { useUserPreferences } from '@context/UserPreferences'
import Button from '@components/@shared/atoms/Button'

export default function VSMDownloads({
  accountId,
  handleUseIt,
  jobs
}: {
  accountId: string
  handleUseIt?: (asset: DownloadedAsset) => void
  jobs?: DownloadedAsset[]
}): ReactElement {
  const { isDownloadsLoading } = useProfile()
  const { chainIds } = useUserPreferences()
  const columns: TableOceanColumn<DownloadedAsset>[] = [
    {
      name: 'Dataset',
      selector: (row) => <AssetTitle asset={row.asset} />
    },
    {
      name: 'Network',
      selector: (row) => <NetworkName networkId={row.networkId} />
    },
    {
      name: 'Datatoken',
      selector: (row) => row.dtSymbol
    },
    {
      name: 'Time',
      selector: (row) => (
        <Time date={row.timestamp.toString()} relative isUnix />
      )
    },
    {
      name: 'Use it',
      selector: (row) => (
        <Button onClick={() => handleUseIt(row.asset)}>Use it</Button>
      )
    }
  ]

  return accountId ? (
    <Table
      columns={columns}
      data={jobs}
      paginationPerPage={10}
      isLoading={isDownloadsLoading}
      emptyMessage={chainIds.length === 0 ? 'No network selected' : null}
    />
  ) : (
    <div>Please connect your wallet.</div>
  )
}
