import React from 'react'
import { Row, Col } from 'react-bootstrap'
// @ts-expect-error TS(6142): Module './ChartOptionSelect' was resolved to '/Use... Remove this comment to see the full error message
import ChartOptionSelect from './ChartOptionSelect'

const ChartOptionNumber = ({
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  isEnabled,
  ...props
}: any) => {
  if (props.options) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ChartOptionSelect
        value={value}
        error={error}
        onChange={onChange}
        default={defaultValue}
        disabled={!isEnabled}
        label={label}
        {...props}
      />
    )
  }
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Row className={props.className}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col xs={6} className="d-flex align-items-center nowrap">{label}</Col>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col xs={6}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          className="w-100 form-control text-field"
          type="number"
          value={value ?? ''}
          step={props.step}
          min={props.min}
          max={props.max}
          disabled={!isEnabled}
          onChange={(e) => {
            const str = e.target.value
            if (str === '') {
              onChange(undefined)
            } else {
              const n = parseFloat(str)
              if (!isNaN(n)) {
                onChange(n)
              } else {
                onChange(undefined)
              }
            }
          }}
          placeholder={defaultValue}
        />
      </Col>
      {error && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <small>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <i>{error}</i>
        </small>
      )}
    </Row>
  )
}

export default React.memo(ChartOptionNumber)
