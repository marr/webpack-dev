var webpack = require('webpack')
var hotMiddleware = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
module.exports = {
    devMiddleware: {
        noInfo: false,
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
        bundle: ['./src/client.js', hotMiddleware],
        unauthorized: ['./src/unauthorized.js', hotMiddleware]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
