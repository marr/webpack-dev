import React from 'react'
import { connect } from 'react-redux'

const App = ({ children, increment, counter }) => (
  <div className="container" onMouseMove={increment}>
    {React.cloneElement(children, { counter })}
  </div>
)

export function counter (state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

export const Home = ({ counter }) => (
  <h1>counter: {counter}</h1>
)

const mapStateToProps = state => {
  return {
    counter: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
