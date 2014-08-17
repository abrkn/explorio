/** @jsx React.DOM */
var React = require('react/addons')
var num = require('num')
var remotes = require('../../../helpers/remotes')
var numbers = require('../../../helpers/numbers')
var constants = require('../../../helpers/constants')
var formatters = require('../../../helpers/formatters')
var AccountLink = require('../../../partials/stellar/account-link')
var CopyButton = require('../../../partials/copy-button')
var config = require('json!../../../config.json')
var Ledger = require('./ledger')

var LedgerPage = React.createClass({
  getInitialState: function() {
    return {
      data: null,
      loading: false,
      error: null
    }
  },

  componentWillMount: function() {
    document.title = 'Ledger ' + this.props.params.ledger + config.documentTitleSuffix
    this.fetch()
  },

  fetch: function() {
    var remote = remotes[constants.networks.STELLAR]
    var ledger = parseInt(this.props.params.ledger) || this.props.params.ledger
    this.setState({ loading: true })
    remote.requestLedger(ledger, { transactions: true }, this.fetched)
  },

  fetched: function(err, res) {
    if (!this.isMounted()) return

    if (err) {
      return this.setState({
        error: formatters.formatRemoteResponseError(err),
        loading: false
      })
    }

    this.setState({
      data: res.ledger,
      loading: false
    })
  },

  render: function() {
    var ledger = parseInt(this.props.params.ledger) || this.props.params.ledger
    var inner

    if (this.state.loading) {
      inner = <p>Loading...</p>
    } else if (this.state.error) {
      inner = <div className="alert alert-danger">{this.state.error}</div>
    } else {
      inner = <Ledger data={this.state.data} showHash={typeof ledger == 'number'} showIndex={typeof ledger == 'string'} />
    }

    return <div className="container">
      <h1 title={ledger}>
        Ledger {typeof ledger == 'number' ? '#' + ledger : ledger.substr(0, 7)}
        <CopyButton clipboard={ledger.toString()} />
      </h1>
      {inner}
    </div>
  }
})

module.exports = LedgerPage

