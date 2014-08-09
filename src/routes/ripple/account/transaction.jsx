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

        return <tr className="transaction">
            <td>
                <TransactionLink hash={inner.hash} />
            </td>
            <td>
                {formatters.date(formatters.networkEpochToDate(constants.networks.RIPPLE, inner.date))}
            </td>
            <td>
                <TransactionDescription perspective={this.props.account} tx={inner} />
            </td>
        </tr>
    }
})

module.exports = Transaction
