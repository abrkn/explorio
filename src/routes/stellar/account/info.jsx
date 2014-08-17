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
      info: null,
      error: null,
      loading: false
    }
  },

  componentWillMount: function() {
    this.fetch()
  },

  fetch: function() {
    this.setState({ loading: true })

    var remote = remotes[constants.networks.STELLAR]

    remote.requestAccountInfo(this.props.account, this.fetchedInfo)

    stellarFederation.addressToName(this.props.account, true, function(err, username) {
      if (err) throw err
      this.setState({ username: username })
    }.bind(this))
  },

  fetchedInfo: function(err, info) {
    if (!this.isMounted()) return

    if (err) {
      this.setState({
        error: formatters.formatRemoteResponseError(err),
        loading: false
      })
      return
    }

    this.setState({
      info: info,
      loading: false
    })
  },

  render: function() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    if (this.state.error) {
      return <div className="alert alert-danger">{this.state.error}</div>
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
