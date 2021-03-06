/** @jsx React.DOM */
var React = require('react/addons')
var News = require('./news')
var config = require('json!../../config.json')

var Home = React.createClass({
  componentWillMount: function() {
    document.title = document.originalTitle
  },

  render: function() {
    return <div className="home-page container">
      <h1>Welcome to Explorio!</h1>

      <p>
        Explorio lets you browse the ledgers of Ripple and Stellar.
      </p>

      <div className="row">
        <div className="col-xs-2">
          <a href="#/ripple" className="thumbnail">
            <img src="https://s3-eu-west-1.amazonaws.com/explor.io/images/ripple.png" alt="Ripple" />
            <div className="caption">
              <h3>Ripple</h3>
            </div>
          </a>
        </div>
        <div className="col-xs-2">
          <a href="#/stellar" className="thumbnail">
            <img src="https://s3-eu-west-1.amazonaws.com/explor.io/images/stellar.png" alt="Stellar" />
            <div className="caption">
              <h3>Stellar</h3>
            </div>
          </a>
        </div>
      </div>

      <News />
    </div>
  }
})

module.exports = Home
