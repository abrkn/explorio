var Stellar = require('stellar-lib')
var Ripple = require('ripple-lib')
var constants = require('./constants')

var stellar = exports[constants.networks.STELLAR] = new Stellar.Remote({
  servers: [{
    host: 'live.stellar.org',
    port: 9001,
    secure: true
  }]
})

var ripple = exports[constants.networks.RIPPLE] = new Ripple.Remote({
  servers: [{
    host: 's1.ripple.com',
    port: 443,
    secure: true
  }]
})

ripple.connect()
stellar.connect()
