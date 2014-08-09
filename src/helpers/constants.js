exports.networks = {
    STELLAR: 'STELLAR',
    RIPPLE: 'RIPPLE'
}

exports.epochs = {}
exports.epochs[exports.networks.RIPPLE] = 946684800
exports.epochs[exports.networks.STELLAR] = 946684800

exports.transactionResults = {
    SUCCESS: 'tesSUCCESS'
}

exports.nativeCurrency = {}
exports.nativeCurrency[exports.networks.STELLAR] = 'STR'
exports.nativeCurrency[exports.networks.RIPPLE] = 'XRP'

exports.precision = {
    STR: 6,
    XRP: 6
}
