// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
import { parseDataset } from '@rawgraphs/rawgraphs-core'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { difference, get } from 'lodash'
import { useCallback, useState } from 'react'
// @ts-expect-error TS(6142): Module '../constants' was resolved to '/Users/gurs... Remove this comment to see the full error message
import { DefaultSeparator, localeList, WEBWORKER_ACTIVE } from '../constants'
import { parseDatasetInWorker } from '../worker'
import {
  normalizeJsonArray,
  parseAndCheckData,
} from './useDataLoaderUtils/parser'
import { stackData } from './useDataLoaderUtils/stack'

export const DATA_LOADER_MODE = {
  DIRECT: 'direct',
  REPLACE: 'replace',
}

const __cache = {}

export default function useDataLoader() {
  /* Data to be plot in the chart */
  /* First stage: raw user input */
  const [userInput, setUserInput] = useState('')
  const [dataSource, setDataSource] = useState(null)

  /* Second stage: parsed data and user data type (i.e. csv, json, ...) */
  /*
   * In case user data type is json, userData is not filled immediately.
   * Instead, a JSON view is first shown asking the user to select an
   * array inside the JSON tree. The (parsed) content of the array will
   * be used to fill `userData`. In case of some error during parsing,
   * the `parseError` state holds the error description
   */
  const [userData, setUserData] = useState(null)
  const [userDataType, setUserDataType] = useState(null)
  const [parseError, setParserError] = useState(null)
  const [unstackedInfo, setUnstackedInfo] = useState([null, null])

  /* Data Parsing Options */
  const [separator, setSeparator] = useState(DefaultSeparator)
  const [thousandsSeparator, setThousandsSeparator] = useState(',')
  const [decimalsSeparator, setDecimalsSeparator] = useState('.')
  const [locale, setLocale] = useState(navigator.language || 'en-US')
  const [stackDimension, setStackDimension] = useState()

  /* Third stage: data ready to become a chart */
  const [data, setData] = useState(null)

  /* Stack operations */
  const [unstackedData, unstackedColumns] = unstackedInfo

  /* Misc */
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(DATA_LOADER_MODE.DIRECT)
  const [
    replaceRequiresConfirmation,
    setReplaceRequiresConfirmation,
  ] = useState(undefined)

  /* Unpacking */
  // @ts-expect-error TS(2339): Property 'dataTypes' does not exist on type 'never... Remove this comment to see the full error message
  const columnsTypes = unstackedColumns ?? data?.dataTypes

  //wrapper for async parse via web worker
  const parseDatasetAsyncAndSetData = useCallback(
    (data, dataTypes, parsingOptions) => {
      setLoading(true)
      return parseDatasetInWorker(data, dataTypes, {
        ...parsingOptions,
        dateLocale: get(localeList, parsingOptions.locale),
      })
        .then((resultData: any) => {
          return resultData
        })
        .catch((err: any) => {
          console.log('eee', err)
        })
        .finally(() => {
          setLoading(false)
        });
    },
    [setLoading]
  )

  const parseDatasetSyncAndSetData = useCallback(
    (data, dataTypes, parsingOptions) => {
      setLoading(true)
      return new Promise((resolve, reject) => {
        try {
          const resultData = parseDataset(data, dataTypes, {
            ...parsingOptions,
            dateLocale: get(localeList, parsingOptions.locale),
          })
          resolve(resultData)
        } catch (e) {
          reject(e)
        } finally {
          setLoading(false)
        }
      })
    },
    [setLoading]
  )

  const parseDatasetAuto = useCallback(
    (data, dataTypes, parsingOptions) => {
      const worker = WEBWORKER_ACTIVE
        ? parseDatasetAsyncAndSetData
        : parseDatasetSyncAndSetData
      return worker(data, dataTypes, parsingOptions)
    },
    [parseDatasetAsyncAndSetData, parseDatasetSyncAndSetData]
  )

  const parseDatasetAndSetData = useCallback(
    (data, dataTypes, parsingOptions) => {
      return parseDatasetAuto(data, dataTypes, parsingOptions).then((data: any) => setData(data)
      );
    },
    [parseDatasetAuto]
  )

  const reset = useCallback(() => {
    setData(null)
    setUserData(null)
    setUserDataType(null)
    setUserInput('')
    setDataSource(null)
    setParserError(null)
    // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    setStackDimension(null)
    setUnstackedInfo([null, null])
  }, [])

  const hydrateFromSavedProject = useCallback(
    (project) => {
      const {
        userInput,
        userData,
        userDataType,
        parseError,
        unstackedColumns,
        unstackedData,
        dataTypes,
        separator,
        thousandsSeparator,
        decimalsSeparator,
        locale,
        stackDimension,
        dataSource,
      } = project
      setUserInput(userInput)
      setUserDataType(userDataType)
      setSeparator(separator)
      setThousandsSeparator(thousandsSeparator)
      setDecimalsSeparator(decimalsSeparator)
      setLocale(locale)
      setStackDimension(stackDimension)
      setDataSource(dataSource)
      setUserData(userData)
      setParserError(parseError)
      setUnstackedInfo([unstackedData, unstackedColumns])
      parseDatasetAndSetData(userData, dataTypes, {
        thousandsSeparator,
        decimalsSeparator,
        locale,
      })
    },
    [parseDatasetAndSetData]
  )

  const handleReplacingData = useCallback(
    (userData) => {
      parseDatasetAuto(userData, undefined, {
        locale,
        decimal: decimalsSeparator,
        group: thousandsSeparator,
      }).then((newDataInferred: any) => {
        if (newDataInferred.errors.length > 0) {
          // Parsing resulted in errors, cannot replace data safely!
          // @ts-expect-error TS(2339): Property 'replacedData' does not exist on type '{}... Remove this comment to see the full error message
          __cache.replacedData = newDataInferred
          // @ts-expect-error TS(2345): Argument of type '"parse-error"' is not assignable... Remove this comment to see the full error message
          setReplaceRequiresConfirmation('parse-error')
        } else {
          const oldColNames = Object.keys(columnsTypes)
          const newColNames = Object.keys(newDataInferred.dataTypes)
          const missingCols = difference(oldColNames, newColNames)
          if (missingCols.length > 0) {
            // There is at least one column missing in the new dataset
            // Replace cannot be safe
            // @ts-expect-error TS(2339): Property 'replacedData' does not exist on type '{}... Remove this comment to see the full error message
            __cache.replacedData = newDataInferred
            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            setReplaceRequiresConfirmation('missing-column:' + missingCols[0])
          } else {
            const nextDataTypes = {
              ...newDataInferred.dataTypes,
              ...columnsTypes, // Keep eventual overrides in data types
            }
            parseDatasetAuto(userData, nextDataTypes, {
              locale,
              decimal: decimalsSeparator,
              group: thousandsSeparator,
            }).then((newData: any) => {
              if (newData.errors.length > 0) {
                // There was some error in type coercing, data cannot be replaced safely
                // @ts-expect-error TS(2339): Property 'replacedData' does not exist on type '{}... Remove this comment to see the full error message
                __cache.replacedData = newDataInferred
                // @ts-expect-error TS(2345): Argument of type '"type-mismatch"' is not assignab... Remove this comment to see the full error message
                setReplaceRequiresConfirmation('type-mismatch')
              } else {
                if (stackDimension) {
                  setUnstackedInfo([userData, newData.dataTypes])
                  const stackedData = stackData(userData, stackDimension)
                  setUserData(stackedData)
                  // @ts-expect-error TS(2531): Object is possibly 'null'.
                  parseDatasetAuto(stackedData, data.dataTypes, {
                    locale,
                    decimal: decimalsSeparator,
                    group: thousandsSeparator,
                  }).then((data: any) => setData(data))
                } else {
                  setData(newData)
                }
              }
            })
          }
        }
      })
    },
    [
      columnsTypes,
      data,
      decimalsSeparator,
      locale,
      parseDatasetAuto,
      stackDimension,
      thousandsSeparator,
    ]
  )

  const handleNewUserData = useCallback(
    (nextUserData) => {
      setUserData(nextUserData)
      if (mode === DATA_LOADER_MODE.DIRECT) {
        parseDatasetAndSetData(nextUserData, undefined, {
          locale,
          decimal: decimalsSeparator,
          group: thousandsSeparator,
        })
      } else if (mode === DATA_LOADER_MODE.REPLACE) {
        handleReplacingData(nextUserData)
      } else {
        console.error('Unknown data loader mode!')
      }
    },
    [
      decimalsSeparator,
      handleReplacingData,
      locale,
      mode,
      parseDatasetAndSetData,
      thousandsSeparator,
    ]
  )

  /*
   * Callback to handle user injecting data
   * When user uploads some data (in any possible way), we store the raw user input at first
   * Then we try to read it using different parsers (notably json and csv)
   * Finally, if read is successful, we go inferring types using the raw-core library
   */
  function setUserDataAndDetect(str: any, source: any, options: any) {
    const [dataType, parsedUserData, error, extra] = parseAndCheckData(str, {
      separator: get(options, 'separator', null),
    })
    setUserInput(str)
    setDataSource(source)
    setUserDataType(dataType)
    setParserError(error)
    if (extra && typeof extra === "object" && "separator" in extra) {
      setSeparator(extra.separator)
    }
    // Data parsed ok set parent data
    if (dataType !== 'json' && !error) {
      handleNewUserData(parsedUserData)
    }
    // @ts-expect-error TS(2339): Property 'jsonPath' does not exist on type 'never'... Remove this comment to see the full error message
    const jsonPath = dataSource?.jsonPath ?? undefined
    if (dataType === 'json' && !error && jsonPath !== undefined) {
      const jsonData = get(parsedUserData, jsonPath, null)
      if (Array.isArray(jsonData)) {
        handleNewUserData(jsonData)
      }
    }
  }

  const setJsonData = useCallback(
    (data, path) => {
      const normalized = normalizeJsonArray(data)
      setUserData(normalized)
      // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
      setDataSource({...dataSource, jsonPath: path })
      handleNewUserData(normalized)
    },
    [dataSource, handleNewUserData]
  )

  /*
   * Callback to handle user changing separator
   * When the separator is changed, a fresh parsing of raw user input is required for proper handling
   * Steps are very similar with respect to the `setUserInputAndDetect` callback, except for the
   * fact that we take user input from state instead of from parameters
   */
  function handleChangeSeparator(newSeparator: any) {
    const [dataType, parsedUserData, error] = parseAndCheckData(userInput, {
      separator: newSeparator,
    })
    setSeparator(newSeparator)
    setUserDataType(dataType)
    setParserError(error)
    if (dataType !== 'json' && !error && newSeparator) {
      setUserData(parsedUserData)
      parseDatasetAndSetData(parsedUserData, undefined, {
        locale,
        decimal: decimalsSeparator,
        group: thousandsSeparator,
      })
    }
  }

  function handleChangeLocale(newLocale: any) {
    if (!data) {
      return
    }
    // @ts-expect-error TS(2339): Property 'dataset' does not exist on type 'never'.
    parseDatasetAndSetData(data.dataset, data.dataTypes, {
      locale: newLocale,
      decimal: decimalsSeparator,
      group: thousandsSeparator,
    })
    setLocale(newLocale)
  }

  function handleChangeDecimalSeparator(newDecimalSeparator: any) {
    const [dataType, parsedUserData, error] = parseAndCheckData(userInput, {
      separator,
    })
    setDecimalsSeparator(newDecimalSeparator)
    setUserDataType(dataType)
    setParserError(error)
    if (dataType !== 'json' && !error) {
      setUserData(parsedUserData)
      setLoading(true)
      parseDatasetAndSetData(parsedUserData, undefined, {
        locale,
        decimal: newDecimalSeparator,
        group: thousandsSeparator,
      })
      //setData(parseDataset(parsedUserData, undefined, {locale, decimal: newDecimalSeparator, group:thousandsSeparator}));
    }
  }

  function handleChangeThousandsSeparator(newThousandsSeparator: any) {
    const [dataType, parsedUserData, error] = parseAndCheckData(userInput, {
      separator,
    })
    setThousandsSeparator(newThousandsSeparator)
    setUserDataType(dataType)
    setParserError(error)
    if (dataType !== 'json' && !error) {
      setUserData(parsedUserData)
      parseDatasetAndSetData(parsedUserData, undefined, {
        locale,
        decimal: decimalsSeparator,
        group: newThousandsSeparator,
      })
      // setData(parseDataset(parsedUserData, undefined, {locale, decimal: decimalsSeparator, group:newThousandsSeparator}));
    }
  }

  /*
   * Callback to handle user coercing a type of a column
   * When this happens, we don't need to go through data parsing again, we just invoke
   * the raw-core library starting from the parsed data (stage-2 data)
   */
  function coerceTypes(nextTypes: any) {
    parseDatasetAndSetData(userData, nextTypes, {
      locale,
      decimal: decimalsSeparator,
      group: thousandsSeparator,
    })
  }

  /*
   * Callback to handle user selecting a data sample from RawGraphs.io
   * When this happens, we have data parsed with dsv with a proper separator out of the box
   *   since in this case data are rigorously checked
   * So we just take them as good and use the raw-core library to infer types
   */
  function loadSample(rawData: any, sampleSeparator: any) {
    setSeparator(sampleSeparator)
    setUserDataAndDetect(
      rawData,
      { type: 'sample' },
      { separator: sampleSeparator }
    )
  }

  function handleInlineEdit(newDataset: any) {
    setUserData(newDataset)
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    parseDatasetAndSetData(newDataset, data.dataTypes, {
      locale,
      decimal: decimalsSeparator,
      group: thousandsSeparator,
    })
    // setData(parseDataset(newDataset, data.dataTypes, {locale}))
  }

  function handleStackOperation(column: any) {
    setStackDimension(column)
    if (column !== null) {
      if (unstackedData === null) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        setUnstackedInfo([userData, data.dataTypes])
      }
      const stackedData = stackData(unstackedData || userData, column)
      setUserData(stackedData)
      parseDatasetAndSetData(stackedData, undefined, {
        locale,
        decimal: decimalsSeparator,
        group: thousandsSeparator,
      })
      // setData(parseDataset(stackedData, undefined, { locale }))
    } else {
      setUserData(unstackedData)
      parseDatasetAndSetData(unstackedData, unstackedColumns, {
        locale,
        decimal: decimalsSeparator,
        group: thousandsSeparator,
      })
      setUnstackedInfo([null, null])
    }
  }

  const startDataReplace = useCallback(() => {
    setMode(DATA_LOADER_MODE.REPLACE)
    // @ts-expect-error TS(2339): Property 'userInput' does not exist on type '{}'.
    __cache.userInput = userInput
    // @ts-expect-error TS(2339): Property 'userDataType' does not exist on type '{}... Remove this comment to see the full error message
    __cache.userDataType = userDataType
    // @ts-expect-error TS(2339): Property 'dataSource' does not exist on type '{}'.
    __cache.dataSource = dataSource
    // @ts-expect-error TS(2339): Property 'userData' does not exist on type '{}'.
    __cache.userData = userData
    // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    setUserInput(null)
    setUserDataType(null)
    setDataSource(null)
    setUserData(null)
  }, [dataSource, userData, userDataType, userInput])

  const cancelDataReplace = useCallback(() => {
    // @ts-expect-error TS(2345): Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
    setReplaceRequiresConfirmation(false)
    setMode(DATA_LOADER_MODE.DIRECT)
    // @ts-expect-error TS(2339): Property 'userInput' does not exist on type '{}'.
    setUserInput(__cache.userInput)
    // @ts-expect-error TS(2339): Property 'userDataType' does not exist on type '{}... Remove this comment to see the full error message
    setUserDataType(__cache.userDataType)
    // @ts-expect-error TS(2339): Property 'dataSource' does not exist on type '{}'.
    setDataSource(__cache.dataSource)
    // @ts-expect-error TS(2339): Property 'userData' does not exist on type '{}'.
    setUserData(__cache.userData)
  }, [])

  const commitDataReplace = useCallback(() => {
    // @ts-expect-error TS(2345): Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
    setReplaceRequiresConfirmation(false)
    // @ts-expect-error TS(2339): Property 'replacedData' does not exist on type '{}... Remove this comment to see the full error message
    setData(__cache.replacedData)
    setParserError(null)
    // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    setStackDimension(null)
    setUnstackedInfo([null, null])
  }, [])

  return {
    userInput,
    setUserInput: setUserDataAndDetect,
    userData,
    userDataType,
    parseError,
    unstackedData,
    unstackedColumns,
    separator,
    setSeparator: handleChangeSeparator,
    thousandsSeparator,
    setThousandsSeparator: handleChangeThousandsSeparator,
    decimalsSeparator,
    setDecimalsSeparator: handleChangeDecimalSeparator,
    locale,
    setLocale: handleChangeLocale,
    stackDimension,
    dataSource,
    data,
    loading,
    coerceTypes,
    loadSample,
    handleInlineEdit,
    handleStackOperation,
    setJsonData,
    resetDataLoader: reset,
    hydrateFromSavedProject,
    dataLoaderMode: mode,
    startDataReplace,
    cancelDataReplace,
    commitDataReplace,
    replaceRequiresConfirmation,
  }
}
