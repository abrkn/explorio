/** @jsx React.DOM */
var React = require('react/addons')
var TransactionLink = require('../../partials/transaction-link')
var TransactionDescription = require('../../partials/transaction-description')
var formatters = require('../../helpers/formatters')

var Transaction = React.createClass({
    render: function() {
        var outer = this.props.data
        var inner = outer.tx

        console.log(inner)

        return <tr className="transaction">
            <td>
                <TransactionLink hash={inner.hash} />
            </td>
            <td>
                {formatters.date(formatters.networkEpochToDate(window.network, inner.date))}
            </td>
            <td>
                <TransactionDescription perspective={this.props.account} tx={inner} />
            </td>
        </tr>
    }
})

module.exports = Transaction
