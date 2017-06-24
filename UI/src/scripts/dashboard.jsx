const React = require('react');
const DashboardContainer = require('./components/dashboard_container.jsx');

const MYCONSTANT = 9000;

const Dashboard = React.createClass({
  getInitialState() {
    return {
      my_prop: 'initial',
      userId: null
    };
  },

  new_func() {
    this.setState({
      my_prop: 'changed'
    });
  },

  isLoggedIn() {
    let loggedIn = false;

    if (this.state.userId) {
      loggedIn = true;
    }

    return loggedIn;
  },

  login(userId) {
    this.setState({ userId: userId });
  },

  logout() {
    this.setState({ userId: null });
  },

  componentWillUnmount() {
    window.clearInterval(this.state.my_prop);
  },

  renderSomething() {
    return (
      <BioSlide
        args={ currentSlide.args }
        key={ this.state.slideIndex }
      />
    );
  },
  render() {
    return (
      <div className="site-wrapper">

        <div className="site-wrapper-inner">

          <div className="cover-container">

            <div className="masthead clearfix">
              <div className="inner">
                <h3 className="masthead-brand">Dragon Slayers</h3>
                <nav className="nav nav-masthead">
                  <a className="nav-link active" href="#">Vote</a>
                  <a className="nav-link" href="#">History</a>
                  <a className="nav-link" href="#">Other</a>
                </nav>
              </div>
            </div>

            <DashboardContainer
              isLoggedIn={ this.isLoggedIn() }
            />

            <div className="mastfoot">
              <div className="inner">
                <p>Some text and a <a href="https://getbootstrap.com">link</a>.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
});

module.exports = Dashboard;

