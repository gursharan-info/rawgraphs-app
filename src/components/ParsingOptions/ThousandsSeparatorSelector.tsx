import React, { useCallback } from 'react'

export default function ThousandsSeparatorSelector({
  title,
  value,
  onChange,
  ...props
}: any) {
  const inputValue = value
  // // Remove?
  // .replace(/\r/g, "\\r")
  // .replace(/\n/g, "\\n")
  // .replace(/\t/g, "\\t")

  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        const nextValue = e.target.value
        // // Remove?
        // .replace(/\\r/g, "\r")
        // .replace(/\\n/g, "\n")
        // .replace(/\\t/g, "\t")

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
