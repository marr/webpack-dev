var app = require('./server').default

if (process.env.NODE_ENV !== 'production') {
  require('babel-register')
}

var port = process.env.PORT || 3000
app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
