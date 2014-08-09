/** @jsx React.DOM */
var React = require('react/addons')
var formatters = require('../../helpers/formatters')
var constants = require('../../helpers/constants')
var AccountLink = require('./account-link')

var TransactionDescription = React.createClass({
  render: function() {
    var inner
    var tx = this.props.tx

    if (this.props.perspective) {
      if (tx.TransactionType == 'Payment') {
        var send = this.props.tx.Account == this.props.perspective
        var other = send ? tx.Destination : tx.Account
          inner = <span>
            {send ? 'Sent' : 'Received'}{' '}
            {formatters.formatAmount(tx.Amount, constants.networks.STELLAR)}{' '}
            {send ? 'to' : ' from'}{' '}
            <AccountLink id={other} />
            {tx.DestinationTag ? ':' + tx.DestinationTag : ''}

          </span>
        } else if (tx.TransactionType == 'AccountSet') {
          inner = <span>Change account settings</span>
        } else {
          inner = <span>Unknown type: {tx.TransactionType}</span>
        }
    } else {
      throw new Error('Not implemented')
    }

    return <span className="transaction-description">
      {inner}
    </span>
  }
})

module.exports = TransactionDescription
