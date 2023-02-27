import React, { useCallback } from 'react'
import { Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'
// @ts-expect-error TS(2307): Cannot find module './LoadProject.module.scss' or ... Remove this comment to see the full error message
import S from './LoadProject.module.scss'
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
import { deserializeProject } from '@rawgraphs/rawgraphs-core'
import charts from '../../../charts'


export default function LoadProject({
  onProjectSelected,
  setLoadingError
}: any) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader()
      reader.addEventListener('load', (e) => {
        try {
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          const project = deserializeProject(e.target.result, charts)
          setLoadingError(null)
          onProjectSelected(project)
        } catch (e) {
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          setLoadingError(e.message)
        }
      })
      if (acceptedFiles.length) {
        reader.readAsText(acceptedFiles[0])
      }
    },
    [onProjectSelected, setLoadingError]
  )
  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: '.rawgraphs',
    // @ts-expect-error TS(2345): Argument of type '{ onDrop: (acceptedFiles: any) =... Remove this comment to see the full error message
    maxFiles: 1,
  })
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      className={classNames(S.dropzone, {
        [S.reject]: isDragReject,
        [S.accept]: isDragAccept,
      })}
      {...getRootProps()}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <input {...getInputProps()} />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span>Drag a file here or </span>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button className={S['browse-button']} color="primary">
        Browse
      </Button>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span>a file from your computer</span>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {isDragAccept && <p>All files will be accepted</p>}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {isDragReject && <p>Some files will be rejected</p>}
    </div>
  )
}
