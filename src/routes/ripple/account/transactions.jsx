/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var constants = require('../../../helpers/constants')
var transactionsHelper = require('../../../helpers/transactions')
var AccountTransaction = require('./transaction')
var LIMIT = 200

var Transactions = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      offset: 0,
      txs: [],
      more: null,
      accountFilter: '',
      loading: false
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

    this.setState({ loading: true })

    remote.requestAccountTransactions(opts, function(err, res) {
      this.setState({ loading: false })

      if (err) throw err

      var txs = res.transactions
      .filter(transactionsHelper.successOnly)

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
      var filtered = this.state.txs

      if (this.state.accountFilter) {
        filtered = filtered.filter(function(x) {
          if (!x.tx.Destination) return
          var send = this.props.account == x.tx.Account
          var other = send ? x.tx.Destination : x.tx.Account
          return ~other.indexOf(this.state.accountFilter)
        }.bind(this))
      }

      var rows = filtered.map(function(tx) {
        return <AccountTransaction key={tx.tx.hash} account={this.props.account} data={tx} />
      }.bind(this))

      txs = <table className="table table-bordered table-striped">
        <tbody>
          {rows}
        </tbody>
      </table>
    } else {
    }

    return <div className="account-transactions">
      <h2>Transactions{this.state.loading ? '...' :''}</h2>
        <div>
          <div className="form-group">
            <label htmlFor="accountFilter">Account filter</label>
            <input name="accountFilter" type="text" valueLink={this.linkState('accountFilter')} className="form-control" />
          </div>
        </div>
        {txs}
        {this.state.more && <div className="btn-group btn-group-justified" disabled={this.state.loading ? 'disabled' : ''}>
        <div className="btn-group">
          <button disabled={this.state.loading ? 'disabled' : ''} type="button" className="btn btn-default" onClick={this.onClickMore}>
            More{this.state.loading ? '...' :''}
          </button>
        </div>
      </div>}
    </div>
  }
})

module.exports = Transactions
