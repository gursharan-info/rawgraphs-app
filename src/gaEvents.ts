/**
 * @typedef {{
 *  name: string
 *  id: string
 *  description: string
 *  code: string
 *  categories: string[]
 *  tutorial?: string
 * }} chartMetadata
 */

/**
 * @type string | null
 */
let prevChartIdRendered: any = null

/**
 * @param {ChartMetada} chartMetadata
 */
export function onChartRendered(chartMetadata: any) {
  if (prevChartIdRendered === chartMetadata.id) {
    // Nothing to report the chart still the same
    return
  }
  prevChartIdRendered = chartMetadata.id

  // @ts-expect-error TS(2339): Property 'gtag' does not exist on type 'Window & t... Remove this comment to see the full error message
  if (typeof window.gtag === 'function') {
    // @ts-expect-error TS(2339): Property 'gtag' does not exist on type 'Window & t... Remove this comment to see the full error message
    window.gtag('event', 'chart-render', {
      event_category: chartMetadata.id,
    })
  }
}

/**
 * @param {chartMetadata} chartMetadata
 * @param {string} format
 */
export function onChartExported(chartMetadata: any, format: any) {
  // @ts-expect-error TS(2339): Property 'gtag' does not exist on type 'Window & t... Remove this comment to see the full error message
  if (typeof window.gtag === 'function') {
    // @ts-expect-error TS(2339): Property 'gtag' does not exist on type 'Window & t... Remove this comment to see the full error message
    window.gtag('event', 'chart-export', {
      event_category: chartMetadata.id,
      event_label: format,
    })
  }
}
