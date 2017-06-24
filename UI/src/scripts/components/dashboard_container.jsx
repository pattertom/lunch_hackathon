const React = require('react');
const LoginButton = require('./login_button.jsx');
const _ = require('lodash');

const DashboardContainer = React.createClass({
  render() {
    return (
      <div className="inner cover">
        <h1 className="cover-heading">Cover your page.</h1>
        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p className="lead">
          <LoginButton isLoggedIn={this.props.isLoggedIn} />
        </p>
      </div>
    );
  }
});

module.exports = DashboardContainer;

