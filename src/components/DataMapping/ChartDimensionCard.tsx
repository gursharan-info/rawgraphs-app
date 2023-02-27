import React, { useCallback } from 'react'
// @ts-expect-error TS(6142): Module './DataTypeIcon' was resolved to '/Users/gu... Remove this comment to see the full error message
import DataTypeIcon from './DataTypeIcon'
// @ts-expect-error TS(6142): Module './RequiredIcon' was resolved to '/Users/gu... Remove this comment to see the full error message
import RequiredIcon from './RequiredIcon'
import { Col } from 'react-bootstrap'
import { useDrop } from 'react-dnd'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash/get'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import uniqueId from 'lodash/uniqueId'
import classnames from 'classnames'
import arrayMove from 'array-move'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'arra... Remove this comment to see the full error message
import arrayInsert from 'array-insert'

// import { DATATYPE_ICONS } from "../../constants"
// @ts-expect-error TS(6142): Module '../../constants' was resolved to '/Users/g... Remove this comment to see the full error message
import { dataTypeIcons } from '../../constants'
import {
  getTypeName,
  getAggregatorNames,
  getDefaultDimensionAggregation,
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
} from '@rawgraphs/rawgraphs-core'
// @ts-expect-error TS(6142): Module './ChartDimensionItem' was resolved to '/Us... Remove this comment to see the full error message
import ChartDimensionItem from './ChartDimensionItem'

// @ts-expect-error TS(2307): Cannot find module './DataMapping.module.scss' or ... Remove this comment to see the full error message
import styles from './DataMapping.module.scss'
const aggregators = getAggregatorNames()
const emptyList: any = []

const ChartDimensionCard = ({
  dimension,
  dataTypes,
  mapping,
  setMapping,
  commitLocalMapping,
  rollbackLocalMapping,
  draggingId,
  setDraggingId,
  replaceDimension,
  localMappding
}: any) => {
  const [{ isOver }, drop] = useDrop({
    accept: ['column', 'card'],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item, monitor) => {
      if (item.type === 'column') {
        const defaulAggregation = dimension.aggregation
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'DragObjectWi... Remove this comment to see the full error message
          ? getDefaultDimensionAggregation(dimension, dataTypes[item.id])
          : null

        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'DragObjectWi... Remove this comment to see the full error message
        const columnDataType = getTypeName(dataTypes[item.id]);
        const isValid =
          dimension.validTypes?.length === 0 ||
          dimension.validTypes?.includes(columnDataType)

        setMapping({
          ...mapping,
          ids: (mapping.ids || []).concat(uniqueId()),
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'DragObjectWi... Remove this comment to see the full error message
          value: [...(mapping.value || []), item.id],
          isValid: isValid,
          mappedType: columnDataType,
          config: dimension.aggregation
            ? {
                aggregation: [
                  ...(get(mapping, 'config.aggregation') || []),
                  defaulAggregation,
                ],
              }
            : undefined,
        })
      // @ts-expect-error TS(2339): Property 'dimensionId' does not exist on type 'Dra... Remove this comment to see the full error message
      } else if (item.dimensionId !== dimension.id) {
        replaceDimension(
          // @ts-expect-error TS(2339): Property 'dimensionId' does not exist on type 'Dra... Remove this comment to see the full error message
          item.dimensionId,
          dimension.id,
          // @ts-expect-error TS(2339): Property 'index' does not exist on type 'DragObjec... Remove this comment to see the full error message
          item.index,
          mapping.value ? mapping.value.length : 0,
          true
        )
      }
    },
  })

  // const [collectedProps, drag] = useDrag({
  //   item: {
  //     type: 'card',

  //   }
  // })

  const setAggregation = useCallback(
    (newAggregations) => {
      setMapping({
        ...mapping,
        config: { aggregation: [...newAggregations] },
      })
    },
    [mapping, setMapping]
  )

  const idsMappedHere = get(mapping, 'ids', emptyList)
  const columnsMappedHere = get(mapping, 'value', emptyList)
  let aggregationsMappedHere = get(mapping, 'config.aggregation', emptyList)

  const onChangeAggregation = useCallback(
    (i, aggregatorName) => {
      const newAggregations = [...aggregationsMappedHere]
      newAggregations[i] = aggregatorName
      setAggregation(newAggregations)
    },
    [aggregationsMappedHere, setAggregation]
  )

  const onDeleteItem = useCallback(
    (i) => {
      let nextConfig
      if (mapping.config) {
        nextConfig = {
          ...mapping.config,
          aggregation: mapping.config.aggregation.filter((col: any, j: any) => j !== i),
        }
      }

      setMapping({
        ...mapping,
        ids: mapping.ids.filter((col: any, j: any) => j !== i),
        value: mapping.value.filter((col: any, j: any) => j !== i),
        config: nextConfig,
      })
    },
    [mapping, setMapping]
  )

  const onChangeDimension = useCallback(
    (i, newCol) => {
      setMapping({
        ...mapping,
        value: mapping.value.map((col: any, j: any) => (j === i ? newCol : col)),
      })
    },
    [mapping, setMapping]
  )

  const onMove = useCallback(
    (dragIndex, hoverIndex) => {
      let nextConfig
      if (mapping.config) {
        nextConfig = {
          ...mapping.config,
          aggregation: arrayMove(
            mapping.config.aggregation,
            dragIndex,
            hoverIndex
          ),
        }
      }

      setMapping(
        {
          ...mapping,
          ids: arrayMove(mapping.ids, dragIndex, hoverIndex),
          value: arrayMove(mapping.value, dragIndex, hoverIndex),
          config: nextConfig,
        },
        true
      )
    },
    [mapping, setMapping]
  )

  const onInsertColumn = useCallback(
    (index, item) => {
      const defaulAggregation = dimension.aggregation
        ? getDefaultDimensionAggregation(dimension, dataTypes[item.id])
        : null

      const nextId = uniqueId()
      setDraggingId(nextId)
      setMapping(
        {
          ...mapping,
          ids: arrayInsert(mapping.ids ?? [], index, nextId),
          value: arrayInsert(mapping.value ?? [], index, item.id),
          config: dimension.aggregation
            ? {
                aggregation: arrayInsert(
                  get(mapping, 'config.aggregation', []),
                  index,
                  defaulAggregation
                ),
              }
            : undefined,
        },
        true
      )
    },
    [dataTypes, dimension, mapping, setDraggingId, setMapping]
  )

  return (
    // <div
    //   className="Xcard Xp-3 Xm-2 "
    //   style={{ minWidth: 250 }}
    // >

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Col xs={6} lg={4} xl={4}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles['chart-dimension'] + ' user-select-none'}>
        {/* This is the card header */}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          className={`d-flex flex-row justify-content-between align-items-center ${styles['chart-dimension-header']}`}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="text-left">
            {dimension.validTypes.map((t: any) => {
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              return <DataTypeIcon key={t} type={t} />
              // const DataTypeIcon = dataTypeIcons[t]
              // return (
              //   <span key={t}>
              //     <DataTypeIcon className={styles['accepted-type-icon']} />
              //   </span>
              // )
            })}
          </span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="text-capitalize text-center">{dimension.name}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span
            className={styles['dimension-required'] + ' text-right'}
            style={{ opacity: dimension.required ? 1 : 0 }}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {dimension.required && <RequiredIcon />}
          </span>
        </div>

        {/* These are the columns that have been dropped on the current dimension */}
        {idsMappedHere.map((renderId: any, i: any) => {
          const columnId = columnsMappedHere[i]
          const columnDataType = getTypeName(dataTypes[columnId])
          const relatedAggregation = dimension.aggregation
            ? aggregationsMappedHere[i] ||
              getDefaultDimensionAggregation(dimension, columnDataType)
            : undefined
          const isValid =
            dimension.validTypes?.length === 0 ||
            dimension.validTypes?.includes(columnDataType)

          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const DataTypeIcon = dataTypeIcons[getTypeName(dataTypes[columnId])]

          return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ChartDimensionItem
              id={renderId}
              key={renderId}
              index={i}
              onMove={onMove}
              onChangeDimension={onChangeDimension}
              onChangeAggregation={onChangeAggregation}
              onDeleteItem={onDeleteItem}
              isValid={isValid}
              DataTypeIcon={DataTypeIcon}
              columnId={columnId}
              dimension={dimension}
              aggregators={aggregators}
              relatedAggregation={relatedAggregation}
              commitLocalMapping={commitLocalMapping}
              rollbackLocalMapping={rollbackLocalMapping}
              onInsertColumn={onInsertColumn}
              draggingColumn={draggingId === renderId}
              replaceDimension={replaceDimension}
              localMappding={localMappding}
            />
          )
        })}

        {/* This is the dropzone */}
        {(dimension.multiple || columnsMappedHere.length === 0) && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div
            className={classnames('dropzone', styles['dropzone'], {
              [styles['active']]: isOver,
            })}
            ref={drop}
          >
            {!dimension.multiple && 'Drop dimension here'}
            {dimension.multiple &&
              columnsMappedHere.length === 0 &&
              'Drop dimensions here'}
            {dimension.multiple &&
              columnsMappedHere.length > 0 &&
              'Drop another dimension here'}
          </div>
        )}
      </div>
    </Col>
  );
}

export default ChartDimensionCard
