import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { counter } from './App'
import AppProvider from './providers/AppProvider'

let store = createStore(counter, undefined,
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

render(<AppProvider store={store} />, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}
