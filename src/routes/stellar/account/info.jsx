/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var formatters = require('../../../helpers/formatters')
var constants = require('../../../helpers/constants')
var AccountLink = require('../../../partials/stellar/account-link')
var stellarFederation = require('../../../helpers/stellar-federation')

var Info = React.createClass({
  getInitialState: function() {
    return {
      info: null
    }
  },

  componentWillMount: function() {
    var remote = remotes[constants.networks.STELLAR]

    remote.requestAccountInfo(this.props.account, function(err, info) {
      if (err) throw err
        this.setState({ info: info })
    }.bind(this))

    stellarFederation.addressToName(this.props.account, true, function(err, username) {
      if (err) throw err
      this.setState({ username: username })
    }.bind(this))
  },

  render: function() {
    if (!this.state.info) {
      return <p>Loading...</p>
    }

    var data = this.state.info.account_data

    return <table className="table table-bordered table-striped">
      <tbody>
        <tr>
          <th>Username</th>
          <td>
            {this.state.username === undefined && '...'}
            {this.state.username === null && 'None assigned'}
            {typeof this.state.username == 'string' && this.state.username}
          </td>
        </tr>
        <tr>
          <th>STR Balance</th>
          <td>{formatters.formatDrops(data.Balance, constants.networks.STELLAR)}</td>
        </tr>
        <tr>
          <th>Inflation destination</th>
          <td>{data && data.InflationDest && <AccountLink id={data.InflationDest} />}</td>
        </tr>
      </tbody>
    </table>
  }
})

module.exports = Info
