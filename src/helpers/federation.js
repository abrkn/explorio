var config = require('json!../config.json')
var prefix = 'EXPLORIO_FEDERATION_'
var domain = config.defaultFederationDomain
var request = require('superagent')
var format = require('util').format

if (!window.localStorage) {
  throw new Error('Local storage not supported')
}

exports.addressToName = function(addr, fetch, cb) {
  var key = prefix + addr + '@' + domain
  var value = window.localStorage[key]

  if (value !== undefined) {
    cb && cb(null, value)
    return value
  }

  if (!fetch) {
    cb && cb()
    return
  }

  var url = format(config.reverseFederation, addr, domain)
  request.get(url, function(err, res) {
    if (err) return cb(err)
    value = res.notFound ? null : res.body.federation_json.destination
    window.localStorage[key] = value
    cb(null, value)
  })
}
