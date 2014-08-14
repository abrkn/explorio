/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var constants = require('../../../helpers/constants')
var transactionsHelper = require('../../../helpers/transactions')
var AccountTransaction = require('./transaction')
var LIMIT = 200

var Transactions = React.createClass({
  getInitialState: function() {
    return {
      offset: 0,
      txs: [],
      more: null
    }
  },

  fetch: function() {
    var remote = remotes[constants.networks.RIPPLE]
    var opts = {
      ledger_index_min: -1,
      account: this.props.account,
      ledger_index_max: -1,
      descending: true,
      limit: LIMIT,
      offset: this.state.offset || 0
    }

    remote.requestAccountTransactions(opts, function(err, res) {
      if (err) throw err
      var txs = res.transactions.filter(transactionsHelper.successOnly)
      this.setState({
        offset: this.state.offset + res.transactions.length,
        txs: this.state.txs.concat(txs),
        more: res.transactions.length == LIMIT
      })
    }.bind(this))
  },

  componentWillMount: function() {
    this.fetch()
  },

  onClickMore: function(e) {
    e.preventDefault()
    this.fetch()
  },

  render: function() {
    var txs

    if (this.state.txs) {
      var rows = this.state.txs.map(function(tx) {
        return <AccountTransaction key={tx.tx.hash} account={this.props.account} data={tx} />
      }.bind(this))

      txs = <table className="table table-bordered table-striped">
        <tbody>
          {rows}
        </tbody>
      </table>
    } else {
      txs = <p>Loading...</p>
    }

    return <div className="account-transactions">
      <h2>Transactions</h2>
        {txs}
        {this.state.more && <div className="btn-group btn-group-justified">
        <div className="btn-group">
          <button disabled={this.state.loading ? 'disabled' : ''} type="button" className="btn btn-default" onClick={this.onClickMore}>More</button>
        </div>
      </div>}
    </div>
  }
})

module.exports = Transactions
