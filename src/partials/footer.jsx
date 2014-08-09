/** @jsx React.DOM */
var React = require('react/addons')

var Footer = React.createClass({
  render: function() {
    return <div className="container">
      <hr />

      <footer>
        <p>&copy; Explor.io 2014</p>
      </footer>
    </div>
  }
})

module.exports = Footer
