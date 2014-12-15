/** @jsx React.DOM */
var React = require('react/addons')
var Search = require('./search')

var Nav = React.createClass({
  render: function() {
    return <div className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#/">
            <img className="logo" src="https://s3-eu-west-1.amazonaws.com/explor.io/images/explorio.svg" alt="Explor.io" />
          </a>
          <p className="navbar-text">
            Your ad here? <a href="mailto:a+explorio@abrkn.com">Contact us</a>
          </p>
        </div>
        <div className="navbar-collapse collapse">
          <Search />
        </div>
      </div>
    </div>
  }
})

module.exports = Nav
