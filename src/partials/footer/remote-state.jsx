/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../helpers/remotes')
var cx = React.addons.classSet

var RemoteState = React.createClass({
  getInitialState: function() {
    return {
      state: 'connecting'
    }
  },

  componentWillMount: function() {
    this.remote = remotes[this.props.network]
    this.remote.on('state', this.remoteStateHandler)
  },

  componentWillUnmount: function() {
    this.remote.off('state', this.remoteStateHandler)
  },

  remoteStateHandler: function(state) {
    this.setState({ state: state })
  },

  render: function() {
    return <span
      style={{ 'text-transform': 'capitalzie' }}
      className={cx({
        label: 'true',
        'label-success': this.state.state == 'online',
        'label-danger': this.state.state == 'offline',
        'label-warning': this.state.state == 'connecting'
       })}
    >
     {this.state.state}
    </span>
  }
})

module.exports = RemoteState
