import React, { useCallback, useState, useMemo } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
  getOptionsConfig,
  getContainerOptions,
  getDefaultOptionsValues,
  getEnabledOptions,
  getTypeName,
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
} from '@rawgraphs/rawgraphs-core'
// @ts-expect-error TS(6142): Module './ChartOptionTypes/ChartOptionNumber' was ... Remove this comment to see the full error message
import ChartOptionNumber from './ChartOptionTypes/ChartOptionNumber'
// @ts-expect-error TS(6142): Module './ChartOptionTypes/ChartOptionText' was re... Remove this comment to see the full error message
import ChartOptionText from './ChartOptionTypes/ChartOptionText'
// @ts-expect-error TS(6142): Module './ChartOptionTypes/ChartOptionColor' was r... Remove this comment to see the full error message
import ChartOptionColor from './ChartOptionTypes/ChartOptionColor'
// @ts-expect-error TS(6142): Module './ChartOptionTypes/ChartOptionColorScaleWr... Remove this comment to see the full error message
import ChartOptionColorScaleWrapper from './ChartOptionTypes/ChartOptionColorScaleWrapper'
// @ts-expect-error TS(6142): Module './ChartOptionTypes/ChartOptionBoolean' was... Remove this comment to see the full error message
import ChartOptionBoolean from './ChartOptionTypes/ChartOptionBoolean'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash/get'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import map from 'lodash/map'
// @ts-expect-error TS(2307): Cannot find module './ChartOptions.module.scss' or... Remove this comment to see the full error message
import styles from './ChartOptions.module.scss'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import omit from 'lodash/omit'

const CHART_OPTION_COMPONENTS = {
  number: ChartOptionNumber,
  text: ChartOptionText,
  color: ChartOptionColor,
  colorScale: ChartOptionColorScaleWrapper,
  boolean: ChartOptionBoolean,
}

function getPartialMapping(mapping: any, dimension: any, repeatIndex: any) {
  const nv = get(mapping[dimension], `value[${repeatIndex}]`)
  return {
    ...mapping,
    [dimension]: {
      ...mapping[dimension],
      value: [nv],
    },
  }
}

function getPartialMappedData(mappedData: any, dimension: any, repeatIndex: any) {
  return Array.isArray(mappedData)
    ? mappedData.map((datum) => {
        const value = get(datum[dimension], `[${repeatIndex}]`)
        return {
          ...datum,
          [dimension]: value,
        }
      })
    : mappedData
}

function getDefaultForRepeat(def: any, index: any) {
  if (Array.isArray(def.repeatDefault)) {
    return get(def.repeatDefault, `[${index}]`, def.default)
  }
  return def.default
}

function WrapControlComponent({
  type,
  optionId,
  setVisualOptions,
  label,
  repeatIndex,
  ...props
}: any) {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const Component = CHART_OPTION_COMPONENTS[type]

  const remainingOptions = useMemo(() => {
    if (type !== 'colorScale') {
      return null
    }

    return Object.keys(omit(props.visualOptions, optionId))
      .map((k) => JSON.stringify(get(props.visualOptions, k, '')))
      .join('-')
  }, [type, props.visualOptions, optionId])

  const domainFromChart = useMemo(() => {
    if (type !== 'colorScale') {
      return null
    }
    if (props.domain && props.chart[props.domain]) {
      //as sometimes the current chart is not in synch with current options (chart is set before options, we just handle an exception)
      //everything should be ok on the next render.
      try {
        const domain = props.chart[props.domain](
          props.mappedData,
          props.mapping,
          props.visualOptions
        )
        return domain
      } catch (e) {
        return null
      }
    } else {
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    type,
    props.chart,
    props.domain,
    props.mappedData,
    props.mapping,
    remainingOptions,
  ])

  const mappingValue = useMemo(() => {
    if (type !== 'colorScale') {
      return null
    }
    return domainFromChart
      ? '__custom__'
      : get(props.mapping, `[${props.dimension}].value`)
  }, [domainFromChart, props.dimension, props.mapping, type])

  const colorDataType = useMemo(() => {
    if (type !== 'colorScale') {
      return null
    }
    if (domainFromChart) {
      return domainFromChart.type
    }
    return props.dataTypes[mappingValue]
      ? getTypeName(props.dataTypes[mappingValue])
      : 'string'
  }, [type, props.dataTypes, domainFromChart, mappingValue])

  const colorDataset = useMemo(() => {
    if (type !== 'colorScale') {
      return null
    }
    if (domainFromChart) {
      return domainFromChart.domain
    }

    if (props.mappedData) {
      return props.mappedData
        .map((d: any) => get(d, props.dimension))
        .filter(
          (item: any) => item !== undefined && !(Array.isArray(item) && !item.length)
        );
    } else {
      return []
    }
  }, [type, props.dimension, domainFromChart, props.mappedData])

  const handleControlChange = useCallback(
    (nextValue) => {
      setVisualOptions((visualOptions: any) => {
        let newValue = nextValue
        if (repeatIndex !== undefined) {
          newValue = visualOptions[optionId] || []
          newValue[repeatIndex] = nextValue
        }
        return {
          ...visualOptions,
          [optionId]: newValue,
        }
      })
    },
    [optionId, repeatIndex, setVisualOptions]
  )

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Component
      type={type}
      domainFromChart={domainFromChart}
      mappingValue={mappingValue}
      colorDataType={colorDataType}
      colorDataset={colorDataset}
      optionId={optionId}
      label={
        repeatIndex !== undefined ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <React.Fragment>
            {label} ({repeatIndex + 1})
          </React.Fragment>
        ) : (
          label
        )
      }
      {...omit(props, [
        'mapping',
        'visualOptions',
        'chart',
        'dataset',
        'dataTypes',
        'mappedData',
      ])}
      onChange={handleControlChange}
    />
  )
}

const ChartOptions = ({
  chart,
  dataset,
  mapping,
  dataTypes,
  visualOptions,
  setVisualOptions,
  error,
  mappedData
}: any) => {
  const optionsConfig = useMemo(() => {
    return getOptionsConfig(chart?.visualOptions)
  }, [chart])

  const [collapseStatus, setCollapseStatus] = useState(() => {
    const groups = {}
    for (const option in optionsConfig) {
      const group = optionsConfig[option].group
      if (!groups.hasOwnProperty(group)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        groups[group] = true
      }
    }
    return groups
  })

  const enabledOptions = useMemo(() => {
    return getEnabledOptions(optionsConfig, visualOptions, mapping)
  }, [optionsConfig, visualOptions, mapping])

  // const enabledGroupsByName = useMemo(() => {
  //   const enabledGroupsNames = Object.keys(optionsConfig).map(optionName => enabledOptions[optionName] ? optionsConfig[optionName].group : null).filter(x => !!x)
  //   return mapValues(keyBy(enabledGroupsNames), x => true)
  // }, [enabledOptions, optionsConfig])
  // // #TODO we can use enabledGroupsByName to disable the group

  const optionsDefinitionsByGroup = useMemo(() => {
    // update "collapseStatus" state
    // add/remove options groups when selected charts changes
    const groups = {}
    for (const option in optionsConfig) {
      const group = optionsConfig[option].group
      if (!groups.hasOwnProperty(group)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        groups[group] = group === 'artboard' ? false : true
      }
    }
    setCollapseStatus(groups)
    return Object.keys(optionsConfig).reduce((acc, optionId) => {
      const option = optionsConfig[optionId]
      const group = option?.group || ''
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!acc[group]) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        acc[group] = {}
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      acc[group][optionId] = option
      return acc
    }, {})
  }, [optionsConfig])

  const containerOptions = useMemo(() => {
    const defaultOptionsValues = getDefaultOptionsValues(optionsConfig, mapping)
    const opts = {
      ...defaultOptionsValues,
      ...visualOptions,
    }
    return getContainerOptions(optionsConfig, opts)
  }, [mapping, optionsConfig, visualOptions])

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={[styles['chart-options'], 'col-4', 'col-xl-3'].join(' ')}>
      {map(optionsDefinitionsByGroup, (options: any, groupName: any) => {
        return (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div
            key={groupName}
            // @ts-expect-error TS(2322): Type '{ children: any[]; key: any; groupname: any;... Remove this comment to see the full error message
            groupname={groupName}
            className={[
              styles['options-group'],
              // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              collapseStatus[groupName] ? styles['collapsed'] : '',
            ].join(' ')}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Row className="sticky-top">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Col
                className={`d-flex justify-content-between align-items-center ${styles['group-header']}`}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <h5 className="text-uppercase m-0">{groupName}</h5>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <span
                  className={[styles['collapse-button'], 'cursor-pointer'].join(
                    ' '
                  )}
                  onClick={() =>
                    setCollapseStatus({
                      ...collapseStatus,
                      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                      [groupName]: !collapseStatus[groupName],
                    })
                  }
                ></span>
              </Col>
            </Row>
            {map(options, (def: any, optionId: any) => {
              // repeated options: notice that value is set to a default if undefined
              // this is caused by changes in shapes of the mapping object
              // (when a new value is dragged to the dimension that repeats the option)
              // the same approach is applied in option validation by the raw core lib
              return def.repeatFor ? (
                get(
                  mapping,
                  `[${def.repeatFor}].value`,
                  []
                ).map((v: any, repeatIndex: any) => (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <WrapControlComponent
                    className={styles['chart-option']}
                    key={optionId + repeatIndex}
                    repeatIndex={repeatIndex}
                    {...def}
                    optionId={optionId}
                    error={error?.errors?.[optionId + repeatIndex]}
                    value={
                      visualOptions?.[optionId]?.[repeatIndex] ??
                      getDefaultForRepeat(def, repeatIndex)
                    }
                    mapping={
                      def.type === 'colorScale'
                        ? getPartialMapping(mapping, def.repeatFor, repeatIndex)
                        : undefined
                    }
                    chart={def.type === 'colorScale' ? chart : undefined}
                    dataset={def.type === 'colorScale' ? dataset : undefined}
                    dataTypes={
                      def.type === 'colorScale' ? dataTypes : undefined
                    }
                    visualOptions={
                      def.type === 'colorScale' ? visualOptions : undefined
                    }
                    mappedData={getPartialMappedData(
                      mappedData,
                      def.repeatFor,
                      repeatIndex
                    )}
                    setVisualOptions={setVisualOptions}
                    isEnabled={enabledOptions[optionId]}
                  />
                ))
              ) : (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <WrapControlComponent
                  className={styles['chart-option']}
                  key={optionId}
                  {...def}
                  optionId={optionId}
                  error={error?.errors?.[optionId]}
                  value={visualOptions?.[optionId]}
                  mapping={def.type === 'colorScale' ? mapping : undefined}
                  chart={def.type === 'colorScale' ? chart : undefined}
                  dataset={def.type === 'colorScale' ? dataset : undefined}
                  dataTypes={def.type === 'colorScale' ? dataTypes : undefined}
                  visualOptions={
                    def.type === 'colorScale' ? visualOptions : undefined
                  }
                  mappedData={mappedData}
                  setVisualOptions={setVisualOptions}
                  isEnabled={enabledOptions[optionId]}
                />
              );
            })}
            {groupName === 'artboard' && visualOptions.showLegend && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className="small">
                The final output will be {containerOptions?.width}px *{' '}
                {containerOptions?.height}px including the legend.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChartOptions
