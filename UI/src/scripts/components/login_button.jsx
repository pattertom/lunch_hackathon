const React = require('react');

const LoginButton = React.createClass({
  render() {
    let button = null;
    if (!this.props.isLoggedIn) {
      button = <a href="http://127.0.0.1:5000" className="btn btn-lg btn-secondary" role="button">Sign in with Google</a>;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
});

module.exports = LoginButton;
