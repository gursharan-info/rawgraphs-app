import React, { useState, useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Modal, Button } from 'react-bootstrap'
import { BsEnvelopeFill } from 'react-icons/bs'

// import styles from './ScreenSizeAlert.module.scss'

function ScreenSizeAlert() {
  const size = useWindowSize()
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  const [showModal, setShowModal] = useState(size.width < 992)
  const [modalWasClosed, setModalWasClosed] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    setModalWasClosed(true)
  }

  useEffect(() => {
    if (modalWasClosed === false) {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      setShowModal(size.width < 992)
    }
  }, [modalWasClosed, size])

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Modal
      className="raw-modal"
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Modal.Header closeButton>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Modal.Title as="h5">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span role="img" aria-label="Party icon">
            🎉
          </span>{' '}
          Welcome to the new RAWGraphs!
        </Modal.Title>
      </Modal.Header>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Modal.Body>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p className="big">
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          RAWGraphs 2.0 is designed for {size.width >= 768 ? 'slightly ' : ' '}
          bigger screens!
        </p>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p>
          Resize your browser window or{' '}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <a href="mailto:?subject=Visit+RAWGraphs+2.0&body=Hello%21%0D%0APlease+do+not+forget+to+take+a+look+at+the+new+version+of+RAWGraphs%21%0D%0A%0D%0AVisit%3A+https%3A%2F%2Fdev.rawgraphs.io%2F%0D%0A%0D%0ASee+you+later%2C%0D%0AThe+RAWGraphs+Team">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <BsEnvelopeFill /> send yourself a reminder
          </a>{' '}
          to come back at a better time.
        </p>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p>Touch devices are not fully supported yet.</p>
      </Modal.Body>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Modal.Footer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Button variant="primary" onClick={handleClose}>
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScreenSizeAlert
