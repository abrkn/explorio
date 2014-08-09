/** @jsx React.DOM */
var React = require('react/addons')
var formatters = require('../helpers/formatters')
var cx = React.addons.classSet

var Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      value: '',
      invalid: false
    }
  },

  onSubmit: function(e) {
    e.preventDefault()

    this.setState({ invalid: false })

    if (formatters.isAccountId(this.state.value)) {
      window.location.hash = '#/stellar/accounts/' + this.state.value
      return
    }

    if (formatters.isTransactionHash(this.state.value)) {
      window.location.hash = '#/stellar/transactions/' + this.state.value
      return
    }

    this.setState({ invalid: true })
  },

  render: function() {
    return <form className="navbar-form navbar-right nav-right" role="search" onSubmit={this.onSubmit}>
      <div className={cx({ 'form-group': true, 'has-error': this.state.invalid })}>
        <input type="text" className="form-control" valueLink={this.linkState('value')} />
      }
      </div>
      <button type="submit" className="btn btn-default">
        Lookup
      </button>
    </form>
  }
})

module.exports = Search
