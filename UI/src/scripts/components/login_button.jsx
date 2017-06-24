const React = require('react');

const LoginButton = React.createClass({
  getInitialState() {
    return {
      userId: this.props.userId
    };
  },

  render() {
    let button = null;
    if (!this.state.userId) {
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
