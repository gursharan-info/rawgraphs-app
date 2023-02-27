import React from 'react'
// @ts-expect-error TS(2307): Cannot find module './Section.module.scss' or its ... Remove this comment to see the full error message
import styles from './Section.module.scss'
import { Container, Row, Col, Spinner } from 'react-bootstrap'

export default function Section(props: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container
      fluid
      className={
        [styles.section, props.className].join(' ')
      }
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Row>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Col>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="d-flex align-items-center mb-3">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <h1>{props.title}</h1>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            { props.loading && <Spinner animation="border" variant="primary" style={{width:'2rem', height:'2rem',borderWidth:'2px',marginLeft:'2rem'}} />}
          </div>
          
          {props.children}
        </Col>
      </Row>
    </Container>
  )
}
