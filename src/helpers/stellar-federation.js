var config = require('json!../config.json')
var prefix = 'EXPLORIO_FEDERATION_'
var domain = config.defaultFederationDomain
var request = require('superagent')
var format = require('util').format

if (!window.localStorage) {
  throw new Error('Local storage not supported')
}

function store(key, val) {
  if (val !== undefined) {
    window.localStorage[key] = val === null ? '' : val
    return val
  }
  val = window.localStorage[key]
  // HACK: Fix improperly stored values
  if (val === 'null') return null
  return val === '' ? null : val
}

exports.addressToName = function(addr, fetch, cb) {
  var key = prefix + addr + '@' + domain
  var value = store(key)

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
    store(key, value)
    cb(null, value)
  })
}

exports.nameToAddress = function(username, fetch, cb) {
  var key = prefix + username + '@' + domain
  var value = store(key)

  if (value !== undefined) {
    cb && cb(null, value)
    return value
  }

  if (!fetch) {
    cb && cb()
    return
  }

  var url = format(config.federation, username, domain)
  request.get(url, function(err, res) {
    if (err) return cb(err)
    value = res.notFound ? null : res.body.federation_json.destination_address
    store(key, value)
    cb(null, value)
  })
}
