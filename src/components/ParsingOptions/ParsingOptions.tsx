import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
// @ts-expect-error TS(6142): Module './SeparatorSelector' was resolved to '/Use... Remove this comment to see the full error message
import SeparatorSelector from './SeparatorSelector'
// @ts-expect-error TS(6142): Module './ThousandsSeparatorSelector' was resolved... Remove this comment to see the full error message
import ThousandsSeparatorSelector from './ThousandsSeparatorSelector'
// @ts-expect-error TS(6142): Module './DecimalsSeparatorSelector' was resolved ... Remove this comment to see the full error message
import DecimalsSeparatorSelector from './DecimalsSeparatorSelector'
// @ts-expect-error TS(6142): Module './DateLocaleSelector' was resolved to '/Us... Remove this comment to see the full error message
import DateLocaleSelector from './DateLocaleSelector'
// @ts-expect-error TS(6142): Module './StackSelector' was resolved to '/Users/g... Remove this comment to see the full error message
import StackSelector from './StackSelector'

// @ts-expect-error TS(2307): Cannot find module './ParsingOptions.module.scss' ... Remove this comment to see the full error message
import styles from './ParsingOptions.module.scss'
import { BsArrowRepeat } from 'react-icons/bs'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { get } from 'lodash'
// @ts-expect-error TS(6142): Module '../DataLoader/loaders/UrlFetch' was resolv... Remove this comment to see the full error message
import { fetchData as fetchDataFromUrl } from '../DataLoader/loaders/UrlFetch'
// @ts-expect-error TS(6142): Module '../DataLoader/loaders/SparqlFetch' was res... Remove this comment to see the full error message
import { fetchData as fetchDataFromSparql } from '../DataLoader/loaders/SparqlFetch'

const dataRefreshWorkers = {
  "url": fetchDataFromUrl,
  "sparql": fetchDataFromSparql
}

const dataRefreshCaptions = {
  "url": "Refresh data from url",
  "sparql": "Refresh data from query"
}

export default function ParsingOptions(props: any) {
  const refreshData = async () => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const dataRefreshImpl = dataRefreshWorkers[get(props.dataSource, "type", "")]
    const data = await dataRefreshImpl(props.dataSource)
    props.onDataRefreshed(data)
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Row>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col className={styles.parsingOptions}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <b>DATA PARSING OPTIONS</b>

        {props.userDataType === 'csv' && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SeparatorSelector
            title="Column separator"
            value={props.separator}
            onChange={(nextSeparator: any) => props.setSeparator(nextSeparator)}
          />
        )}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ThousandsSeparatorSelector
          title="Thousands separator"
          value={props.thousandsSeparator}
          onChange={(nextSeparator: any) => props.setThousandsSeparator(nextSeparator)
          }
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DecimalsSeparatorSelector
          title="Decimals separator"
          value={props.decimalsSeparator}
          onChange={(nextSeparator: any) => props.setDecimalsSeparator(nextSeparator)
          }
        />

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DateLocaleSelector
          title="Date Locale"
          value={props.locale}
          onChange={(nextLocale: any) => props.setLocale(nextLocale)}
        />

        {get(dataRefreshWorkers, get(props.dataSource, 'type', ''), null) && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Button
            color="primary"
            className={styles['refresh-button']}
            onClick={() => refreshData()}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <BsArrowRepeat className="mr-2" />
            {get(dataRefreshCaptions, get(props.dataSource, 'type', ''), "Refresh data")}
          </Button>
        )}

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="divider mb-3 mt-0" />

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <b>DATA TRANSFORMATION</b>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <StackSelector
          title="Stack on"
          value={props.stackDimension}
          list={props.dimensions}
          onChange={(nextStackDimension: any) => props.setStackDimension(nextStackDimension)
          }
        />
      </Col>
    </Row>
  );
}
