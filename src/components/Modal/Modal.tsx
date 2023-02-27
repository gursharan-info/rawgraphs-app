import React from 'react'
// @ts-expect-error TS(2307): Cannot find module './Modal.module.scss' or its co... Remove this comment to see the full error message
import S from './Modal.module.scss'

export default function Modal({
  isOpen,
  toggle,
  children
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={S['background']} onClick={() => toggle()}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={S['modal']} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
