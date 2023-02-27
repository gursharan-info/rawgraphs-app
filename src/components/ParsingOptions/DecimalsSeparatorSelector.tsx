import React, { useCallback } from 'react'

export default function DecimalsSeparatorSelector({
  title,
  value,
  onChange,
  ...props
}: any) {
  const inputValue = value

  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        const nextValue = e.target.value
        onChange(nextValue)
      }
    },
    [onChange]
  )

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="option">
      {title}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <input
        type="text"
        className="form-control text-field d-inline-block"
        value={inputValue}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}
