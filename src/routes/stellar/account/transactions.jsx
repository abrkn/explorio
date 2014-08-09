/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var constants = require('../../../helpers/constants')
var transactionsHelper = require('../../../helpers/transactions')
var AccountTransaction = require('./transaction')

var Transactions = React.createClass({
    getInitialState: function() {
        return {
            marker: null,
            txs: []
        }
    },

    fetch: function() {
        var remote = remotes[constants.networks.STELLAR]
        var opts = {
            account: this.props.account,
            descending: true
        }

        if (this.state.marker) {
            opts.marker = marker
        }

        remote.requestAccountTransactions(opts, function(err, res) {
            if (err) throw err
            var txs = res.transactions.filter(transactionsHelper.successOnly)
            this.setState({
                marker: res.marker,
                txs: this.state.txs.concat(txs)
            })
        }.bind(this))
    },

    componentWillMount: function() {
        this.fetch()
    },

    render: function() {
        var txs

        if (this.state.txs) {
            var rows = this.state.txs.map(function(tx) {
                return <AccountTransaction key={tx.tx.hash} account={this.props.account} data={tx} />
            }.bind(this))

            txs = <table className="table table-bordered table-striped">
                <tbody>
                    {rows}
                </tbody>
            </table>
        } else {
            txs = <p>Loading...</p>
        }

        return <div className="account-transactions">
            <h2>Transactions</h2>
            {txs}
        </div>
    }
})

module.exports = Transactions
