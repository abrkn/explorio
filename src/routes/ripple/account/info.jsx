/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var formatters = require('../../../helpers/formatters')
var constants = require('../../../helpers/constants')

var Info = React.createClass({
  getInitialState: function() {
    return {
      info: null,
      error: null,
      loading: false
    }
  },

  fetch: function() {
    this.setState({ loading: true })

    var remote = remotes[constants.networks.RIPPLE]

    remote.requestAccountInfo(this.props.account, this.fetched)
  },

  fetched:  function(err, info) {
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

  componentWillMount: function() {
    this.fetch()
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
          <th>XRP Balance</th>
          <td>{formatters.formatDrops(data.Balance, constants.networks.RIPPLE)}</td>
        </tr>
      </tbody>
    </table>
  }
})

module.exports = Info
