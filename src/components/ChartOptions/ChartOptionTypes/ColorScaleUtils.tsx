import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import {
  BsArrowCounterclockwise,
  BsArrowLeftRight,
  BsLockFill,
  BsUnlockFill,
} from 'react-icons/bs'

function ResetBtn({
  resetScale
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      overlay={<Tooltip id={`tooltip-top`}>Reset domain</Tooltip>}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span type="button" className="btn" onClick={resetScale}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BsArrowCounterclockwise width="16" height="16" />
      </span>
    </OverlayTrigger>
  )
}

function InvertBtn({
  invertScale
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      overlay={<Tooltip id={`tooltip-top`}>Invert</Tooltip>}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span type="button" className="btn" onClick={invertScale}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BsArrowLeftRight width="16" height="16" />
      </span>
    </OverlayTrigger>
  )
}

function LockBtn({
  handleChangeLocked,
  locked
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      overlay={<Tooltip id={`tooltip-top`}>{locked ? 'Unlock' : 'Lock'} scale</Tooltip>}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span
        // @ts-expect-error TS(2322): Type '{ children: Element; type: string; className... Remove this comment to see the full error message
        type="button"
        className={`btn ${locked ? 'Xbtn-primary' : ''}`}
        onClick={() => handleChangeLocked(!locked)}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {locked ? <BsUnlockFill width="16" height="16" /> : <BsLockFill width="16" height="16" />}
      </span>
    </OverlayTrigger>
  )
}

export { ResetBtn, InvertBtn, LockBtn }
