module.exports = {
    devMiddleware: {
        noInfo: false,
        stats: {
            colors: true
        }
    },
    entry: {
        bundle: './src/client.js',
        unauthorized: './src/unauthorized.js'
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },
}
