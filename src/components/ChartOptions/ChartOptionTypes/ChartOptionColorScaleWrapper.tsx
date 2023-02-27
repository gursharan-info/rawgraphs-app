import React, { useMemo } from 'react'
// @ts-expect-error TS(6142): Module './ChartOptionColorScale' was resolved to '... Remove this comment to see the full error message
import ChartOptionColorScale from './ChartOptionColorScale'
// @ts-expect-error TS(6142): Module './ChartOptionColorScaleDefault' was resolv... Remove this comment to see the full error message
import ChartOptionColorScaleDefault from './ChartOptionColorScaleDefault'

const ChartOptionColorScaleWrapper = ({
  value,
  onChange,
  default: defaultValue,
  mappingValue,
  colorDataType,
  colorDataset
}: any) => {

  const hasAnyMapping = useMemo(() => {
    return colorDataset && colorDataset.length > 0
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorDataset])

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    {!hasAnyMapping && <ChartOptionColorScaleDefault onChange={onChange} defaultValue={defaultValue} value={value} />}
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    {hasAnyMapping &&  <ChartOptionColorScale hasAnyMapping={hasAnyMapping} mappingValue={mappingValue} defaultValue={defaultValue} value={value} colorDataType={colorDataType} colorDataset={colorDataset} onChange={onChange} />}
  </>
}

export default ChartOptionColorScaleWrapper
