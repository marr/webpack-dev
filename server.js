import Koa from 'koa'
import session from 'koa-generic-session'
import morgan from 'koa-morgan'
import route from 'koa-route'
import fs from 'fs'

import devMiddleware from 'koa-webpack-dev-middleware'
import hotMiddleware from 'koa-webpack-hot-middleware'
import responseCalls from './src/middleware/responseCalls'
import clientRouting from './src/middleware/clientRouting'

import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

const app = new Koa()
const compiler = webpack(webpackConfig)

app.use(morgan('short'))
app.use(convert(devMiddleware(compiler, webpackConfig.devMiddleware)))
app.use(convert(hotMiddleware(compiler, webpackConfig.hotMiddleware)))
app.use(responseCalls)

// Comment out the below line to accept mouse input
app.use(clientRouting)

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

export default app
