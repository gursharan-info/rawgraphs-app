import React, { useState, useMemo, useEffect, useCallback } from 'react'
import InilineColorPicker from '../../InlineColorPicker'
import { Col } from 'react-bootstrap'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash/get'
// @ts-expect-error TS(2307): Cannot find module '../ChartOptions.module.scss' o... Remove this comment to see the full error message
import style from '../ChartOptions.module.scss'

const ChartOptionColorScaleDefault = ({
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  dimension,
  dataset,
  mapping,
  dataTypes,
  chart,
  mappedData,
  mappingValue,
  colorDataType,
  colorDataset,
  ...props
}: any) => {
  const colorFromValue = useMemo(() => {
    const colorFromDefault = get(defaultValue, 'defaultColor', '#cccccc')
    return get(value, 'defaultColor', colorFromDefault)
  }, [defaultValue, value])

  const [defaultColor, setDefaultColor] = useState(colorFromValue)

  const handleChangeDefaultColor = useCallback(
    (nextDefaultColor) => {
      setDefaultColor(nextDefaultColor)
      const outScaleParams = {
        ...value,
        defaultColor: nextDefaultColor,
      }
      onChange(outScaleParams)
    },
    [value, onChange]
  )

  useEffect(() => {
    if (defaultValue && defaultValue.defaultColor !== defaultColor) {
      handleChangeDefaultColor(defaultValue.defaultColor)
    }
  }, [defaultColor, defaultValue, handleChangeDefaultColor])

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <label className={[style['chart-option'], 'row'].join(' ')}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Col xs={6} className="d-flex align-items-center">
          Default
        </Col>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Col xs={6}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <InilineColorPicker
            color={defaultColor}
            onChange={handleChangeDefaultColor}
          />
        </Col>
      </label>
    </>
  )
}

export default ChartOptionColorScaleDefault
