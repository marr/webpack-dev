import React from 'react'
import { createStore } from 'redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { counter } from '../App'
import createHistory from 'react-router/lib/createMemoryHistory'
import AppProvider from '../providers/AppProvider'
import routes from '../routes'

export default (ctx => {
  const store = createStore(counter, 2)
  const history = createHistory(ctx.originalUrl)

  match({ routes, location: ctx.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.error(error.message, 500)
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search, 'back')
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      ctx.ok(renderToString(<AppProvider history={history} store={store}>
        <RouterContext {...renderProps} />
      </AppProvider>))
    } else {
      ctx.notFound(`${ctx.url} not found`)
    }
  })
})
