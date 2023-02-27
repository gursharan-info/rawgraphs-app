import React from 'react'
// @ts-expect-error TS(2307): Cannot find module '../ChartOptions.module.scss' o... Remove this comment to see the full error message
import styles from '../ChartOptions.module.scss'
// @ts-expect-error TS(6142): Module '../../../constants' was resolved to '/User... Remove this comment to see the full error message
import { COLOR_SCHEMES_LABELS } from '../../../constants'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash/get'

const ColorSchemePreview = ({
  label,
  scale,
  numSamples=150
}: any) => {
  let samples
  if (scale.ticks) {
    samples = scale.ticks(numSamples)
  } else {
    if(scale.domain){
      samples = scale.domain()
    } else {
      samples = []
    }
    
  }
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles['scheme-preview']}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {label && <div style={{marginBottom:2}}>{get(COLOR_SCHEMES_LABELS, label, label)}</div>}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="d-flex">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {samples.map((sample: any) => <div
          key={'sample-'+sample}
          style={{ flex: 1, height: 10, background: scale(sample) }}
        ></div>)}
      </div>
    </div>
  );
}

export default React.memo(ColorSchemePreview)