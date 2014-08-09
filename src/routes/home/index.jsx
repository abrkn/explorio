/** @jsx React.DOM */
var React = require('react/addons')

var Home = React.createClass({
  render: function() {
    return <div className="container">
      <h1>Welcome to Explorio!</h1>

      <p>
        Explorio lets you browse the ledger of Ripple and Stellar.
      </p>

      <p>Not sure where to start? Try one of these accounts:</p>

      <ul>
        <li><a href="#/stellar/accounts/gnhPFpbYXcYGMkGxfWdQGFfuKEdJoEThVo">Justcoin (Stellar)</a></li>
        <li><a href="#/ripple/accounts/rJHygWcTLVpSXkowott6kzgZU6viQSVYM1">Justcoin (Ripple)</a></li>
      </ul>
    </div>
  }
})

module.exports = Home
