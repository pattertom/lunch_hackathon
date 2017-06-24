const React = require('react');

const Header = React.createClass({
  render() {
    let logoutLink = null;
    if (this.props.userId) {
      logoutLink = <a className="nav-link" href="#" onClick={ this.props.logout }>Logout</a>;
    }

    return (
      <div className="masthead clearfix">
        <div className="inner">
          <h3 className="masthead-brand">Dragon Slayers</h3>
          <nav className="nav nav-masthead">
            <a className="nav-link active" href="#">Vote</a>
            <a className="nav-link" href="#">History</a>
            <a className="nav-link" href="#">Other</a>
            { logoutLink }
          </nav>
        </div>
      </div>
    );
  }
});

module.exports = Header;
