import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import {
  getOptionsConfig,
  getDefaultOptionsValues,
  // deserializeProject,
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
} from '@rawgraphs/rawgraphs-core'
// import HeaderItems from './HeaderItems'
// import Header from './components/Header'
import Section from './components/Section'
// import Footer from './components/Footer'
import ScreenSizeAlert from './components/ScreenSizeAlert'
import DataLoader from './components/DataLoader'
import ChartSelector from './components/ChartSelector'
import DataMapping from './components/DataMapping'
import ChartPreviewWithOptions from './components/ChartPreviewWIthOptions'
import Exporter from './components/Exporter'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash/get'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import find from 'lodash/find'
import usePrevious from './hooks/usePrevious'
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
import { serializeProject } from '@rawgraphs/rawgraphs-core'
import baseCharts from './charts'
// @ts-expect-error TS(6142): Module './hooks/useSafeCustomCharts' was resolved ... Remove this comment to see the full error message
import useSafeCustomCharts from './hooks/useSafeCustomCharts'
import useDataLoader from './hooks/useDataLoader'
// import isPlainObject from 'lodash/isPlainObject'
// import CookieConsent from 'react-cookie-consent'
import CustomChartLoader from './components/CustomChartLoader'
import CustomChartWarnModal from './components/CustomChartWarnModal'
import {
 useSearchParams
} from "react-router-dom";
// #TODO: i18n

function App() {
  const [
    customCharts,
    {
      // @ts-expect-error TS(2339): Property 'toConfirmCustomChart' does not exist on ... Remove this comment to see the full error message
      toConfirmCustomChart,
      // @ts-expect-error TS(2339): Property 'confirmCustomChartLoad' does not exist o... Remove this comment to see the full error message
      confirmCustomChartLoad,
      // @ts-expect-error TS(2339): Property 'abortCustomChartLoad' does not exist on ... Remove this comment to see the full error message
      abortCustomChartLoad,
      // @ts-expect-error TS(2339): Property 'uploadCustomCharts' does not exist on ty... Remove this comment to see the full error message
      uploadCustomCharts,
      // @ts-expect-error TS(2339): Property 'loadCustomChartsFromUrl' does not exist ... Remove this comment to see the full error message
      loadCustomChartsFromUrl,
      // @ts-expect-error TS(2339): Property 'loadCustomChartsFromNpm' does not exist ... Remove this comment to see the full error message
      loadCustomChartsFromNpm,
      // importCustomChartFromProject,
      // @ts-expect-error TS(2339): Property 'removeCustomChart' does not exist on typ... Remove this comment to see the full error message
      removeCustomChart,
      // @ts-expect-error TS(2339): Property 'exportCustomChart' does not exist on typ... Remove this comment to see the full error message
      exportCustomChart,
    },
  ] = useSafeCustomCharts()
  const charts = useMemo(() => baseCharts.concat(customCharts), [customCharts])

  const dataLoader = useDataLoader()
  const {
    userInput,
    userData,
    userDataType,
    parseError,
    unstackedData,
    unstackedColumns,
    data,
    separator,
    thousandsSeparator,
    decimalsSeparator,
    locale,
    stackDimension,
    dataSource,
    loading,
    // hydrateFromSavedProject,
  } = dataLoader
  // console.log(userInput)
  // console.log(userData)
  console.log(charts)

  // @ts-expect-error TS(2339): Property 'dataset_id' does not exist on type '(def... Remove this comment to see the full error message
  let { dataset_id } = useSearchParams;
  console.log(dataset_id)

  /* From here on, we deal with viz state */
  const [currentChart, setCurrentChart] = useState(charts[0])
  const [mapping, setMapping] = useState({})
  const [visualOptions, setVisualOptions] = useState(() => {
    const options = getOptionsConfig(charts[0]?.visualOptions)
    return getDefaultOptionsValues(options)
  })
  const [rawViz, setRawViz] = useState(null)
  const [mappingLoading, setMappingLoading] = useState(false)
  const dataMappingRef = useRef(null)

  const columnNames = useMemo(() => {
    if (get(data, 'dataTypes')) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      return Object.keys(data.dataTypes)
    }
  }, [data])
  console.log(userData)
  console.log(userDataType)
  console.log(unstackedData)
  console.log(unstackedColumns)
  console.log(data)

  const prevColumnNames = usePrevious(columnNames)
  const clearLocalMapping = useCallback(() => {
    if (dataMappingRef.current) {
      // @ts-expect-error TS(2339): Property 'clearLocalMapping' does not exist on typ... Remove this comment to see the full error message
      dataMappingRef.current.clearLocalMapping()
    }
  }, [])

  // NOTE: When we run the import we want to use the "last"
  // version of importProject callback
  // const lasImportProjectRef = useRef()
  // useEffect(() => {
  //   lasImportProjectRef.current = importProject
  // })
  // useEffect(() => {
  //   const projectUrlStr = new URLSearchParams(window.location.search).get('url')
  //   let projectUrl
  //   try {
  //     projectUrl = new URL(projectUrlStr)
  //   } catch (e) {
  //     // BAD URL
  //     return
  //   }
  //   fetch(projectUrl)
  //     .then((r) => (r.ok ? r.text() : Promise.reject(r)))
  //     .then(
  //       (projectStr) => {
  //         const project = deserializeProject(projectStr, baseCharts)
  //         // const lastImportProject = lasImportProjectRef.current
  //         if (lastImportProject) {
  //           lastImportProject(project, true)
  //         }
  //       },
  //       (err) => {
  //         console.log(`Can't load ${projectUrl}`, err)
  //       }
  //     )
  // }, [])

  //resetting mapping when column names changes (ex: separator change in parsing)
  useEffect(() => {
    if (prevColumnNames) {
      if (!columnNames) {
        setMapping({})
        clearLocalMapping()
      } else {
        // @ts-expect-error TS(2339): Property 'join' does not exist on type 'never'.
        const prevCols = prevColumnNames.join('.')
        const currentCols = columnNames.join('.')
        if (prevCols !== currentCols) {
          setMapping({})
          clearLocalMapping()
        }
      }
    }
  }, [columnNames, prevColumnNames, clearLocalMapping])
  console.log(columnNames)
  // update current chart when the related custom charts change under the hood
  // if the related custom chart is removed set the first chart
  useEffect(() => {
    if (currentChart.rawCustomChart) {
      const currentCustom = find(
        customCharts,
        (c: any) => c.metadata.id === currentChart.metadata.id
      )
      if (!currentCustom) {
        setCurrentChart(baseCharts[0])
        return
      }
      if (
        currentCustom.rawCustomChart.source !==
        currentChart.rawCustomChart.source
      ) {
        setCurrentChart(currentCustom)
      }
    }
  }, [customCharts, currentChart])

  const handleChartChange = useCallback(
    (nextChart) => {
      setMapping({})
      clearLocalMapping()
      setCurrentChart(nextChart)
      const options = getOptionsConfig(nextChart?.visualOptions)
      setVisualOptions(getDefaultOptionsValues(options))
      setRawViz(null)
    },
    [clearLocalMapping]
  )

  // const exportProject = useCallback(async () => {
  //   const customChart = await exportCustomChart(currentChart)
  //   return serializeProject({
  //     userInput,
  //     userData,
  //     userDataType,
  //     parseError,
  //     unstackedData,
  //     unstackedColumns,
  //     data,
  //     separator,
  //     thousandsSeparator,
  //     decimalsSeparator,
  //     locale,
  //     stackDimension,
  //     dataSource,
  //     currentChart,
  //     mapping,
  //     visualOptions,
  //     customChart,
  //   })
  // }, [
  //   currentChart,
  //   data,
  //   dataSource,
  //   decimalsSeparator,
  //   locale,
  //   mapping,
  //   parseError,
  //   separator,
  //   stackDimension,
  //   thousandsSeparator,
  //   userData,
  //   userDataType,
  //   userInput,
  //   visualOptions,
  //   unstackedColumns,
  //   unstackedData,
  //   exportCustomChart,
  // ])

  // // project import
  // const importProject = useCallback(
  //   async (project, fromUrl) => {
  //     let nextCurrentChart
  //     if (project.currentChart.rawCustomChart) {
  //       try {
  //         nextCurrentChart = await importCustomChartFromProject(
  //           project.currentChart
  //         )
  //       } catch (err) {
  //         if (err.isAbortByUser) {
  //           if (fromUrl) {
  //             // NOTE: clean the url when the user abort loading custom js
  //             window.history.replaceState(null, null, '/')
  //           }
  //           return
  //         }
  //         throw err
  //       }
  //     } else {
  //       nextCurrentChart = project.currentChart
  //     }
  //     hydrateFromSavedProject(project)
  //     setCurrentChart(nextCurrentChart)
  //     setMapping(project.mapping)
  //     // adding "annotations" for color scale:
  //     // we annotate the incoming options values (complex ones such as color scales)
  //     // to le the ui know they are coming from a loaded project
  //     // so we don't have to re-evaluate defaults
  //     // this is due to the current implementation of the color scale
  //     const patchedOptions = { ...project.visualOptions }
  //     Object.keys(patchedOptions).forEach((k) => {
  //       if (isPlainObject(patchedOptions[k])) {
  //         patchedOptions[k].__loaded = true
  //       }
  //     })
  //     setVisualOptions(project.visualOptions)
  //   },
  //   [hydrateFromSavedProject, importCustomChartFromProject]
  // )

  const [isModalCustomChartOpen, setModalCustomChartOpen] = useState(false)
  const toggleModalCustomChart = useCallback(
    () => setModalCustomChartOpen((o) => !o),
    []
  )

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="App">
      {/* <Header menuItems={HeaderItems} /> */}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <CustomChartWarnModal
        toConfirmCustomChart={toConfirmCustomChart}
        confirmCustomChartLoad={confirmCustomChartLoad}
        abortCustomChartLoad={abortCustomChartLoad}
      />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="app-sections">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Section title={`1. Load data`} loading={loading}>
          {/* <DataLoader {...dataLoader} hydrateFromProject={importProject} /> */}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <DataLoader {...dataLoader} />
        </Section>
        {data && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Section title="2. Choose">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <CustomChartLoader
              isOpen={isModalCustomChartOpen}
              onClose={toggleModalCustomChart}
              loadCustomChartsFromNpm={loadCustomChartsFromNpm}
              loadCustomChartsFromUrl={loadCustomChartsFromUrl}
              uploadCustomCharts={uploadCustomCharts}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ChartSelector
              onAddChartClick={toggleModalCustomChart}
              onRemoveCustomChart={removeCustomChart}
              availableCharts={charts}
              currentChart={currentChart}
              setCurrentChart={handleChartChange}
            />
          </Section>
        )}
        {data && currentChart && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Section title={`3. Selection`} loading={mappingLoading}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataMapping
              ref={dataMappingRef}
              dimensions={currentChart.dimensions}
              // @ts-expect-error TS(2339): Property 'dataTypes' does not exist on type 'never... Remove this comment to see the full error message
              dataTypes={data.dataTypes}
              mapping={mapping}
              setMapping={setMapping}
            />
          </Section>
        )}
        {data && currentChart && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Section title="4. Customize">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ChartPreviewWithOptions
              chart={currentChart}
              // @ts-expect-error TS(2339): Property 'dataset' does not exist on type 'never'.
              dataset={data.dataset}
              // @ts-expect-error TS(2339): Property 'dataTypes' does not exist on type 'never... Remove this comment to see the full error message
              dataTypes={data.dataTypes}
              mapping={mapping}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              setRawViz={setRawViz}
              setMappingLoading={setMappingLoading}
            />
          </Section>
        )}
        {/* {data && currentChart && rawViz && (
          <Section title="5. Export">
            <Exporter rawViz={rawViz} exportProject={exportProject} />
          </Section>
        )} */}
      
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ScreenSizeAlert />
    </div>
  )
}

export default App
