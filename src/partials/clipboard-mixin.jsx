/* global ZeroClipboard */
/** @jsx React.DOM */
var React = require('react/addons')

var ClipboardMixin = {
    propTypes: {
        clipboard: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            readyToCopy: false,
            justCopied: false
        }
    },

    zeroReady: function() {
        this.setState({ readyToCopy: true })
    },

    zeroCopy: function(event) {
        event.clipboardData.setData('text/plain', this.props.clipboard)
        this.setState({ justCopied: true })
        setTimeout(function() {
            this.setState({ justCopied: false })
        }.bind(this), 500)
    },

    componentDidMount: function() {
        this.zero = new ZeroClipboard(this.getDOMNode())
        this.zero.on('ready', this.zeroReady)
        this.zero.on('copy', this.zeroCopy)
    }
}

module.exports = ClipboardMixin
