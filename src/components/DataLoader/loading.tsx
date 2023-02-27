import React from 'react'
// @ts-expect-error TS(2307): Cannot find module './DataLoader.module.scss' or i... Remove this comment to see the full error message
import styles from './DataLoader.module.scss'

export default function Loading() {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles['loading-component']}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles['bg-animated']}/>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <p>loading...</p>
    </div>
  )
}