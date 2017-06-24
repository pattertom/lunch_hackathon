const React = require('react');
const _ = require('lodash');

const DashboardContainer = React.createClass({
  render() {
    return (
      <div className="inner cover">
        <h1 className="cover-heading">Cover your page.</h1>
        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p className="lead">
          <a href="#" className="btn btn-lg btn-secondary">Learn more</a>
        </p>
      </div>
    );
  }
});

module.exports = DashboardContainer;

