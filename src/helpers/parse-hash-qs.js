var parseUrl = require('url').parse

module.exports = function(hash) {
    hash || (hash = location.hash.substr(1))
    var parsed = parseUrl(hash)
    if (parsed.query === null) return {}
    return parsed.query.split('&').reduce(function(p, c) {
        var split = c.split('=')
        p[split[0]] = split.length > 1 ? split[1] : null
        return p
    }, {})
}
