var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()

app.set('x-powered-by', false)
app.set('trust proxy', true)
app.set('case sensitive routing', true)
app.set('strict routing', true)

app.use(compression())

app.use(express.static(path.resolve('build')))

var port = process.env.PORT || 8080
app.listen(port)

console.log('Listening on port %d', port)
