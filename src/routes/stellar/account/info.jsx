/** @jsx React.DOM */
var React = require('react/addons')
var remotes = require('../../../helpers/remotes')
var formatters = require('../../../helpers/formatters')
var constants = require('../../../helpers/constants')

var Info = React.createClass({
    getInitialState: function() {
        return {
            info: null
        }
    },

    componentWillMount: function() {
        var remote = remotes[constants.networks.STELLAR]

        remote.requestAccountInfo(this.props.account, function(err, info) {
            if (err) throw err
            this.setState({ info: info })
        }.bind(this))
    },

    render: function() {
        if (!this.state.info) {
            return <p>Loading...</p>
        }

        var data = this.state.info.account_data

        return <table className="table table-bordered table-striped">
            <tbody>
                <tr>
                    <th>STR Balance</th>
                    <td>{formatters.formatDrops(data.Balance, window.network)}</td>
                </tr>
            </tbody>
        </table>
    }
})

module.exports = Info
