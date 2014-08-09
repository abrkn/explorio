/** @jsx React.DOM */
var React = require('react/addons')
var CopyButton = require('./copy-button')

var TransactionLink = React.createClass({
    render: function() {
        return <a href={'#/transactions/' + this.props.hash} title={this.props.hash}>
            {this.props.hash.substr(0, 7)}{' '}
            <CopyButton clipboard={this.props.hash} />
        </a>
    }
})

module.exports = TransactionLink
