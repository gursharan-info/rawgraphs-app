import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
// @ts-expect-error TS(6142): Module '../../constants' was resolved to '/Users/g... Remove this comment to see the full error message
import { dataTypeIcons } from '../../constants'
// @ts-expect-error TS(2307): Cannot find module './DataMapping.module.scss' or ... Remove this comment to see the full error message
import styles from './DataMapping.module.scss'

function DataTypeIcon({
  type
}: any) {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const DataTypeIcon = dataTypeIcons[type]
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <span>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip id={`tooltip-top`}>
            Accepts {type}s
          </Tooltip>
        }
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DataTypeIcon className={styles['accepted-type-icon']} />
      </OverlayTrigger>
    </span>
  )
}

export default DataTypeIcon
