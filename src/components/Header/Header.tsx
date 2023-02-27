import React from 'react'
// @ts-expect-error TS(2307): Cannot find module './Header.module.scss' or its c... Remove this comment to see the full error message
import styles from './Header.module.scss'
import { Navbar, Nav } from 'react-bootstrap'

export default function Header({
  menuItems
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Navbar bg="white" expand="lg" sticky="top" className={styles.navbar}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Navbar.Brand href="/"><b>RAW</b><span className="text-primary">Graphs</span> 2.0 beta</Navbar.Brand>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Navbar.Collapse id="basic-navbar-nav">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Nav className="ml-auto">
          {menuItems.map((d: any, i: any) => {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Nav.Link key={'item' + i} href={d.href}>
                {d.label}
              </Nav.Link>
            )
          })}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <a
            role="button"
            href="https://github.com/rawgraphs/rawgraphs-app/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary ml-2 d-flex flex-column align-items-center justify-content-center"
          >
            Report issue
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
