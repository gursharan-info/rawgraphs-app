import { Modal, Button } from 'react-bootstrap'

export default function CustomChartWarnModal({
  toConfirmCustomChart,
  abortCustomChartLoad,
  confirmCustomChartLoad
}: any) {
  // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'Modal'.
  return (
    <Modal
      // @ts-expect-error TS(2304): Cannot find name 'show'.
      show={toConfirmCustomChart !== null}
      // @ts-expect-error TS(2304): Cannot find name 'onHide'.
      onHide={() => abortCustomChartLoad(null)}
      // @ts-expect-error TS(2304): Cannot find name 'backdrop'.
      backdrop="static"
      // @ts-expect-error TS(2304): Cannot find name 'centered'.
      centered
      // @ts-expect-error TS(2304): Cannot find name 'aria'.
      aria-labelledby="contained-modal-title-vcenter"
      // @ts-expect-error TS(2552): Cannot find name 'className'. Did you mean 'classN... Remove this comment to see the full error message
      className="raw-modal"
      // @ts-expect-error TS(2304): Cannot find name 'contentClassName'.
      contentClassName='border'
    >
      // @ts-expect-error TS(2713): Cannot access 'Modal.Header' because 'Modal' is a ... Remove this comment to see the full error message
      <Modal.Header closeButton>
        // @ts-expect-error TS(2713): Cannot access 'Modal.Title' because 'Modal' is a t... Remove this comment to see the full error message
        <Modal.Title>Warning!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        // @ts-expect-error TS(2304): Cannot find name 'p'.
        <p>
          // @ts-expect-error TS(2304): Cannot find name 'You'.
          You are about to execute third party JavaScript continue at your own
          // @ts-expect-error TS(2304): Cannot find name 'risk'.
          risk.
        </p>
        // @ts-expect-error TS(2304): Cannot find name 'toConfirmCustomChart'.
        {toConfirmCustomChart && toConfirmCustomChart.type === 'project' && (
          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div
            // @ts-expect-error TS(2304): Cannot find name 'title'.
            title={toConfirmCustomChart.value.rawCustomChart.source}
            // @ts-expect-error TS(2304): Cannot find name 'style'.
            style={{
              // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
              whiteSpace: 'nowrap',
              // @ts-expect-error TS(2304): Cannot find name 'overflow'.
              overflow: 'hidden',
              // @ts-expect-error TS(2304): Cannot find name 'textOverflow'.
              textOverflow: 'ellipsis',
              // @ts-expect-error TS(2304): Cannot find name 'width'.
              width: '100%',
            }}
          // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
          >
            // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
            {toConfirmCustomChart.value.rawCustomChart.source}
          </div>
        )}
      </Modal.Body>

      // @ts-expect-error TS(2304): Cannot find name 'className'.
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          // @ts-expect-error TS(2304): Cannot find name 'variant'.
          variant="light"
          // @ts-expect-error TS(2304): Cannot find name 'onClick'.
          onClick={() => {
            // @ts-expect-error TS(2304): Cannot find name 'abortCustomChartLoad'.
            abortCustomChartLoad()
          }}
        >
          // @ts-expect-error TS(2304): Cannot find name 'Don'.
          Don't execute
        </Button>
        <Button
          // @ts-expect-error TS(2304): Cannot find name 'variant'.
          variant="primary"
          // @ts-expect-error TS(2304): Cannot find name 'onClick'.
          onClick={() => {
            // @ts-expect-error TS(2304): Cannot find name 'confirmCustomChartLoad'.
            confirmCustomChartLoad()
          }}
        // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
        >
          // @ts-expect-error TS(2304): Cannot find name 'Continue'.
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
