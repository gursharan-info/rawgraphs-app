import React, { useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
// @ts-expect-error TS(6142): Module '../../constants' was resolved to '/Users/g... Remove this comment to see the full error message
import { localeList } from '../../constants'

export default function DateLocaleSelector({
  title,
  value,
  onChange,
  ...props
}: any) {
  const handleChange = useCallback(
    (locale) => {
      if (onChange) {
        const nextLocale = locale
        onChange(nextLocale)
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
        <Dropdown.Toggle variant="white" className="">
          {value}
        </Dropdown.Toggle>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dropdown.Menu>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Dropdown.Header>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span>
              from{' '}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <a
                href="https://github.com/d3/d3-time-format/tree/master/locale"
                target="_blank"
                rel="noopener noreferrer"
              >
                d3-time-format
              </a>
            </span>
          </Dropdown.Header>
          {Object.keys(localeList).map((d) => {
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
