
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import ComponentTest from './components/ComponentTest'

ReactDOM.render(
    <ComponentTest data="111" />,
  document.getElementById('root'),
)
