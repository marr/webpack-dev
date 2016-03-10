var webpack = require('webpack')
var hotfile = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'

module.exports = {
  devMiddleware: {
    noInfo: true,
    stats: {
      colors: true
    }
  },
  hotMiddleware: {
    log: console.log,
    heartbeat: 10 * 1000,
    path: '/__webpack_hmr'
  },
  entry: {
    bundle: ['./src/client.js', hotfile],
    unauthorized: ['./src/unauthorized.js', hotfile]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ }
    ]
  },
  output: {
    path: '/',
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: __dirname + '/src'
  }
}
