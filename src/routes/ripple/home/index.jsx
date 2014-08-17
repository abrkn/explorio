/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var num = require('num')
var numbers = require('../../../helpers/numbers')
var constants = require('../../../helpers/constants')
var formatters = require('../../../helpers/formatters')
var CopyButton = require('../../../partials/copy-button')
var config = require('json!../../../config.json')

var ServerInfo = React.createClass({
  getInitialState: function() {
    return {}
  },

  componentWillMount: function() {
    document.title = 'Ripple' + config.documentTitleSuffix

    var remote = remotes[constants.networks.RIPPLE]
    remote.requestServerInfo(function(err, res) {
      if (err) throw err
      console.log(res)
      this.setState({ info: res.info })
    }.bind(this))
  },

  render: function() {
    var info = this.state.info

    return <div>
      <h2>Server</h2>
      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <th>Host id</th>
            <td>{info && info.hostid}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{info && info.server_state}</td>
          </tr>
          <tr>
            <th>Version</th>
            <td>{info && info.build_version}</td>
          </tr>
          <tr>
            <th>Complete ledgers</th>
            <td>{info && info.complete_ledgers}</td>
          </tr>
          <tr>
            <th>Load factor</th>
            <td>{info && info.load_factor}</td>
          </tr>
          <tr>
            <th>Peers connected</th>
            <td>{info && info.peers}</td>
          </tr>
          <tr>
            <th>Validation quorum</th>
            <td>{info && info.validation_quorum}</td>
          </tr>
        </tbody>
      </table>
    </div>
  }
})

var Home = React.createClass({
  render: function() {
    return <div className="container">
        <h1>Ripple</h1>
        <ServerInfo />
      </div>
  }
})

module.exports = Home
