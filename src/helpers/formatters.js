var num = require('num')
var constants = require('./constants')
var numbers = require('./numbers')
var moment = require('moment')

exports.formatAmount = function(amount, network) {
    if (typeof amount == 'string') {
        return exports.formatDrops(amount, network)
    }

    return numbers.format(amount.value, { currency: amount.currency + ':' + amount.issuer.substr(0, 4) })
}

exports.formatDrops = function(n, network) {
    var currency = constants.nativeCurrency[network]
    var precision = constants.precision[currency]
    return numbers.format(num(n, precision), { currency: currency })
}

exports.networkEpochToDate = function(network, epoch) {
    return new Date((constants.epochs[network] + epoch) * 1e3)
}

exports.date = function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

exports.isAccountId = function(value) {
    return !!value.match(/^g[a-zA-Z0-9]{33}$/)
}

exports.isTransactionHash = function(value) {
    return !!value.match(/^[A-Z0-9]{64}$/)
}
