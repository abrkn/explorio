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
            {formatters.formatAmount(tx.SendMax || tx.Amount, constants.networks.RIPPLE)}{' '}
            {send ? 'to' : ' from'}{' '}
            <AccountLink id={other} />
            {tx.DestinationTag ? ':' + tx.DestinationTag : ''}

          </span>
        } else if (tx.TransactionType == 'AccountSet') {
          inner = <span>Change account settings</span>
        } else if (tx.TransactionType == 'OfferCreate') {
          inner = <span>
            Create offer to give{' '}
            {formatters.formatAmount(tx.TakerGets, constants.networks.RIPPLE)}
            {' for '}
            {formatters.formatAmount(tx.TakerPays, constants.networks.RIPPLE)}
          </span>
        } else if (tx.TransactionType == 'OfferCancel') {
          inner = <span>Cancel offer with sequence #{tx.OfferSequence}</span>
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
