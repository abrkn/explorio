/** @jsx React.DOM */
var React = require('react/addons')
var CopyButton = require('./copy-button')

var ShortLink = React.createClass({
  render: function() {
    return <span>
      <a href={this.props.href} title={this.props.children}>
        {this.props.children.substr(0, 7)}
      </a>
      {' '}
      <CopyButton clipboard={this.props.children} />
    </span>
  }
})

module.exports = ShortLink
