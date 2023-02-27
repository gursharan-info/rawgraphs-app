import React from 'react'

export default function Paste({
  userInput,
  setUserInput,
  setLoadingError
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <textarea
      value={userInput}
      onChange={(e) => {
        const str = e.target.value
        setUserInput(str)
        setLoadingError(null)
      }}
      style={{
        backgroundColor: 'white',
        border: '1px solid lightgrey',
        borderRadius: 4,
        width: '100%',
        padding: '1rem',
        minHeight: '250px',
        height: '40vh',
      }}
    />
  )
}
