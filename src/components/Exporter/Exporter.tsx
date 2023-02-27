import React, { useCallback, useState } from 'react'
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { onChartExported } from '../../gaEvents'

function downloadBlob(url: any, filename: any) {
  // Create a new anchor element
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'download'
  a.click()
  return a
}

export default function Exporter({
  rawViz,
  exportProject
}: any) {
  const downloadSvg = useCallback(
    (filename) => {
      var svgString = new XMLSerializer().serializeToString(
        rawViz._node.firstChild
      )
      var DOMURL = window.URL || window.webkitURL || window
      var svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      var url = DOMURL.createObjectURL(svg)
      downloadBlob(url, filename)
      // @ts-expect-error TS(2345): Argument of type 'Blob' is not assignable to param... Remove this comment to see the full error message
      DOMURL.revokeObjectURL(svg)
    },
    [rawViz]
  )

  const downloadImage = useCallback(
    (format, filename) => {
      var svgString = new XMLSerializer().serializeToString(
        rawViz._node.firstChild
      )
      var DOMURL = window.URL || window.webkitURL || window
      var svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      var url = DOMURL.createObjectURL(svg)
      var canvas = document.createElement('canvas')
      canvas.height = rawViz._node.firstChild.clientHeight
      canvas.width = rawViz._node.firstChild.clientWidth
      var ctx = canvas.getContext('2d')
      var img = new Image()
      img.onload = function () {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        ctx.drawImage(img, 0, 0)
        var dataUrl = canvas.toDataURL(format)
        downloadBlob(dataUrl, filename)
        // @ts-expect-error TS(2345): Argument of type 'Blob' is not assignable to param... Remove this comment to see the full error message
        DOMURL.revokeObjectURL(svg)
      }
      img.src = url
    },
    [rawViz]
  )

  const downloadProject = useCallback(
    async (filename) => {
      const project = await exportProject()
      const str = JSON.stringify(project)
      const blob = new Blob([str], { type: 'application/json' })
      const DOMURL = window.URL || window.webkitURL || window
      const url = DOMURL.createObjectURL(blob)
      downloadBlob(url, filename)
      DOMURL.revokeObjectURL(url)
    },
    [exportProject]
  )

  const exportFormats = ['svg', 'png', 'jpg', 'rawgraphs']

  const [currentFormat, setCurrentFormat] = useState('svg')
  const [currentFile, setCurrentFile] = useState('viz')

  const downloadViz = useCallback(() => {
    switch (currentFormat) {
      case 'svg':
        downloadSvg(`${currentFile}.svg`)
        break
      case 'png':
        downloadImage('image/png', `${currentFile}.png`)
        break
      case 'jpg':
        downloadImage('image/jpeg', `${currentFile}.jpg`)
        break
      case 'rawgraphs':
        downloadProject(`${currentFile}.rawgraphs`)
        break
      default:
        break
    }
    // TODO: Make a getter for _chartImplementation
    onChartExported(rawViz._chartImplementation.metadata, currentFormat)
  }, [
    currentFile,
    currentFormat,
    downloadImage,
    downloadProject,
    downloadSvg,
    rawViz,
  ])

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="row">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="col col-sm-3">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputGroup className="mb-3 raw-input-group">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input
            type="text"
            className="form-control text-field"
            value={currentFile}
            onChange={(e) => setCurrentFile(e.target.value)}
          ></input>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <DropdownButton
            as={InputGroup.Append}
            title={`.${currentFormat}`}
            id="input-group-dropdown-1"
            className="raw-dropdown"
          >
            {exportFormats.map((d) => {
              return (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Dropdown.Item key={d} onClick={() => setCurrentFormat(d)}>
                  .{d}
                </Dropdown.Item>
              )
            })}
          </DropdownButton>
        </InputGroup>
      </div>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="col col-sm-2">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button
          className="btn btn-primary btn-block raw-btn"
          onClick={downloadViz}
        >
          Download
        </button>
      </div>
    </div>
  )
}
