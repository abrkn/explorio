var constants = require('./constants')
var format = require('util').format

exports.successOnly = function(tx) {
    return tx.meta.TransactionResult == constants.transactionResults.SUCCESS
}
