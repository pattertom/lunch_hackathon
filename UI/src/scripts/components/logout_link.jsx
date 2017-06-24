const React = require('react');

const LogoutLink = React.createClass({
  render() {
    let link = null;
    if (this.props.isLoggedIn) {
      link = <a className="nav-link" href="#" onClick={ this.props.logout }>Logout</a>;
    }

    return (
      <div>
        {link}
      </div>
    );
  }
});

module.exports = LogoutLink;
