/** @jsx React.DOM */
var React = require('react/addons')
var CopyButton = require('./copy-button')
var federation = require('../helpers/federation')
var LOOKUP_DELAY = 50

var AccountLink = React.createClass({
    getInitialState: function() {
        return {
            name: federation.addressToName(this.props.id, false),
            federated: false
        }
    },

    lookupAsync: function() {
        federation.addressToName(this.props.id, true, function(err, name) {
            if (err) throw err
            this.setState({ federated: true, name: name })
        }.bind(this))
    },

    onMouseOver: function() {
        if (this.state.federated) return
        if (this.federationTimer) return

        var name = federation.addressToName(this.props.id, false)
        if (name) return this.setState({ name: name, federated: true })

        this.federationTimer = setTimeout(function() {
            this.federationTimer = null
            this.lookupAsync()
        }.bind(this), LOOKUP_DELAY)
    },

    onMouseOut: function() {
        if (!this.federationTimer) return
        clearTimeout(this.federationTimer)
        this.federationTimer = null
    },

    render: function() {
        return <span>
            <a href={'#/accounts/' + this.props.id} title={this.props.id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {this.state.name ?
                    this.state.name :
                    this.props.id.substr(0, 7)
                }
            </a>{' '}
            <CopyButton clipboard={this.props.id} />
        </span>
    }
})

module.exports = AccountLink
