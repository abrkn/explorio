/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var constants = require('../../../helpers/constants')
var transactionsHelper = require('../../../helpers/transactions')
var AccountTransaction = require('./transaction')
var parseHashQs = require('../../../helpers/parse-hash-qs')

var Transactions = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    var opts = parseHashQs()

    return {
      txs: [],
      more: null,
      accountFilter: '',
      dtFilter: opts.dt !== undefined ? opts.dt : '',
      loading: false,
      marker: null
    }
  },

  fetch: function() {
    var remote = remotes[constants.networks.STELLAR]
    var opts = {
      account: this.props.account,
      ledger_index_min: -1,
      ledger_index_max: -1,
      forward: false,
      marker: this.state.marker
    }

    this.setState({ loading: true })

    remote.requestAccountTransactions(opts, function(err, res) {
      this.setState({ loading: false })

      if (err) throw err

      var txs = res.transactions
      .filter(transactionsHelper.successOnly)

      this.setState({
        marker: res.marker,
        txs: this.state.txs.concat(txs),
        more: res.marker !== undefined
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
      var filtered = this.state.txs.filter(function(x) {
          return ~[x.tx.Account, x.tx.Destination].indexOf(this.props.account)
      }.bind(this))

      if (this.state.accountFilter) {
        filtered = filtered.filter(function(x) {
          if (!x.tx.Destination) return
          var send = this.props.account == x.tx.Account
          var other = send ? x.tx.Destination : x.tx.Account
          return ~other.indexOf(this.state.accountFilter)
        }.bind(this))
      }

      if (this.state.dtFilter) {
        filtered = filtered.filter(function(x) {
          return x.tx.DestinationTag === parseInt(this.state.dtFilter)
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
    }

    return <div className="account-transactions">
      <h2>Transactions{this.state.loading ? '...' :''}</h2>
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="accountFilter">Account filter</label>
          <input name="accountFilter" type="text" valueLink={this.linkState('accountFilter')} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="dtFilter"><abbr title="Destination Tag">DT</abbr> filter</label>
          <input name="dtFilter" type="text" valueLink={this.linkState('dtFilter')} className="form-control" />
        </div>
      </form>
      {txs}
      {this.state.more && <div className="btn-group btn-group-justified">
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
