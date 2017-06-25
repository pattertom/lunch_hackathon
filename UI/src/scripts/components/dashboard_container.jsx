const React = require('react');
const LoginButton = require('./login_button.jsx');
const _ = require('lodash');

const DashboardContainer = React.createClass({
  render() {
    return (
      <div className="inner cover">
        <h1 className="cover-heading">NextCapital Lunch</h1>
        <p className="lead">Sign in to figure out where you want to go to lunch!</p>
        <div className="lead">
          <LoginButton
            userId={ this.props.userId }
            login={ this.props.login }
          />
        </div>
      </div>
    );
  }
});

module.exports = DashboardContainer;

