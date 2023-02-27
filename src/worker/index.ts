import * as Comlink from 'comlink'
/* eslint-disable import/no-webpack-loader-syntax */
// @ts-expect-error TS(2307): Cannot find module 'worker-loader!./worker' or its... Remove this comment to see the full error message
import Worker from 'worker-loader!./worker'

let parsingWorker: any // = new Worker()

export function parseDatasetInWorker(data: any, dataTypes: any, parsingOptions: any) {
  // TODO: Check lazy loading vs terminate on each time
  if (!parsingWorker) {
    parsingWorker = new Worker()
  }
  let obj = Comlink.wrap(parsingWorker)
  // @ts-expect-error TS(2339): Property 'parseDataset' does not exist on type 'Re... Remove this comment to see the full error message
  let out = obj.parseDataset(data, dataTypes, parsingOptions)
  return out
}

let mappingWorker: any // = new Worker()

export function mapDataInWorker(
  chartName: any,
  {
    data,
    mapping,
    visualOptions,
    dataTypes
  }: any,
  customChart: any
) {
  // TODO: Check lazy loading vs terminate on each time
  if (!mappingWorker) {
    mappingWorker = new Worker()
  }
  let obj = Comlink.wrap(mappingWorker)
  // @ts-expect-error TS(2339): Property 'mapData' does not exist on type 'Remote<... Remove this comment to see the full error message
  let out = obj.mapData(
    chartName,
    { data, mapping, visualOptions, dataTypes },
    customChart
  )
  return out
}
