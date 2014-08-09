/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;
var Nav = require('./partials/nav')
var Footer = require('./partials/footer')
var constants = require('./helpers/constants')

window.Remotes = require('./helpers/remotes')
window.network = constants.networks.STELLAR

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
    );
  }
});

var HomeRoute = require('./routes/home')
var AccountRoute = require('./routes/account')
var TransactionRoute = require('./routes/transaction')

var routes = (
  <Routes>
    <Route handler={App}>
      <Route name="home" path="/" handler={HomeRoute} />
      <Route name="account" path="/accounts/:account" handler={AccountRoute} />
      <Route name="transaction" path="/transactions/:hash" handler={TransactionRoute} />
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);
