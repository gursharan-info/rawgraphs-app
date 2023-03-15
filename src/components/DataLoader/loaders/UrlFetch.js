import React, { useCallback, useState, useSearchParams } from 'react'
import classNames from 'classnames'
import S from './UrlFetch.module.scss'
import { useLocation } from 'react-router-dom';


export async function fetchData(source) {
  const response = await fetch(source.url)
  const text = await response.text()
  const json = JSON.parse(text).result.records
  return JSON.stringify(json)
}


export default function UrlFetch({
  userInput,
  setUserInput,
  setLoadingError,
  initialState = null,
}) {
  const location = useLocation();
  let {dataset_id} = (Object.fromEntries(new URLSearchParams(location.search)));

  // const [url, setUrl] = useState("http://10.0.96.105:5000/api/3/action/datastore_search?limit=100000&resource_id="+dataset_id)
  const [url, setUrl] = useState("https://ckan.indiadataportal.com/api/3/action/datastore_search?limit=100000&resource_id="+dataset_id)
  // const [url, setUrl] = useState("https://raw.githubusercontent.com/gursharan-info/placeholder-data/main/csr.json")
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
    <form onSubmit={handleSubmit}>
      <input type="hidden"
        className={classNames('w-100', S['url-input'])}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value)
        }}
      />
      <div className="text-right">
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
