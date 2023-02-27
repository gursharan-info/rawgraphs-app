import { useCallback, useState } from 'react'
// @ts-expect-error TS(6142): Module './useCustomCharts' was resolved to '/Users... Remove this comment to see the full error message
import useCustomCharts from './useCustomCharts'
import './chart-types'

// NOTE: ... FUTURE PALCE 2 RAW APPROVED CHARTS FROM USERS <3
// At this point we can mark some npm accounts or special cdn hosts to have secure
// and quailty raw charts ... so we can then skip the security advisor

const HOSTS_WHITELIST = ['localhost']

/**
 * @param {URL} url
 */
function isUrlAllowed(url: any) {
  if (HOSTS_WHITELIST.includes(url.hostname)) {
    return true
  }
  return false
}

/**
 * @param {string} name
 */
function isNpmPkgAllowed(name: any) {
  return false
}

class UserAbortError extends Error {
  isAbortByUser: any;
  constructor(...args: any[]) {
    super(...args)
    this.isAbortByUser = true
  }
}

/**
 * @returns {[CustomChartContract[], {
 *  toConfirmCustomChart: null
 *  | { type: 'npm', value: string }
 *  | { type: 'url', value: url }
 *  | { type: 'file', value: File }
 *  | { type: 'project', value: CustomChartContract }
 *  uploadCustomCharts: (file?: File) => Promise<CustomChartContract[]>
 *  loadCustomChartsFromUrl: (url: string) => Promise<CustomChartContract[]>
 *  loadCustomChartsFromNpm: (name: string) => Promise<CustomChartContract[]>
 *  importCustomChartFromProject: (projectChart: CustomChartContract) => Promise<CustomChartContract>
 *  removeCustomChart: (chart: CustomChartContract) => Promise<CustomChartContract[]>
 *  exportCustomChart: (chart: CustomChartContract) => Promise<{ source: string, content: string | null }>
 *  confirmCustomChartLoad: () => void
 *  abortCustomChartLoad: () => void
 * }]}
 */
export default function useSafeCustomCharts() {
  const [
    customCharts,
    {
      // @ts-expect-error TS(2339): Property 'uploadCustomCharts' does not exist on ty... Remove this comment to see the full error message
      uploadCustomCharts: unsafeUploadCustomCharts,
      // @ts-expect-error TS(2339): Property 'loadCustomChartsFromNpm' does not exist ... Remove this comment to see the full error message
      loadCustomChartsFromNpm: unsafeLoadCustomChartsFromNpm,
      // @ts-expect-error TS(2339): Property 'loadCustomChartsFromUrl' does not exist ... Remove this comment to see the full error message
      loadCustomChartsFromUrl: unsafeLoadCustomChartsFromUrl,
      // @ts-expect-error TS(2339): Property 'importCustomChartFromProject' does not e... Remove this comment to see the full error message
      importCustomChartFromProject: unsafeImportCustomChartFromProject,
      ...methods
    },
  ] = useCustomCharts()

  const [toConfirmCustomChart, setToConfirmCustomChartLoad] = useState(null)

  const loadCustomChartsFromUrl = useCallback(
    (url) => {
      let parsedUrl: any
      try {
        parsedUrl = new URL(url)
      } catch (err) {
        // Invalid url
        return Promise.resolve([])
      }
      if (isUrlAllowed(parsedUrl)) {
        return unsafeLoadCustomChartsFromUrl(String(parsedUrl))
      } else {
        return new Promise((resolve, reject) => {
          setToConfirmCustomChartLoad({
            // @ts-expect-error TS(2345): Argument of type '{ type: string; value: string; r... Remove this comment to see the full error message
            type: 'url',
            value: String(parsedUrl),
            resolve,
            reject,
          })
        })
      }
    },
    [unsafeLoadCustomChartsFromUrl]
  )

  const loadCustomChartsFromNpm = useCallback(
    (inputName) => {
      const name = inputName.trim()
      if (name.trim() === '') {
        return
      }
      if (isNpmPkgAllowed(name)) {
        unsafeLoadCustomChartsFromNpm(name)
      } else {
        return new Promise((resolve, reject) => {
          setToConfirmCustomChartLoad({
            // @ts-expect-error TS(2345): Argument of type '{ type: string; value: any; reso... Remove this comment to see the full error message
            type: 'npm',
            value: name,
            resolve,
            reject,
          })
        })
      }
    },
    [unsafeLoadCustomChartsFromNpm]
  )

  const uploadCustomCharts = useCallback((file) => {
    return new Promise((resolve, reject) => {
      setToConfirmCustomChartLoad({
        // @ts-expect-error TS(2345): Argument of type '{ type: string; value: any; reso... Remove this comment to see the full error message
        type: 'file',
        value: file,
        resolve,
        reject,
      })
    })
  }, [])

  const importCustomChartFromProject = useCallback(
    (projectChart) => {
      const { source } = projectChart.rawCustomChart
      let askConfirm = false
      if (source.indexOf('url:') === 0) {
        if (!isUrlAllowed(new URL(source.replace('url:', '')))) {
          askConfirm = true
        }
      } else if (source.indexOf('npm:') === 0) {
        if (!isNpmPkgAllowed(source.replace('npm:', ''))) {
          askConfirm = true
        }
      } else if (source.indexOf('file:') === 0) {
        askConfirm = true
      }
      if (askConfirm) {
        return new Promise((resolve, reject) => {
          setToConfirmCustomChartLoad({
            // @ts-expect-error TS(2345): Argument of type '{ type: string; value: any; reso... Remove this comment to see the full error message
            type: 'project',
            value: projectChart,
            resolve,
            reject,
          })
        })
      } else {
        return unsafeImportCustomChartFromProject(projectChart)
      }
    },
    [unsafeImportCustomChartFromProject]
  )

  const confirmCustomChartLoad = useCallback(() => {
    // @ts-expect-error TS(2339): Property 'type' does not exist on type 'null'.
    const { type, value, resolve, reject } = toConfirmCustomChart
    if (type === 'file') {
      unsafeUploadCustomCharts(value).then(resolve, reject)
    } else if (type === 'url') {
      unsafeLoadCustomChartsFromUrl(value).then(resolve, reject)
    } else if (type === 'npm') {
      unsafeLoadCustomChartsFromNpm(value).then(resolve, reject)
    } else if (type === 'project') {
      unsafeImportCustomChartFromProject(value).then(resolve, reject)
    }
    setToConfirmCustomChartLoad(null)
  }, [
    toConfirmCustomChart,
    unsafeImportCustomChartFromProject,
    unsafeLoadCustomChartsFromNpm,
    unsafeLoadCustomChartsFromUrl,
    unsafeUploadCustomCharts,
  ])

  const abortCustomChartLoad = useCallback(() => {
    if (toConfirmCustomChart) {
      // @ts-expect-error TS(2339): Property 'reject' does not exist on type 'never'.
      toConfirmCustomChart.reject(new UserAbortError())
    }
    setToConfirmCustomChartLoad(null)
  }, [toConfirmCustomChart])

  return [
    customCharts,
    {
      toConfirmCustomChart,
      abortCustomChartLoad,
      confirmCustomChartLoad,
      uploadCustomCharts,
      loadCustomChartsFromUrl,
      loadCustomChartsFromNpm,
      importCustomChartFromProject,
      ...methods,
    },
  ]
}
