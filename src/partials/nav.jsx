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
        </div>
        <div className="navbar-collapse collapse">
          <Search />
        </div>
      </div>
    </div>
  }
})

module.exports = Nav
