var Stellar = require('stellar-lib')
var constants = require('./constants')

var stellar = exports[constants.networks.STELLAR] = new Stellar.Remote({
  servers: [
    {
      host: 'live.stellar.org',
      port: 9001,
      secure: true
    }
  ]
})

stellar.connect()
