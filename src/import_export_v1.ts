// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { get, has } from "lodash"
import charts from "./charts"

export const VERSION = "1"

function objectsToMatrix(listOfObjects: any, columns: any) {
  return listOfObjects.map((obj: any) => {
    return columns.map((col: any) => obj[col]);
  });
}

function matrixToObjects(matrix: any, columns: any) {
  return matrix.map((record: any) => {
    const obj = {}
    for (let i = 0; i < columns.length; i++) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      obj[columns[i]] = record[i]
    }
    return obj
  });
}

export function serializeProject(
  userInput: any,
  userData: any,
  userDataType: any,
  parseError: any,
  unstackedData: any,
  unstackedColumns: any,
  data: any,
  separator: any,
  thousandsSeparator: any,
  decimalsSeparator: any,
  locale: any,
  stackDimension: any,
  dataSource: any,
  currentChart: any,
  mapping: any,
  visualOptions: any,
) {
  const project = {
    version: "1",
  }

  /* First stage: user input */
  // @ts-expect-error TS(2339): Property 'userInput' does not exist on type '{ ver... Remove this comment to see the full error message
  project.userInput = userInput
  // @ts-expect-error TS(2339): Property 'userInputFormat' does not exist on type ... Remove this comment to see the full error message
  project.userInputFormat = userDataType
  // @ts-expect-error TS(2339): Property 'dataSource' does not exist on type '{ ve... Remove this comment to see the full error message
  project.dataSource = dataSource

  /* Second stage: parsed */
  // @ts-expect-error TS(2339): Property 'rawData' does not exist on type '{ versi... Remove this comment to see the full error message
  project.rawData = objectsToMatrix(userData, Object.keys(data.dataTypes))
  // @ts-expect-error TS(2339): Property 'parseError' does not exist on type '{ ve... Remove this comment to see the full error message
  project.parseError = parseError
  // @ts-expect-error TS(2339): Property 'parseOptions' does not exist on type '{ ... Remove this comment to see the full error message
  project.parseOptions = {
    separator,
    thousandsSeparator,
    decimalsSeparator,
    locale,
    stackDimension,
    unstackedData,
    unstackedColumns
  }

  /* Third stage: typed data ready for chart */
  // @ts-expect-error TS(2339): Property 'dataTypes' does not exist on type '{ ver... Remove this comment to see the full error message
  project.dataTypes = data.dataTypes

  /* Chart: mapping and visual options */
  // @ts-expect-error TS(2339): Property 'chart' does not exist on type '{ version... Remove this comment to see the full error message
  project.chart = currentChart.metadata.name
  // @ts-expect-error TS(2339): Property 'mapping' does not exist on type '{ versi... Remove this comment to see the full error message
  project.mapping = mapping
  // @ts-expect-error TS(2339): Property 'visualOptions' does not exist on type '{... Remove this comment to see the full error message
  project.visualOptions = visualOptions

  return project
}

function getOrError(object: any, path: any) {
  if (!has(object, path)) {
    console.log("IMPORT ERROR", object, path)
    throw new Error("Selected project is not valid")
  }
  return get(object, path)
}

export function deserializeProject(project: any) {
  if (project.version !== "1") {
    throw new Error("Invalid version number, please use a suitable deserializer")
  }

  const chartName = getOrError(project, "chart")
  const chart = charts.find(c => c.metadata.name === chartName)
  if (!chart) {
    throw new Error("Unknown chart!")
  }

  return {
    userInput: getOrError(project, "userInput"),
    userData: matrixToObjects(
      getOrError(project, "rawData"), 
      Object.keys(getOrError(project, "dataTypes"))
    ),
    userDataType: getOrError(project, "userInputFormat"),
    parseError: getOrError(project, "parseError"),
    unstackedData: getOrError(project, "parseOptions.unstackedData"),
    unstackedColumns: getOrError(project, "parseOptions.unstackedColumns"),
    dataTypes: getOrError(project, "dataTypes"),
    separator: getOrError(project, "parseOptions.separator"),
    thousandsSeparator: getOrError(project, "parseOptions.thousandsSeparator"),
    decimalsSeparator: getOrError(project, "parseOptions.decimalsSeparator"),
    locale: getOrError(project, "parseOptions.locale"),
    stackDimension: get(project, "parseOptions.stackDimension", undefined),
    dataSource: getOrError(project, "dataSource"),
    currentChart: chart,
    mapping: getOrError(project, "mapping"),
    visualOptions: getOrError(project, "visualOptions"),
  }
}