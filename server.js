var express = require('express')
var path = require('path')
var compression = require('compression')

function forceHttps(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'https') return next()
    res.redirect('https://explor.io' + req.url)
}

var app = express()

app.set('x-powered-by', false)
app.set('trust proxy', true)
app.set('case sensitive routing', true)

if (process.env.NODE_ENV == 'production') {
    app.use(forceHttps)
}

app.use(compression())

app.use(express.static(path.resolve('build')))

var port = process.env.PORT || 8080
app.listen(port)

console.log('Listening on port %d', port)
