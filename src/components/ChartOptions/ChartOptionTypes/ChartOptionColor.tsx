import React from 'react'
import { Col } from 'react-bootstrap'
import InilineColorPicker from '../../InlineColorPicker'
// @ts-expect-error TS(6142): Module './ChartOptionSelect' was resolved to '/Use... Remove this comment to see the full error message
import ChartOptionSelect from './ChartOptionSelect'

const ChartOptionColor = ({
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
        label={label}
        {...props}
      />
    )
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <label className={props.className+" row"}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col xs={6} className="d-flex align-items-center">{label}</Col>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col xs={6}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InilineColorPicker disabled={!isEnabled} color={value} onChange={onChange} />
      </Col>
      {error && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <small>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <i>{error}</i>
        </small>
      )}
    </label>
  )
}

export default React.memo(ChartOptionColor)
