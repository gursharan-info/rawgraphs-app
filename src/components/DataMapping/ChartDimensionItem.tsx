import React, { useRef } from 'react'
import { Dropdown } from 'react-bootstrap'
import classnames from 'classnames'
// @ts-expect-error TS(2307): Cannot find module './DataMapping.module.scss' or ... Remove this comment to see the full error message
import styles from './DataMapping.module.scss'
import { BsX } from 'react-icons/bs'
import { useDrag, useDrop } from 'react-dnd'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash/get'
// @ts-expect-error TS(6142): Module '../../constants' was resolved to '/Users/g... Remove this comment to see the full error message
import { AGGREGATIONS_LABELS } from '../../constants'

export default function ChartDimensionItem({
  draggingColumn,
  index,
  isValid,
  DataTypeIcon,
  columnId,
  dimension,
  aggregators,
  relatedAggregation,
  onMove,
  onChangeAggregation,
  onDeleteItem,
  onChangeDimension,
  commitLocalMapping,
  rollbackLocalMapping,
  onInsertColumn,
  replaceDimension,
  localMappding
}: any) {
  const ref = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: ['column', 'card'],
    collect: (monitor) => {
      return {
        isOver: monitor.isOver() && monitor.getItem().type === 'column',
      }
    },
    hover(item, monitor) {
      if (!dimension.multiple) {
        return
      }
      if (!ref.current) {
        return
      }

      const hoverIndex = index

      //#TODO: for now we allow only dropping on "drop another dimension here" in case of multiple dimensions
      if (false && item.type === 'column') {
        onInsertColumn(hoverIndex, item)
        item.type = 'card'
        // @ts-expect-error TS(2339): Property 'dimensionId' does not exist on type 'Dra... Remove this comment to see the full error message
        item.dimensionId = dimension.id
        // @ts-expect-error TS(2339): Property 'index' does not exist on type 'DragObjec... Remove this comment to see the full error message
        item.index = hoverIndex
        return
      // @ts-expect-error TS(2339): Property 'dimensionId' does not exist on type 'Dra... Remove this comment to see the full error message
      } else if (item.dimensionId === dimension.id) {
        // @ts-expect-error TS(2339): Property 'index' does not exist on type 'DragObjec... Remove this comment to see the full error message
        const dragIndex = item.index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        // @ts-expect-error TS(2339): Property 'getBoundingClientRect' does not exist on... Remove this comment to see the full error message
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        onMove(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        // @ts-expect-error TS(2339): Property 'index' does not exist on type 'DragObjec... Remove this comment to see the full error message
        item.index = hoverIndex
      } else {
        //#TODO: for now we allow only dropping on "drop another dimension here" in case of multiple dimensions

        // replaceDimension(
        //   item.dimensionId,
        //   dimension.id,
        //   item.index,
        //   index,
        //   true
        // )
        // item.dimensionId = dimension.id
        // item.index = hoverIndex
        return
      }
    },
    drop: (item, monitor) => {
      if (!dimension.multiple) {
        if (item.type === 'column') {
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'DragObjectWi... Remove this comment to see the full error message
          onChangeDimension(index, item.id)
        } else {
          // @ts-expect-error TS(2339): Property 'dimensionId' does not exist on type 'Dra... Remove this comment to see the full error message
          replaceDimension(item.dimensionId, dimension.id, item.index, index)
        }
      }
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', index, id: columnId, dimensionId: dimension.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        commitLocalMapping()
      } else {
        rollbackLocalMapping()
      }
    },
  })

  drag(drop(ref))

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      ref={ref}
      style={{
        opacity: isDragging || draggingColumn ? 0.5 : 1,
      }}
      className={classnames(
        'assigned-column',
        styles['column-card'],
        styles['assigned-column'],
        isValid ? styles['column-valid'] : styles['column-invalid'],
        {
          'border border-danger': isOver,
          // 'border border-warning': isDragging,
        }
      )}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span>
        {!!DataTypeIcon && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <DataTypeIcon className={styles['data-type-icon']} />
        )}
      </span>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span className={styles['column-title']}>{columnId}</span>
      {dimension.aggregation && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dropdown className="d-inline-block ml-2 raw-dropdown">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Dropdown.Toggle
            variant={isValid ? 'primary' : 'danger'}
            className="pr-5"
          >
            {get(AGGREGATIONS_LABELS, relatedAggregation, relatedAggregation)}
          </Dropdown.Toggle>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Dropdown.Menu>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {aggregators.map((aggregatorName: any) => <Dropdown.Item
              key={aggregatorName}
              onClick={() => onChangeAggregation(index, aggregatorName)}
            >
              {get(AGGREGATIONS_LABELS, aggregatorName, aggregatorName)}
            </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      )}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <button
        className={styles['remove-assigned']}
        type="button"
        onClick={() => onDeleteItem(index)}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BsX />
      </button>
    </div>
  );
}
