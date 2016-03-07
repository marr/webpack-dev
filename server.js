import Koa from 'koa'
import session from 'koa-generic-session'
import morgan from 'koa-morgan'
import route from 'koa-route'
import fs from 'fs'

import devMiddleware from 'koa-webpack-dev-middleware'
import hotMiddleware from 'koa-webpack-hot-middleware'

import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

const app = new Koa()
const compiler = webpack(webpackConfig)

app.use(morgan('short'))
app.use(convert(devMiddleware(compiler, webpackConfig.devMiddleware)))
app.use(convert(hotMiddleware(compiler, webpackConfig.hotMiddleware)))

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = fs.createReadStream(__dirname + '/401.html');
    } else {
      throw err;
    }
  }
})

app.use(route.get("/", function(ctx) {
  ctx.type = 'html'
  ctx.body = fs.createReadStream(__dirname + '/index.html');
}))

app.use(route.get('/secure', function(ctx) {
  ctx.type = 'html'
  ctx.throw(401)
}));

const port = process.env.PORT || 3000
app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
