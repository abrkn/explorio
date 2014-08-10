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
          <a className="navbar-brand" href="#/">Explor.io</a>
          <p className="navbar-text">
            Sponsored by <a href="https://justcoin.com/stellar?utm_source=explorio&amp;utm_medium=link&amp;utm_campaign=product" className="navbar-link">Justcoin Exchange</a>
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
