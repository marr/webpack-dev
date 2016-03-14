import { Provider } from 'react-redux'
import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import routes from '../routes'

class AppProvider extends Component {
  render() {
    return <Provider store={this.props.store}>
      <Router children={routes} history={browserHistory || this.props.history} />
    </Provider>
  }
}

export default AppProvider
