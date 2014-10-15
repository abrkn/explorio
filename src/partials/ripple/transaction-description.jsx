/** @jsx React.DOM */
var React = require('react/addons')
var formatters = require('../../helpers/formatters')
var constants = require('../../helpers/constants')
var AccountLink = require('./account-link')

var TransactionDescription = React.createClass({
  render: function() {
    var inner
    var tx = this.props.tx
    var innerTx = tx.tx

    if (this.props.perspective) {
      if (innerTx.TransactionType == 'Payment') {
        var send = innerTx.Account == this.props.perspective
        var other = send ? innerTx.Destination : innerTx.Account
          inner = <span>
            {send ? 'Sent' : 'Received'}{' '}
            {formatters.formatAmount(tx.meta.DeliveredAmount || innerTx.Amount, constants.networks.RIPPLE)}{' '}
            {send ? 'to' : ' from'}{' '}
            <AccountLink id={other} />
            {innerTx.DestinationTag ? ':' + innerTx.DestinationTag : ''}

          </span>
        } else if (innerTx.TransactionType == 'AccountSet') {
          inner = <span>Change account settings</span>
        } else if (innerTx.TransactionType == 'OfferCreate') {
          inner = <span>
            Create offer to give{' '}
            {formatters.formatAmount(innerTx.TakerGets, constants.networks.RIPPLE)}
            {' for '}
            {formatters.formatAmount(innerTx.TakerPays, constants.networks.RIPPLE)}
          </span>
        } else if (innerTx.TransactionType == 'OfferCancel') {
          inner = <span>Cancel offer with sequence #{innerTx.OfferSequence}</span>
        } else {
          inner = <span>Unknown type: {innerTx.TransactionType}</span>
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
