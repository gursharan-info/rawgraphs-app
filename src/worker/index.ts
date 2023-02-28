import * as Comlink from 'comlink'
/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./worker'

let parsingWorker: any // = new Worker()

export function parseDatasetInWorker(data: any, dataTypes: any, parsingOptions: any) {
  // TODO: Check lazy loading vs terminate on each time
  if (!parsingWorker) {
    parsingWorker = new Worker()
  }
  let obj = Comlink.wrap(parsingWorker)
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
    let out = obj.mapData(
    chartName,
    { data, mapping, visualOptions, dataTypes },
    customChart
  )
  return out
}
