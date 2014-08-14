/** @jsx React.DOM */
var React = require('react/addons')

var News = React.createClass({
  render: function() {
    return <div className="news">
      <h2>News</h2>

      <h3>Aug 14th</h3>
      <ul>
        <li>
          Added logo! Thanks to the <a href="https://stellartalk.org/topic/1836-design-a-logo-for-explorio-and-win-15-000-str">design competition</a>
          {' '}winner <a href="http://dryinkdesign.com">yesiam</a>.
        </li>
        <li>Ripple and Stellar's account transactions now supports paging. Click More at the bottom of the results.</li>
        <li>Transactions can now be filtered by account</li>
      </ul>

      <h3>Earlier</h3>
      <ul>
        <li>Hold your mouse over a Stellar address to fetch the nickname</li>
      </ul>
    </div>
  }
})

module.exports = News
