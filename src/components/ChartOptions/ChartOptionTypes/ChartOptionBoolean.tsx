import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const ChartOptionBoolean = ({
  optionId,
  label,
  value,
  error,
  onChange,
  className,
  isEnabled
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Row className={className}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Col xs={6} className="d-flex align-items-center nowrap">{label}</Col>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Form className="col-6 d-flex align-items-center">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Form.Check
          type="switch"
          checked={!!value}
          disabled={!isEnabled}
          onChange={(e) => {
            onChange(e.target.checked)
          }}
          id={optionId}
          label={value ? 'Yes' : 'No'}
        />
      </Form>
      {error && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="col-12">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <small>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <i>{error}</i>
          </small>
        </div>
      )}
    </Row>
  )
}

export default React.memo(ChartOptionBoolean)
