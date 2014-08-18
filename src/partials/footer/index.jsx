/** @jsx React.DOM */
var React = require('react/addons')
var constants = require('../../helpers/constants')
var RemoteState = require('./remote-state')

var Footer = React.createClass({
  render: function() {
    return <div className="container">
      <hr />

      <div className="row">
        <div className="col-sm-8">
          <a href="https://github.com/abrkn/explorio/issues">Report A Bug</a> ·{' '}
          <a href="https://github.com/abrkn/explorio">Github</a> ·{' '}
          <a href="https://justcoin.com/stellar?utm_source=explorio&amp;utm_medium=link&amp;utm_term=stellar&amp;utm_campaign=product">Buy Stellar</a> ·{' '}
          <a href="https://justcoin.com/?utm_source=explorio&amp;utm_medium=link&amp;utm_term=ripple&amp;utm_campaign=product">Buy Ripple</a>
        </div>

        <div className="col-sm-4">
          <p className="muted pull-right">
            Stellar: <RemoteState network={constants.networks.STELLAR} />
            {' · '}
            Ripple: <RemoteState network={constants.networks.RIPPLE} />
          </p>
        </div>
      </div>
    </div>
  }
})

module.exports = Footer
