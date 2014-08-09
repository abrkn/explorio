/** @jsx React.DOM */
var React = require('react/addons')

var Home = React.createClass({
  render: function() {
    return <div className="container">
      <h1>Welcome to Explorio!</h1>

      <p>
        Explorio lets you browse the ledger of Ripple and Stellar.
      </p>

      <p>
        <a href="#/accounts/gnhPFpbYXcYGMkGxfWdQGFfuKEdJoEThVo">Justcoin</a>
      </p>
    </div>
  }
})

module.exports = Home
