import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Row, Col } from 'react-bootstrap'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import map from 'lodash/map'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
// @ts-expect-error TS(6142): Module './ColumnCard' was resolved to '/Users/gurs... Remove this comment to see the full error message
import ColumnCard from './ColumnCard'
// @ts-expect-error TS(6142): Module './ChartDimensionCard' was resolved to '/Us... Remove this comment to see the full error message
import ChartDimensionCard from './ChartDimensionCard'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash/get'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import uniqueId from 'lodash/uniqueId'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'arra... Remove this comment to see the full error message
import arrayInsert from 'array-insert'
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
import { getDefaultDimensionAggregation } from '@rawgraphs/rawgraphs-core'

function removeIndex(mapping: any, i: any) {
  let nextConfig
  if (mapping.config) {
    nextConfig = {
      ...mapping.config,
      aggregation: mapping.config.aggregation.filter((col: any, j: any) => j !== i),
    }
  }

  return {
    ...mapping,
    ids: mapping.ids.filter((col: any, j: any) => j !== i),
    value: mapping.value.filter((col: any, j: any) => j !== i),
    config: nextConfig,
  };
}

function arrayReplace(arr: any, i: any, value: any) {
  return arr.map((item: any, j: any) => (j === i ? value : item));
}

function handleReplaceLocalMapping(
  nextId: any,
  prev: any,
  fromDimension: any,
  toDimension: any,
  fromIndex: any,
  toIndex: any,
  dimensions: any,
  dataTypes: any,
  multiple = false
) {
  const removedItem = {}
  // @ts-expect-error TS(2339): Property 'aggregation' does not exist on type '{}'... Remove this comment to see the full error message
  removedItem.aggregation =
    prev[fromDimension]?.config?.aggregation?.[fromIndex]
  // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
  removedItem.value = prev[fromDimension].value[fromIndex]

  let moveFn = multiple ? arrayInsert : arrayReplace

  const prevToMapping = prev[toDimension] || {}
  const toDimensionMapping = {
    ...prevToMapping,
    ids: moveFn(prevToMapping.ids ?? [], toIndex, nextId),
    // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
    value: moveFn(prevToMapping.value ?? [], toIndex, removedItem.value),
  }

  const dimension = dimensions[toDimension]
  if (dimensions.aggregation) {
    let newAggregation
    // @ts-expect-error TS(2339): Property 'aggregation' does not exist on type '{}'... Remove this comment to see the full error message
    if (removedItem.aggregation) {
      // @ts-expect-error TS(2339): Property 'aggregation' does not exist on type '{}'... Remove this comment to see the full error message
      newAggregation = removedItem.aggregation
    } else {
      newAggregation = getDefaultDimensionAggregation(
        dimension,
        // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
        dataTypes[removedItem.value]
      )
    }
    toDimensionMapping.config = {
      aggregation: moveFn(
        get(prevToMapping, 'config.aggregation', []),
        toIndex,
        newAggregation
      ),
    }
  }
  const obj = {
    ...prev,
    [fromDimension]: removeIndex(prev[fromDimension], fromIndex),
    [toDimension]: toDimensionMapping,
  }
  return obj
}

function DataMapping({
  dataTypes,
  dimensions,
  mapping,
  setMapping
}: any, ref: any) {
  const [localMappding, setLocalMapping] = useState(mapping)

  const updateMapping = useCallback(
    (dimension, mappingConf, isLocal) => {
      // Local
      setLocalMapping((prev: any) => ({
        ...prev,
        [dimension]: mappingConf
      }))
      if (!isLocal) {
        // Gloab mapping
        setMapping((prev: any) => ({
          ...prev,
          [dimension]: mappingConf
        }))
      }
    },
    [setMapping]
  )
  const replaceDimension = useCallback(
    (fromDimension, toDimension, fromIndex, toIndex, multiple = false) => {
      const nextId = uniqueId()
      if (multiple) {
        setDraggingId(nextId)
      }
      setLocalMapping((prev: any) => {
        return handleReplaceLocalMapping(
          nextId,
          prev,
          fromDimension,
          toDimension,
          fromIndex,
          toIndex,
          dimensions,
          dataTypes,
          multiple
        )
      })
      if (!multiple) {
        setMapping((prev: any) => {
          return handleReplaceLocalMapping(
            nextId,
            prev,
            fromDimension,
            toDimension,
            fromIndex,
            toIndex,
            dimensions,
            dataTypes
          )
        })
      }
    },
    [dataTypes, dimensions, setMapping]
  )

  const [draggingId, setDraggingId] = useState(null)

  const rollbackLocalMapping = useCallback(() => {
    setLocalMapping(mapping)
    setDraggingId(null)
  }, [mapping])

  // const commitLocalMapping = useCallback(() => {
  //   console.log('COMMIT!', localMappding)
  //   setMapping(localMappding)
  //   setDraggingId(null)
  // }, [localMappding, setMapping])
  const commitLocalMapping = () => {
    // setMapping()
    setMapping(lastMapping.current)
    setDraggingId(null)
  }

  const lastMapping = useRef()
  useEffect(() => {
    lastMapping.current = localMappding
  })

  useImperativeHandle(ref, () => ({
    clearLocalMapping: () => {
      setLocalMapping({})
    },
  }))

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <DndProvider backend={HTML5Backend}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Row>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Col xs={3}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h5 className="text-uppercase">Dimensions</h5>
          {map(dataTypes, (dataType: any, columnName: any) => {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <ColumnCard
                key={columnName}
                dimensionName={columnName}
                dimensionType={dataType}
                commitLocalMapping={commitLocalMapping}
                rollbackLocalMapping={rollbackLocalMapping}
              />
            )
          })}
        </Col>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Col>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h5 className="text-uppercase">Chart Variables</h5>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Row
            className="sticky-top"
            style={{ top: 'calc(var(--header-height) + 16px)' }}
          >
            {dimensions.map((d: any) => {
              return (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <ChartDimensionCard
                  key={d.id}
                  dimension={d}
                  dataTypes={dataTypes}
                  // mapping={mapping[d.id] || {}}
                  mapping={localMappding[d.id] || {}}
                  setMapping={(mappingConf: any, isLocal = false) =>
                    updateMapping(d.id, mappingConf, isLocal)
                  }
                  commitLocalMapping={commitLocalMapping}
                  rollbackLocalMapping={rollbackLocalMapping}
                  draggingId={draggingId}
                  setDraggingId={setDraggingId}
                  replaceDimension={replaceDimension}
                  localMappding={localMappding}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </DndProvider>
  );
}

export default React.memo(React.forwardRef(DataMapping))
