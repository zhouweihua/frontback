import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'

import CoreRouter from './route'

import history from './utils/history'

ReactDOM.render(
  <Router history={history}>
    <CoreRouter />
  </Router>,
  document.getElementById('root'),
)
