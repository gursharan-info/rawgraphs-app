import React, { useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
// @ts-expect-error TS(6142): Module '../../constants' was resolved to '/Users/g... Remove this comment to see the full error message
import { separatorsLabels } from '../../constants'

// @ts-expect-error TS(2307): Cannot find module './ParsingOptions.module.scss' ... Remove this comment to see the full error message
import styles from './ParsingOptions.module.scss'

export default function SeparatorSelector({
  title,
  value,
  onChange,
  ...props
}: any) {
  const inputValue = value
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')

  const handleChange = useCallback(
    (separator) => {
      if (onChange) {
        const nextValue = separator
          .replace(/\\r/g, '\r')
          .replace(/\\n/g, '\n')
          .replace(/\\t/g, '\t')
        onChange(nextValue)
      }
    },
    [onChange]
  )

  const formatValue = (value: any) => {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={['small',styles['separator-preview']].join(' ')}>{value}</span> <span>{separatorsLabels[value]}</span>
      </>
    )
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="option">
        {title}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dropdown className="d-inline-block raw-dropdown">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Dropdown.Toggle variant="white" className="d-flex justify-content-start align-items-center text-truncate">
            { formatValue(inputValue) }
          </Dropdown.Toggle>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Dropdown.Menu>
            {Object.keys(separatorsLabels).map(key=>{
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              return <Dropdown.Item key={separatorsLabels[key]} onSelect={() => handleChange(key)}>
                { formatValue(key) }
              </Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}
