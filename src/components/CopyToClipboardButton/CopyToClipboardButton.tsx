import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import { BsClipboard } from 'react-icons/bs'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
// @ts-expect-error TS(2307): Cannot find module './style.module.css' or its cor... Remove this comment to see the full error message
import style from './style.module.css'

export function CopyToClipboardButton({
  content
}: any) {
  const copyToClipboard = useCopyToClipboard()
  const [pending, setPending] = useState(false)

  const handleCopy = useCallback(() => {
    if (!pending) {
      setPending(true)
      copyToClipboard(content)
      setTimeout(() => {
        setPending(false)
      }, 3000)
    }
  }, [content, copyToClipboard, pending])

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button
      variant="light"
      className={style['copy-to-clipboard-button'] + " d-flex flex-row align-items-center"}
      onClick={handleCopy}
    >
      {pending && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <IoMdCheckmarkCircle className="text-success" />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="ml-2">Copied to clipboard</span>
        </>
      )}
      {!pending && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <BsClipboard />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="ml-2">Copy to clipboard</span>
        </>
      )}
    </Button>
  )
}
