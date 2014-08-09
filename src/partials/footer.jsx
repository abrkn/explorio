/** @jsx React.DOM */
var React = require('react/addons')

var Footer = React.createClass({
  render: function() {
    return <div className="container">
      <hr />

      <div className="row">
        <div className="col-lg-8">
          <a href="https://github.com/abrkn/explorio">Github</a> ·{' '}
          <a href="https://justcoin.com/stellar">Buy Stellar</a>
        </div>

        <div className="col-lg-4">
          <p className="muted pull-right">© 2014 Explor.io</p>
        </div>
      </div>
    </div>
  }
})

module.exports = Footer