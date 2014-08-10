/** @jsx React.DOM */
var React = require('react/addons')
var formatters = require('../helpers/formatters')
var cx = React.addons.classSet

var DropdownButton = React.createClass({
  onClick: function(value, e) {
    e.preventDefault()
    this.props.onChange(value)
  },

  render: function() {
    return <div className="btn-group">
      <button type="submit" className="btn">{this.props.value}</button>
      <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
        <span className="caret"></span>
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu" role="menu">
        <li><a href="#" onClick={this.onClick.bind(this, 'Stellar')}>Stellar</a></li>
        <li><a href="#" onClick={this.onClick.bind(this, 'Ripple')}>Ripple</a></li>
      </ul>
    </div>
  }
})

var Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      value: '',
      invalid: false,
      network: 'Stellar'
    }
  },

  onSubmit: function(e) {
    e.preventDefault()

    this.setState({ invalid: false })

    if (this.state.network == 'Stellar') {
      if (formatters.isStellarAccountId(this.state.value)) {
        window.location.hash = '#/stellar/accounts/' + this.state.value
        this.setState({ value: '' })
        return
      }

      if (formatters.isTransactionHash(this.state.value)) {
        window.location.hash = '#/stellar/transactions/' + this.state.value
        this.setState({ value: '' })
        return
      }
    } else {
      if (formatters.isRippleAccountId(this.state.value)) {
        window.location.hash = '#/ripple/accounts/' + this.state.value
        this.setState({ value: '' })
        return
      }

      if (formatters.isTransactionHash(this.state.value)) {
        window.location.hash = '#/ripple/transactions/' + this.state.value
        this.setState({ value: '' })
        return
      }
    }

    this.setState({ invalid: true })
  },

  onNetworkChange: function(value) {
    this.setState({ network: value })
  },

  render: function() {
    return <form className="navbar-form navbar-right nav-right" role="search" onSubmit={this.onSubmit}>
      <div className={cx({ 'form-group': true, 'has-error': this.state.invalid })}>
        <input type="text" className="form-control" valueLink={this.linkState('value')} />
      </div>
      <DropdownButton value={this.state.network} onChange={this.onNetworkChange} />
    </form>
  }
})

module.exports = Search
