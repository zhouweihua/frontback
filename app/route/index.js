import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from '../containers/home'

const RouterCmp = () => (
  <Switch>
    {/* 首页 */}
    <Route exact component={Home} path="/" />

    {/* 跳的主页面 */}
    <Redirect to="/" />
  </Switch>
)

export default RouterCmp
