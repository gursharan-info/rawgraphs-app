// @ts-expect-error TS(2305): Module '"react"' has no exported member 'useSearch... Remove this comment to see the full error message
import React, { useCallback, useState, useSearchParams } from 'react'
import classNames from 'classnames'
// @ts-expect-error TS(2307): Cannot find module './UrlFetch.module.scss' or its... Remove this comment to see the full error message
import S from './UrlFetch.module.scss'
import { useLocation } from 'react-router-dom';


export async function fetchData(source: any) {
  const response = await fetch(source.url)
  const text = await response.text()
  const json = JSON.parse(text).result.records
  return JSON.stringify(json)
}


export default function UrlFetch({
  userInput,
  setUserInput,
  setLoadingError,
  initialState = null
}: any) {
  const location = useLocation();
  // @ts-expect-error TS(2550): Property 'fromEntries' does not exist on type 'Obj... Remove this comment to see the full error message
  let {dataset_id} = (Object.fromEntries(new URLSearchParams(location.search)));

  const [url, setUrl] = useState("http://10.0.96.105:5000/api/3/action/datastore_search?limit=100000&resource_id="+dataset_id)
  // const [url, setUrl] = useState(initialState?.url)
  console.log(url)
  const fetchUrl = useCallback(
    async (url) => {
      const source = { type: 'url', url }
      let data
      try {
        data = await fetchData(source)
        setUserInput(data, source)
        setLoadingError(null)
      } catch (e) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        setLoadingError('Loading error. ' + e.message)
      }
    },
    [setLoadingError, setUserInput]
  )

  const handleSubmit = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      fetchUrl(url)
      return false
    },
    [url, fetchUrl]
  )
  
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <form onSubmit={handleSubmit}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <input type="hidden"
        className={classNames('w-100', S['url-input'])}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value)
        }}
      />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="text-right">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button
          className="btn btn-sm btn-success mt-3"
          disabled={!url}
          type="submit"
        >
          Get Data
        </button>
      </div>
    </form>
  )
}
