import React, { useState } from 'react'
// @ts-expect-error TS(2307): Cannot find module './InlineColorPicker.module.scs... Remove this comment to see the full error message
import styles from './InlineColorPicker.module.scss'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { SketchPicker } from 'react-color'

export default function InlineColorPicker({
  color: maybeColor,
  onChange,
  disabled
}: any) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const color = maybeColor ?? '#000000' // Same as <input type='color' />

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      className={styles.swatch}
      onClick={() => setDisplayColorPicker(true)}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.color} style={{ background: color }} />
      {color.toUpperCase()}
    </div>
    {displayColorPicker && (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.popover}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          className={styles.cover}
          onClick={() => setDisplayColorPicker(false)}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SketchPicker
          disabled={disabled}
          disableAlpha
          color={color}
          onChangeComplete={(color: any) => onChange(color.hex)}
        />
      </div>
    )}
  </>;
}
