/** @jsx React.DOM */
var React = require('react/addons')
var TransactionLink = require('../../../partials/stellar/transaction-link')

var Transaction = React.createClass({
  render: function() {
    return <tr>
      <td><TransactionLink hash={this.props.hash} /></td>
    </tr>
  }
})

module.exports = Transaction
