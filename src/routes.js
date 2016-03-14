import React from 'react'
import App, { Home } from './App'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
)
