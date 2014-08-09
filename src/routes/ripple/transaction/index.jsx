/** @jsx React.DOM */
var React = require('react/addons')
var num = require('num')
var remotes = require('../../../helpers/remotes')
var numbers = require('../../../helpers/numbers')
var constants = require('../../../helpers/constants')
var formatters = require('../../../helpers/formatters')
var transactionsHelper = require('../../../helpers/transactions')
var TransactionDescription = require('../../../partials/ripple/transaction-description')
var CopyButton = require('../../../partials/copy-button')
var AccountLink = require('../../../partials/ripple/account-link')

var Transaction = React.createClass({
  getInitialState: function() {
    return {
      tx: null
    }
  },

  fetch: function() {
    var remote = remotes[constants.networks.RIPPLE]
    remote.requestTransaction(this.props.params.hash, function(err, res) {
      if (err) throw err
      this.setState({
        tx: res
      })
    }.bind(this))
  },

  componentWillMount: function() {
    this.fetch()
  },

  render: function() {
    var hash = this.props.params.hash
    var tx = this.state.tx

    return <div className="container">
      <h1 title={hash}>{hash.substr(0, 7)} <CopyButton clipboard={hash} /></h1>

      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <th>Account</th>
            <td>{tx && <AccountLink id={tx.Account} />}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{tx && tx.TransactionType}</td>
          </tr>
          <tr>
            <th>Ledger</th>
            <td>{tx && tx.inLedger}</td>
          </tr>
          <tr>
            <th>Fee</th>
            <td>{tx && formatters.formatAmount(tx.Fee, constants.networks.RIPPLE)}</td>
          </tr>
          {tx && tx.TakerPays && <tr>
            <th>Taker pays</th>
            <td>{formatters.formatAmount(tx.TakerPays, constants.networks.RIPPLE)}</td>
          </tr>}
          {tx && tx.TakerGets && <tr>
            <th>Taker gets</th>
            <td>{formatters.formatAmount(tx.TakerGets, constants.networks.RIPPLE)}</td>
          </tr>}
          {tx && tx.Destination && <tr>
            <th>Destination</th>
            <td><AccountLink id={tx.Destination} /></td>
          </tr>}
          {tx && tx.DestinationTag !== undefined && <tr>
            <th>Destination tag</th>
            <td>{tx.DestinationTag}</td>
          </tr>}
          {tx && tx.SourceTag !== undefined && <tr>
            <th>Source tag</th>
            <td>{tx.SourceTag}</td>
          </tr>}
          {tx && tx.Amount && <tr>
            <th>Amount</th>
            <td>{formatters.formatAmount(tx.Amount, constants.networks.RIPPLE)}</td>
          </tr>}
          {tx && tx.Flags !== undefined && <tr>
            <th>Flags</th>
            <td>{tx.Flags}</td>
          </tr>}
        </tbody>
      </table>
    </div>
  }
})

module.exports = Transaction
