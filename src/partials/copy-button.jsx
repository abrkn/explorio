/** @jsx React.DOM */
var React = require('react/addons')
var ClipboardMixin = require('./clipboard-mixin')

var CopyButton = React.createClass({
  mixins: [ClipboardMixin],

  render: function() {
    return <button
      className="btn btn-xs btn-default"
      disabled={!this.state.readyToCopy && 'disabled'}
    >
      {this.state.justCopied ?
        <i className="fa fa-check" /> :
        <i className="fa fa-clipboard" />
      }
    </button>
  }
})

module.exports = CopyButton
