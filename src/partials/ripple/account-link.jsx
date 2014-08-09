/** @jsx React.DOM */
var React = require('react/addons')
var CopyButton = require('../copy-button')

var AccountLink = React.createClass({
    render: function() {
        return <span>
            <a href={'#/ripple/accounts/' + this.props.id} title={this.props.id}>
                {this.props.id.substr(0, 7)}
            </a>{' '}
            <CopyButton clipboard={this.props.id} />
        </span>
    }
})

module.exports = AccountLink
