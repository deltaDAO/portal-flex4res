import { ReactElement, use, useEffect, useState } from 'react'
import Table, { TableOceanColumn } from '@shared/atoms/Table'
import Time from '@shared/atoms/Time'
import AssetTitle from '@shared/AssetListTitle'
import NetworkName from '@shared/NetworkName'
import { useProfile } from '@context/Profile'
import { useUserPreferences } from '@context/UserPreferences'
import Button from '@components/@shared/atoms/Button'

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
    selector: (row) => <Time date={row.timestamp.toString()} relative isUnix />
  }
]

export default function ComputeDownloads({
  accountId,
  onUseCase,
  handleUseIt,
  jobs
}: {
  onUseCase?: boolean
  accountId: string
  handleUseIt?: (asset: DownloadedAsset) => void
  jobs?: DownloadedAsset[]
}): ReactElement {
  const { downloads, isDownloadsLoading } = useProfile()
  const { chainIds } = useUserPreferences()
  const newColumns = onUseCase
    ? [
        ...columns,
        {
          name: 'Use it',
          selector: (row) => (
            <Button onClick={() => handleUseIt(row.asset)}>Use it</Button>
          )
        }
      ]
    : columns

  return accountId ? (
    <Table
      columns={newColumns}
      data={jobs || downloads}
      paginationPerPage={10}
      isLoading={isDownloadsLoading}
      emptyMessage={chainIds.length === 0 ? 'No network selected' : null}
    />
  ) : (
    <div>Please connect your wallet.</div>
  )
}
