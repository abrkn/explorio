/** @jsx React.DOM */
var React = require('react/addons')
var LedgerLink = require('../../../partials/stellar/ledger-link')
var formatters = require('../../../helpers/formatters')
var constants = require('../../../helpers/constants')
var CopyButton = require('../../../partials/copy-button')
var TransactionLink = require('../../../partials/stellar/transaction-link')
var Transactions = require('./transactions')

var Ledger = React.createClass({
  render: function() {
    var data = this.props.data

    return <div>
      <table className="table table-bordered table-striped">
        <tbody>
          {this.props.showHash && <tr>
            <th>Hash</th>
            <td>
              <LedgerLink hash={data.ledger_hash} />
            </td>
          </tr>}
          {this.props.showIndex && <tr>
            <th>Index</th>
            <td>
              <LedgerLink index={data.ledger_index} />
            </td>
          </tr>}
          <tr>
            <th>Parent ledger</th>
            <td>
              <LedgerLink hash={data.parent_hash} />
            </td>
          </tr>
          <tr>
            <th>Accepted</th>
            <td>{data.accepted ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>Inflation sequence</th>
            <td>{data.inflate_seq}</td>
          </tr>
          <tr>
            <th>Total STR</th>
            <td>{formatters.formatDrops(data.total_coins, constants.networks.STELLAR)}</td>
          </tr>
          <tr>
            <th>Fee pool</th>
            <td>{formatters.formatDrops(data.fee_pool, constants.networks.STELLAR)}</td>
          </tr>
          <tr>
            <th>Account hash</th>
            <td>{data.account_hash.substr(0, 7)} <CopyButton clipboard={data.account_hash} /></td>
          </tr>
          <tr>
            <th>Transaction</th>
            <td>
              <TransactionLink hash={data.transaction_hash} />
            </td>
          </tr>
          <tr>
            <th>Close time</th>
            <td>{data.close_time_human}</td>
          </tr>
          <tr>
            <th>Closed</th>
            <td>{data.closed ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>

      <h2>Transactions</h2>
      <Transactions data={data.transactions} />
    </div>
  }
})

module.exports = Ledger
