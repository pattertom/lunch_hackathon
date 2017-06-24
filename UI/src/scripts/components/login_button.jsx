const React = require('react');

const LoginButton = React.createClass({
  render() {
    let button = null;
    if (!this.props.userId) {
      button = <a href="#" className="btn btn-lg btn-secondary" role="button" onClick={ this.props.login }>Sign in with Google</a>;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
});

module.exports = LoginButton;
