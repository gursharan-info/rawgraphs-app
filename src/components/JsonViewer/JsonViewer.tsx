import React, { useCallback, useState } from 'react'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { map } from 'lodash'
import './JsonViewer.scss'

const JsonViewerRecursive = ({
  contextName,
  nestingLevel,
  context,
  selectFilter,
  onSelect,
  path
}: any) => {
  const isSelectable = selectFilter(context)
  const contextType = typeof context
  const [mouseOver, setMouseOver] = useState(false)

  const classes = [
    'json-nested',
    isSelectable ? 'selectable' : null,
    mouseOver ? 'hover' : null,
  ]
    .filter((i) => i !== null)
    .join(' ')

  const handleSelect = useCallback(
    (e) => {
      if (isSelectable) {
        e.stopPropagation()
        e.preventDefault()
        if (onSelect) onSelect(context, path.join("."))
      }
    },
    [context, isSelectable, onSelect, path]
  )

  const handleMouseOver = useCallback(
    (e) => {
      if (isSelectable) {
        e.stopPropagation()
        e.preventDefault()
        setMouseOver(true)
      }
    },
    [isSelectable]
  )

  const handleMouseOut = useCallback(
    (e) => {
      if (isSelectable) {
        e.stopPropagation()
        e.preventDefault()
        setMouseOver(false)
      }
    },
    [isSelectable]
  )

  if (contextType === 'object' && contextType !== null) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div
        className={classes}
        onClick={handleSelect}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {contextName && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className="property-name">{contextName}</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className="colon">{': '}</span>
          </>
        )}
        {!Array.isArray(context) && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="curly-bracket open-bracket">{'{'}</span>
        )}
        {Array.isArray(context) && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="square-bracket open-bracket">{'['}</span>
        )}
        {map(context, (value: any, property: any) => (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <JsonViewerRecursive
            key={property}
            contextName={Array.isArray(context) ? null : property}
            nestingLevel={nestingLevel + 1}
            context={value}
            selectFilter={selectFilter}
            onSelect={onSelect}
            path={[...path, property]}
          />
        ))}
        {!Array.isArray(context) && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="curly-bracket close-bracket">{'}'}</span>
        )}
        {Array.isArray(context) && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="square-bracket close-bracket">{']'}</span>
        )}
      </div>
    );
  } else {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div
        className={classes}
        onClick={handleSelect}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {contextName && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className="property-name">{contextName}</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className="colon">{': '}</span>
          </>
        )}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {context === null && <span className="scalar-value">null</span>}
        {context !== null && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            {(contextType === 'bigint' || contextType === 'number') && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className="scalar-value scalar-value-numeric">
                {context.toString()}
              </span>
            )}
            {contextType === 'string' && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className="scalar-value scalar-value-string">
                "{context.toString()}"
              </span>
            )}
            {contextType === 'boolean' && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className="scalar-value scalar-value-bool">
                "{context ? 'true' : 'false'}"
              </span>
            )}
            {contextType === 'undefined' && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className="scalar-value scalar-value-undefined">
                undefined
              </span>
            )}
          </>
        )}
      </div>
    )
  }
}

const JsonViewer = ({
  context,
  selectFilter,
  onSelect
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <pre className="json-viewer">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <JsonViewerRecursive
        contextName={null}
        nestingLevel={0}
        context={context}
        selectFilter={selectFilter}
        onSelect={onSelect}
        path={[]}
      />
    </pre>
  )
}

export default JsonViewer
