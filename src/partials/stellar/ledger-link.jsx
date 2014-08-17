/** @jsx React.DOM */
var React = require('react/addons')
var CopyButton = require('../copy-button')
var ShortLink = require('../short-link')

// A ledger link can use either index or an hash
var LedgerLink = React.createClass({
  render: function() {
    if (this.props.hash) {
      return <ShortLink href={'#/stellar/ledgers/' + this.props.hash}>{this.props.hash}</ShortLink>
    } else {
      return <span>
        <a href={'#/stellar/ledgers/' + this.props.index} title={'#' + this.props.index}>
          #{this.props.index}
        </a>
        {' '}
        <CopyButton clipboard={this.props.index.toString()} />
      </span>
    }
  }
})

module.exports = LedgerLink
