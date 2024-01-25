import { ReactElement, useEffect, useState } from 'react'
import Button from '@shared/atoms/Button'
import LogoDeltaDAO from '@images/deltaDAO_Logo_small_RGB_positiv.svg'
import { generateBaseQuery, getFilterTerm } from '@utils/aquarius'
import { useUserPreferences } from '@context/UserPreferences'
import { SortTermOptions } from '../../@types/aquarius/SearchQuery'
import SectionQueryResult from './SectionQueryResult'
import styles from './index.module.css'
import { useAddressConfig } from '@hooks/useAddressConfig'
import TopSales from './TopSales'
import HomeContent from './Content'
import { ProjectPartners } from './ProjectPartners'

interface FeaturedSection {
  title: string
  query: SearchQuery
}

function AllAssetsButton(): ReactElement {
  return (
    <Button
      className={styles.allAssetsButton}
      style="text"
      to="/search?sort=nft.created&sortOrder=desc"
      arrow
    >
      All datasets and algorithms
    </Button>
  )
}

export default function HomePage(): ReactElement {
  const { chainIds } = useUserPreferences()
  const { featured, hasFeaturedAssets } = useAddressConfig()

  const [queryFeatured, setQueryFeatured] = useState<FeaturedSection[]>([])
  const [queryRecent, setQueryRecent] = useState<SearchQuery>()
  const [queryMostSales, setQueryMostSales] = useState<SearchQuery>()

  useEffect(() => {
    const baseParams = {
      chainIds,
      esPaginationOptions: {
        size: 4
      },
      sortOptions: {
        sortBy: SortTermOptions.Created
      } as SortOptions
    } as BaseQueryParams

    const baseParamsSales = {
      chainIds,
      esPaginationOptions: {
        size: 4
      },
      sortOptions: {
        sortBy: SortTermOptions.Orders
      } as SortOptions
    } as BaseQueryParams

    setQueryRecent(generateBaseQuery(baseParams))
    setQueryMostSales(generateBaseQuery(baseParamsSales))

    if (hasFeaturedAssets()) {
      const featuredSections = featured.map((section) => ({
        title: section.title,
        query: generateBaseQuery({
          ...baseParams,
          esPaginationOptions: {
            size: section.assets.length
          },
          filters: [getFilterTerm('_id', section.assets)]
        })
      }))

      setQueryFeatured(featuredSections)
    }
  }, [chainIds, featured, hasFeaturedAssets])

  return (
    <>
      <HomeContent />
      <TopSales title="Publishers With Most Sales" />
      {hasFeaturedAssets() && (
        <>
          {queryFeatured.map((section, i) => (
            <SectionQueryResult
              key={`${section.title}-${i}`}
              title={section.title}
              query={section.query}
            />
          ))}
        </>
      )}
      <SectionQueryResult title="Recently Published" query={queryRecent} />
      <SectionQueryResult title="Most Sales" query={queryMostSales} />
      <AllAssetsButton />

      <ProjectPartners />

      <div className={styles.poweredby}>
        <p>Powered by</p>
        <LogoDeltaDAO />
      </div>
    </>
  )
}
