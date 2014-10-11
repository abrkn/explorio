/** @jsx React.DOM */
var React = require('react/addons')
var TransactionLink = require('../../../partials/stellar/transaction-link')
var TransactionDescription = require('../../../partials/stellar/transaction-description')
var formatters = require('../../../helpers/formatters')
var constants = require('../../../helpers/constants')

var Transaction = React.createClass({
  render: function() {
    var outer = this.props.data
    var inner = outer.tx
    var other = this.props.account == inner.Account ? inner.Destination : inner.Account
    var dt = inner.DestinationTag !== undefined ? '?dt=' + inner.DestinationTag : ''

    return <tr className="transaction">
      <td>
        <TransactionLink hash={inner.hash} />
      </td>
      <td>
        {formatters.date(formatters.networkEpochToDate(constants.networks.STELLAR, inner.date))}
      </td>
      <td>
        <TransactionDescription perspective={this.props.account} tx={outer} />
      </td>
      <td>
        {dt && <a href={'#/stellar/accounts/' + other + dt} title="More transactions with the same destination tag">More like this</a>}
      </td>
    </tr>
  }
})

module.exports = Transaction
