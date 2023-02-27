import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
// @ts-expect-error TS(6142): Module './App' was resolved to '/Users/gursharan/d... Remove this comment to see the full error message
import App from './App'
import * as serviceWorker from './serviceWorker'
import {
  BrowserRouter as Router,
} from "react-router-dom";

ReactDOM.render(
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <React.StrictMode>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Router>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
