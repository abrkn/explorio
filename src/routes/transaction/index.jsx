/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../helpers/remotes')
var num = require('num')
var numbers = require('../../helpers/numbers')
var constants = require('../../helpers/constants')
var formatters = require('../../helpers/formatters')
var transactionsHelper = require('../../helpers/transactions')
var TransactionDescription = require('../../partials/transaction-description')
var CopyButton = require('../../partials/copy-button')
var AccountLink = require('../../partials/account-link')

var Transaction = React.createClass({
  getInitialState: function() {
    return {
      tx: null
    }
  },

  fetch: function() {
    var remote = remotes[window.network]
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
        </tbody>
      </table>
    </div>
  }
})

module.exports = Transaction
