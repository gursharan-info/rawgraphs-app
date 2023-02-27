import React, { useRef, useEffect } from 'react'
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
import { chart as rawChart } from '@rawgraphs/rawgraphs-core'
import useDebounce from '../../hooks/useDebounce'
import WarningMessage from '../WarningMessage'
import { onChartRendered } from '../../gaEvents'

const ChartPreview = ({
  chart,
  dataset: data,
  dataTypes,
  mapping,
  visualOptions,
  error,
  setError,
  setRawViz,
  mappedData
}: any) => {
  const domRef = useRef(null)

  const vizOptionsDebounced = useDebounce(visualOptions, 200)

  useEffect(() => {
    setError(null)

    // control required variables
    // need to create this array because the prop mapping does not return to {} when data is inserted and removed
    const currentlyMapped: any = []
    for (let variable in mapping) {
      if (mapping[variable].ids && mapping[variable].ids.length > 0) {
        currentlyMapped.push(variable)
      }
    }

    let requiredVariables = chart.dimensions.filter(
      (d: any) => d.required && currentlyMapped.indexOf(d.id) === -1
    )

    if (requiredVariables.length > 0) {
      let errorMessage = (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span>
          Required chart variables: you need to map{' '}
          {requiredVariables
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            .map((d: any, i: any) => <span key={i} className="font-weight-bold">{d.name}</span>)
            .reduce((prev: any, curr: any) => [prev, ' and ', curr])}
        </span>
      )
      setError({ variant: 'secondary', message: errorMessage })
      setRawViz(null)
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      while (domRef.current.firstChild) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        domRef.current.removeChild(domRef.current.firstChild)
      }
      return
    }

    // control multiple required variables
    const multivaluesVariables = chart.dimensions.filter(
      (d: any) => d.multiple &&
      d.required &&
      d.minValues &&
      mapping[d.id].ids.length < d.minValues
    )
    if (multivaluesVariables.length > 0) {
      let errorMessage = (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span>
          Please map{' '}
          {multivaluesVariables
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            .map((d: any) => <>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            at least <span className="font-weight-bold">{d.minValues}</span>{' '}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            dimensions on <span className="font-weight-bold">{d.name}</span>
          </>)
            .reduce((prev: any, curr: any) => [prev, ' and ', curr])}
          .
        </span>
      )
      setError({ variant: 'secondary', message: errorMessage })
      setRawViz(null)
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      while (domRef.current.firstChild) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        domRef.current.removeChild(domRef.current.firstChild)
      }
      return
    }

    // control data-types mismatches
    for (let variable in mapping) {
      if (
        mapping[variable].ids &&
        mapping[variable].ids.length > 0 &&
        !mapping[variable].isValid
      ) {
        const variableObj = chart.dimensions.find((d: any) => d.id === variable)
        const errorMessage = `Data-type mismatch: you can’t map ${mapping[variable].mappedType}s on ${variableObj.name}.`
        setError({ variant: 'danger', message: errorMessage })
        setRawViz(null)
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        while (domRef.current.firstChild) {
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          domRef.current.removeChild(domRef.current.firstChild)
        }
        return
      }
    }

    if (!mappedData) {
      // console.info('Clearing viz')
      setRawViz(null)
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      while (domRef.current.firstChild) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        domRef.current.removeChild(domRef.current.firstChild)
      }
      return
    }
    // console.info('Updating viz')
    try {
      const viz = rawChart(chart, {
        data,
        mapping: mapping,
        dataTypes,
        visualOptions: vizOptionsDebounced,
      })
      try {
        const rawViz = viz.renderToDOM(domRef.current, mappedData)
        setRawViz(rawViz)
        setError(null)
        onChartRendered(chart.metadata)
      } catch (e) {
        console.log("chart error", e)
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        setError({ variant: 'danger', message: 'Chart error. ' + e.message })
        setRawViz(null)
      }
    } catch (e) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      while (domRef.current.firstChild) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        domRef.current.removeChild(domRef.current.firstChild)
      }
      console.log({ e })
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      setError({ variant: 'danger', message: 'Chart error. ' + e.message })
      setRawViz(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setError, vizOptionsDebounced, setRawViz, mappedData, chart, mapping])

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={'col-8 col-xl-9'}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div
        className={['overflow-auto', 'position-sticky'].join(' ')}
        style={{ top: 'calc(15px + var(--header-height))' }}
      >
        {error && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <WarningMessage variant={error.variant} message={error.message} />
        )}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div ref={domRef}>{/* Don't put content in this <div /> */}</div>
      </div>
    </div>
  )
}

export default React.memo(ChartPreview)
