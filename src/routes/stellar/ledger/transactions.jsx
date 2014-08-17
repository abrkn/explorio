/** @jsx React.DOM */
var React = require('react/addons')
var Transaction = require('./transaction')

var Transactions = React.createClass({
  render: function() {
    if (!this.props.data.length) {
      return <p>There are no transactions in the ledger.</p>
    }

    return <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        {this.props.data.map(function(x) {
          return <Transaction key={x} hash={x} />
        })}
      </tbody>
    </table>
  }
})

module.exports = Transactions
