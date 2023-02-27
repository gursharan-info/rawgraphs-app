import React from 'react'
import { Row, Col } from 'react-bootstrap'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import isObject from 'lodash/isObject'

const ChartOptionSelect = ({
  options = [],
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  ...props
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Row className={props.className}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col xs={6} className="d-flex align-items-center nowrap">{label}</Col>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col xs={6}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <select
          className="custom-select raw-select"
          value={value ?? defaultValue}
          onChange={(e) => {
            const stringValue = e.target.value
            const value =
              props.type === 'number' ? Number(stringValue) : stringValue
            onChange(value)
          }}
        >
          // @ts-expect-error TS(7006): Parameter 'option' implicitly has an 'any' type.
          {options.map((option) =>
            isObject(option) ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
        {error && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <small>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <i>{error}</i>
          </small>
        )}
      </Col>
    </Row>
  )
}

export default React.memo(ChartOptionSelect)
