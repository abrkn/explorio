/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var num = require('num')
var numbers = require('../../../helpers/numbers')
var constants = require('../../../helpers/constants')
var formatters = require('../../../helpers/formatters')
var transactionsHelper = require('../../../helpers/transactions')
var TransactionDescription = require('../../../partials/ripple/transaction-description')
var CopyButton = require('../../../partials/copy-button')
var AccountInfo = require('./info')
var AccountTransactions = require('./transactions')
var config = require('json!../../../config.json')

var Account = React.createClass({
  componentWillMount: function() {
    document.title = this.props.params.account + config.documentTitleSuffix
  },

  render: function() {
    return <div className="container">
      <h1>{this.props.params.account}</h1>
      <AccountInfo account={this.props.params.account} />
      <AccountTransactions account={this.props.params.account} />
    </div>
  }
})

module.exports = Account
