import React from 'react'
// @ts-expect-error TS(2307): Cannot find module './asterisk.svg' or its corresp... Remove this comment to see the full error message
import { ReactComponent as Asterisk } from './asterisk.svg'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

function RequiredIcon() {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <OverlayTrigger
      key="top"
      placement="top"
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      overlay={<Tooltip id={`tooltip-top`}>Mandatory</Tooltip>}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Asterisk width="1rem" height="1rem" style={{marginRight:"2px"}} />
    </OverlayTrigger>
  )
}

export default RequiredIcon
