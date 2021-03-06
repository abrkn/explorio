/** @jsx React.DOM */
var React = require('react/addons')
var Router = require('react-router')
var Route = Router.Route
var Routes = Router.Routes
var Link = Router.Link
var Nav = require('./partials/nav')
var Footer = require('./partials/footer')
var constants = require('./helpers/constants')

window.Remotes = require('./helpers/remotes')
document.originalTitle = document.title

// Expose React to React debugger
window.React = React

var App = React.createClass({
  render: function() {
    return (
      <div>
        {<Nav />}
        {this.props.activeRouteHandler()}
        {<Footer />}
      </div>
    )
  }
})

var HomeRoute = require('./routes/home')
var StellarHomeRoute = require('./routes/stellar/home')
var StellarAccountRoute = require('./routes/stellar/account')
var StellarTransactionRoute = require('./routes/stellar/transaction')
var StellarLedgerRoute = require('./routes/stellar/ledger')
var RippleHomeRoute = require('./routes/ripple/home')
var RippleAccountRoute = require('./routes/ripple/account')
var RippleTransactionRoute = require('./routes/ripple/transaction')

var routes = (
  <Routes>
    <Route handler={App}>
      <Route name="home" path="/" handler={HomeRoute} />
      <Route name="stellarHome" path="/stellar" handler={StellarHomeRoute} />
      <Route name="stellarAccount" path="/stellar/accounts/:account" handler={StellarAccountRoute} />
      <Route name="stellarTransaction" path="/stellar/transactions/:hash" handler={StellarTransactionRoute} />
      <Route name="stellarLedger" path="/stellar/ledgers/:ledger" handler={StellarLedgerRoute} />
      <Route name="rippleHome" path="/ripple" handler={RippleHomeRoute} />
      <Route name="rippleAccount" path="/ripple/accounts/:account" handler={RippleAccountRoute} />
      <Route name="rippleTransaction" path="/ripple/transactions/:hash" handler={RippleTransactionRoute} />
    </Route>
  </Routes>
)

React.renderComponent(routes, document.body)
