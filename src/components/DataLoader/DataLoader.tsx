// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { get } from 'lodash'
import React, { useCallback, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import {
  BsArrowCounterclockwise,
  BsArrowRepeat,
  // BsClipboard,
  // BsCloud,
  // BsFolder,
  // BsGift,
  BsSearch,
  BsUpload,
} from 'react-icons/bs'
import { DATA_LOADER_MODE } from '../../hooks/useDataLoader'
// @ts-expect-error TS(6142): Module '../DataGrid/DataGrid' was resolved to '/Us... Remove this comment to see the full error message
import DataGrid from '../DataGrid/DataGrid'
// import DataSamples from '../DataSamples/DataSamples'
import JsonViewer from '../JsonViewer'
import ParsingOptions from '../ParsingOptions'
// @ts-expect-error TS(2307): Cannot find module './DataLoader.module.scss' or i... Remove this comment to see the full error message
import styles from './DataLoader.module.scss'
// import LoadProject from './loaders/LoadProject'
// import Paste from './loaders/Paste'
// @ts-expect-error TS(6142): Module './loaders/UploadFile' was resolved to '/Us... Remove this comment to see the full error message
import UploadFile from './loaders/UploadFile'
// @ts-expect-error TS(6142): Module './loaders/UrlFetch' was resolved to '/User... Remove this comment to see the full error message
import UrlFetch from './loaders/UrlFetch'
// @ts-expect-error TS(6142): Module './loading' was resolved to '/Users/gurshar... Remove this comment to see the full error message
import Loading from './loading'
import WarningMessage from '../WarningMessage'
// @ts-expect-error TS(6142): Module './DataMismatchModal' was resolved to '/Use... Remove this comment to see the full error message
import DataMismatchModal from './DataMismatchModal'
// import SparqlFetch from './loaders/SparqlFetch'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'd3-d... Remove this comment to see the full error message
import { tsvFormat } from 'd3-dsv'
import { CopyToClipboardButton } from '../CopyToClipboardButton'

function DataLoader({
  userInput,
  setUserInput,
  userData,
  userDataType,
  parseError,
  unstackedColumns,
  separator,
  setSeparator,
  thousandsSeparator,
  setThousandsSeparator,
  decimalsSeparator,
  setDecimalsSeparator,
  locale,
  setLocale,
  stackDimension,
  dataSource,
  data,
  loading,
  coerceTypes,
  loadSample,
  handleInlineEdit,
  handleStackOperation,
  setJsonData,
  resetDataLoader,
  dataLoaderMode,
  startDataReplace,
  cancelDataReplace,
  commitDataReplace,
  replaceRequiresConfirmation,
  hydrateFromProject
}: any) {
  const [loadingError, setLoadingError] = useState()
  const [initialOptionState, setInitialOptionState] = useState('url')

  const options = [
    // {
    //   id: 'paste',
    //   name: 'Paste your data',
    //   loader: (
    //     <Paste
    //       userInput={userInput}
    //       setUserInput={(rawInput) => setUserInput(rawInput, { type: 'paste' })}
    //       setLoadingError={setLoadingError}
    //     />
    //   ),
    //   message:
    //     'Copy and paste your data from other applications or websites. You can use tabular (TSV, CSV, DSV) or JSON data.',
    //   icon: BsClipboard,
    //   allowedForReplace: true,
    // },
    // {
    //   id: 'sample',
    //   name: 'Try our data samples',
    //   message: '',
    //   loader: (
    //     <DataSamples
    //       onSampleReady={loadSample}
    //       setLoadingError={setLoadingError}
    //     />
    //   ),
    //   icon: BsGift,
    //   allowedForReplace: true,
    // },
    // {
    //   id: 'sparql',
    //   name: 'SPARQL query',
    //   message: 'Load data with a SparQL query',
    //   loader: (
    //     <SparqlFetch
    //       userInput={userInput}
    //       setUserInput={(rawInput, source) => setUserInput(rawInput, source)}
    //       setLoadingError={setLoadingError}
    //       initialState={
    //         initialOptionState?.type === 'sparql' ? initialOptionState : null
    //       }
    //     />
    //   ),
    //   icon: BsCloud,
    //   disabled: false,
    //   allowedForReplace: true,
    // },
    {
      id: 'url',
      name: 'From URL',
      message:
        '',
      loader: (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <UrlFetch
          userInput={userInput}
          setUserInput={(rawInput: any, source: any) => setUserInput(rawInput, source)}
          setLoadingError={setLoadingError}
          initialState={
            // @ts-expect-error TS(2339): Property 'type' does not exist on type 'string'.
            initialOptionState?.type === 'url' ? initialOptionState : null
          }
        />
      ),
      icon: BsSearch,
      disabled: false,
      allowedForReplace: true,
    },
    {
      id: 'upload',
      name: 'Upload your data',
      loader: (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <UploadFile
          userInput={userInput}
          setUserInput={(rawInput: any) => setUserInput(rawInput, { type: 'upload' })
          }
          setLoadingError={setLoadingError}
        />
      ),
      message: 'You can load tabular (TSV, CSV, DSV) or JSON data.',
      icon: BsUpload,
      allowedForReplace: true,
    },
    // {
    //   id: 'project',
    //   name: 'Open your project',
    //   message: 'Load a .rawgraphs project.',
    //   loader: (
    //     <LoadProject
    //       onProjectSelected={hydrateFromProject}
    //       setLoadingError={setLoadingError}
    //     />
    //   ),
    //   icon: BsFolder,
    //   allowedForReplace: false,
    // },
  ]
  const [optionIndex, setOptionIndex] = useState(0)
  const selectedOption = options[optionIndex]

  let mainContent
  if (userData && data) {
    mainContent = (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DataGrid
        userDataset={userData}
        dataset={data.dataset}
        errors={data.errors}
        dataTypes={data.dataTypes}
        coerceTypes={coerceTypes}
        onDataUpdate={handleInlineEdit}
      />
    )
  } else if (userDataType === 'json' && userData === null) {
    mainContent = (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <JsonViewer
        context={JSON.parse(userInput)}
        selectFilter={(ctx: any) => Array.isArray(ctx)}
        onSelect={(ctx: any, path: any) => {
          setJsonData(ctx, path)
        }}
      />
    )
  } else if (loading && !data) {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    mainContent = <Loading />
  } else {
    mainContent = (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        {selectedOption.loader}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p className="mt-3">
          {selectedOption.message}
          {/*<a
            href="https://rawgraphs.io/learning"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check out our guides
          </a>*/}
        </p>
      </>
    )
  }

  // #TODO: memoize/move to component?
  function parsingErrors(data: any) {
    const errors = get(data, 'errors', [])
    const successRows = data.dataset.length - errors.length
    const row = errors[0].row + 1
    const column = Object.keys(errors[0].error)[0]
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        Ops, please check <span className="font-weight-bold">row {row}</span> at
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        column <span className="font-weight-bold">{column}</span>.{' '}
        {errors.length === 2 && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            {' '}
            There's another issue at row{' '}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className="font-weight-bold">{errors[1].row + 1}</span>.{' '}
          </>
        )}
        {errors.length > 2 && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            {' '}
            There are issues in{' '}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className="font-weight-bold">{errors.length - 1}</span> more
            rows.{' '}
          </>
        )}
        {successRows > 0 && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            The remaining{' '}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className="font-weight-bold">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              {successRows} row{successRows > 1 && <>s</>}
            </span>{' '}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            look{successRows === 1 && <>s</>} fine.
          </>
        )}
      </span>
    )
  }

  const reloadRAW = useCallback(() => {
    window.location.replace(window.location.pathname)
  }, [])

  const copyToClipboardButton = !!userData ? (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CopyToClipboardButton content={tsvFormat(userData)} />
  ) : null

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Row>
      {!userData && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Col
          xs={3}
          lg={2}
          className="d-flex flex-column justify-content-start pl-3 pr-0 options"
        >
          {options
            .filter((opt) => {
              return (
                dataLoaderMode !== DATA_LOADER_MODE.REPLACE ||
                opt.allowedForReplace
              )
            })
            .map((d, i) => {
              const classnames = [
                'w-100',
                'd-flex',
                'align-items-center',
                'user-select-none',
                'cursor-pointer',
                styles['loading-option'],
                d.disabled ? styles['disabled'] : null,
                d.id === selectedOption.id && !userDataType
                  ? styles.active
                  : null,
                userDataType ? styles.disabled : null,
              ]
                .filter((c) => c !== null)
                .join(' ')
              return (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div
                  key={d.id}
                  className={classnames}
                  onClick={() => {
                    setOptionIndex(i)
                  }}
                >
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <d.icon className="w-25" />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <h4 className="m-0 d-inline-block">{d.name}</h4>
                </div>
              )
            })}

          {dataLoaderMode === DATA_LOADER_MODE.REPLACE && (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="divider mb-3 mt-0" />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div
                className={`w-100 mb-2 d-flex justify-content-center align-items-center ${styles['start-over']} user-select-none cursor-pointer`}
                onClick={reloadRAW}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <BsArrowRepeat className="mr-2" />
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <h4 className="m-0 d-inline-block">{'Reset'}</h4>
              </div>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div
                className={`w-100 d-flex justify-content-center align-items-center ${styles['start-over']} ${styles['cancel']} user-select-none cursor-pointer mb-3`}
                onClick={() => {
                  cancelDataReplace()
                }}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <h4 className="m-0 d-inline-block">{'Cancel'}</h4>
              </div>
            </>
          )}
        </Col>
      )}
      {userData && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Col
          xs={3}
          lg={2}
          className="d-flex flex-column justify-content-start pl-3 pr-0 options"
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ParsingOptions
            locale={locale}
            setLocale={setLocale}
            separator={separator}
            setSeparator={setSeparator}
            thousandsSeparator={thousandsSeparator}
            setThousandsSeparator={setThousandsSeparator}
            decimalsSeparator={decimalsSeparator}
            setDecimalsSeparator={setDecimalsSeparator}
            dimensions={data ? unstackedColumns || data.dataTypes : []}
            stackDimension={stackDimension}
            setStackDimension={handleStackOperation}
            userDataType={userDataType}
            dataSource={dataSource}
            onDataRefreshed={(rawInput: any) => setUserInput(rawInput, dataSource)}
          />

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="divider mb-3 mt-0" />

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div
            className={`w-100 mb-2 d-flex justify-content-center align-items-center ${styles['start-over']} user-select-none cursor-pointer`}
            onClick={reloadRAW}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <BsArrowRepeat className="mr-2" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <h4 className="m-0 d-inline-block">{'Reset'}</h4>
          </div>

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div
            className={`w-100 d-flex justify-content-center align-items-center ${styles['start-over']} user-select-none cursor-pointer`}
            onClick={() => {
              setInitialOptionState(dataSource)
              const dataSourceIndex = options.findIndex(
                (opt) => opt.id === dataSource?.type
              )
              setOptionIndex(Math.max(dataSourceIndex, 0))
              startDataReplace()
            }}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <BsArrowCounterclockwise className="mr-2" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <h4 className="m-0 d-inline-block">{'Change data'}</h4>
          </div>
        </Col>
      )}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Row className="h-100">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Col className="h-100">
            {mainContent}

            {data && !parseError && get(data, 'errors', []).length === 0 && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WarningMessage
                variant="success"
                // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
                message={
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <span>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className="font-weight-bold">
                      {data.dataset.length} rows
                    </span>{' '}
                    (
                    {data.dataset.length * Object.keys(data.dataTypes).length}{' '}
                    cells) have been successfully parsed, now you can choose a
                    chart!
                  </span>
                }
                // @ts-expect-error TS(2322): Type 'Element | null' is not assignable to type 'n... Remove this comment to see the full error message
                action={copyToClipboardButton}
              />
            )}

            {parseError && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WarningMessage
                variant="danger"
                message={parseError}
                // @ts-expect-error TS(2322): Type 'Element | null' is not assignable to type 'n... Remove this comment to see the full error message
                action={copyToClipboardButton}
              />
            )}

            {get(data, 'errors', []).length > 0 && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WarningMessage
                variant="warning"
                // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
                message={parsingErrors(data)}
                // @ts-expect-error TS(2322): Type 'Element | null' is not assignable to type 'n... Remove this comment to see the full error message
                action={copyToClipboardButton}
              />
            )}

            {loadingError && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WarningMessage
                variant="danger"
                message={loadingError}
                // @ts-expect-error TS(2322): Type 'Element | null' is not assignable to type 'n... Remove this comment to see the full error message
                action={copyToClipboardButton}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
    {replaceRequiresConfirmation && (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DataMismatchModal
        replaceRequiresConfirmation={replaceRequiresConfirmation}
        commitDataReplace={commitDataReplace}
        cancelDataReplace={cancelDataReplace}
      />
    )}
  </>;
}

export default React.memo(DataLoader)
