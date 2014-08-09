/** @jsx React.DOM */
var React = require('react/addons')
var CopyButton = require('../copy-button')

var TransactionLink = React.createClass({
    render: function() {
        return <span>
            <a href={'#/stellar/transactions/' + this.props.hash} title={this.props.hash}>
                {this.props.hash.substr(0, 7)}{' '}
            </a>
            <CopyButton clipboard={this.props.hash} />
        </span>
    }
})

module.exports = TransactionLink
