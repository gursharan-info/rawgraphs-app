import React from 'react'
// @ts-expect-error TS(6142): Module '../../constants' was resolved to '/Users/g... Remove this comment to see the full error message
import { dataTypeIcons } from '../../constants'
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
import { getTypeName } from '@rawgraphs/rawgraphs-core'

import { useDrag } from 'react-dnd'

// @ts-expect-error TS(2307): Cannot find module './DataMapping.module.scss' or ... Remove this comment to see the full error message
import styles from './DataMapping.module.scss'

const ColumnCard = ({
  dimensionName,
  dimensionType,
  commitLocalMapping,
  rollbackLocalMapping
}: any) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id: dimensionName, type: 'column' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        commitLocalMapping()
      } else {
        rollbackLocalMapping()
      }
      // console.log('DID DROP', didDrop)
    },
  })

  const dimType = getTypeName(dimensionType)
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const DataTypeIcon = dataTypeIcons[dimType]

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      ref={drag}
      className={`column-card ${styles['column-card']} ${
        isDragging ? 'is-dragging' : ''
      }`}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DataTypeIcon className={styles['data-type-icon']} />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span className={styles['column-title']}>{dimensionName}</span>
    </div>
  )
}

export default ColumnCard
