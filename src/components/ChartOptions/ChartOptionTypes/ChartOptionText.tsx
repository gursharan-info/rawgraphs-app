import React from 'react'
// @ts-expect-error TS(6142): Module './ChartOptionSelect' was resolved to '/Use... Remove this comment to see the full error message
import ChartOptionSelect from './ChartOptionSelect'

const ChartOptionText = ({
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
    <label className="d-block">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <b>{label}</b>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <br />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <input
        type="text"
        value={value ?? ''}
        step={props.step}
        disabled={!isEnabled}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder={defaultValue}
      />
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

export default React.memo(ChartOptionText)
