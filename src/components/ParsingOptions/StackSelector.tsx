import React, { useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'

export default function StackSelector({
  title,
  value,
  list,
  onChange,
  ...props
}: any) {
  const handleChange = useCallback(
    (nextDimension) => {
      if (onChange) {
        onChange(nextDimension)
      }
    },
    [onChange]
  )

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="option">
      {title}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Dropdown className="d-inline-block raw-dropdown">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dropdown.Toggle
          variant="white"
          className="truncate-160px"
          disabled={list.length === 0}
        >
          {value ? value : 'Column'}
        </Dropdown.Toggle>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dropdown.Menu>
          {value && (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Dropdown.Item onSelect={() => handleChange(null)}>
              {'Do not stack'}
            </Dropdown.Item>
          )}
          {Object.keys(list).map((d) => {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Dropdown.Item key={d} onSelect={() => handleChange(d)}>
                {d}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
