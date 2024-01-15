import { ReactElement } from 'react'
import LogoAsset from '@images/gaia-x-logo.svg'
import styles from './index.module.css'

export default function Logo(): ReactElement {
  return (
    <img
      className={styles.logo}
      alt={`Logo`}
      src={`/images/ecosystem/flex4res-logo.webp`}
    />
  )
  // <LogoAsset className={styles.logo} />
}
