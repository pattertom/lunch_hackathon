const React = require('react');
const DashboardContainer = require('./components/dashboard_container.jsx');
const EntryContainer = require('./components/entry_container.jsx');

const MYCONSTANT = 9000;

const Dashboard = React.createClass({
  getInitialState() {
    let entries = [{
      name: 'Naf Naf',
      time: '12:00 PM',
      place: 'Naf Naf'
    }, {
      name: 'Brightwok',
      time: '12:30 PM',
      place: 'Office'
    }];

    return {
      entries: entries,
      my_prop: 'initial',
      userId: sessionStorage.getItem('userId')
    };
  },

  new_func() {
    this.setState({
      my_prop: 'changed'
    });
  },

  isLoggedIn() {
    let loggedIn = true;

    if (this.state.userId) {
      loggedIn = true;
    }

    return loggedIn;
  },

  logout() {
    sessionStorage.removeItem('userId');
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
    let currentView;
    if (this.isLoggedIn) {
      currentView = <EntryContainer entries={this.state.entries} />
    } else {
      currentView = <DashboardContainer
        isLoggedIn={ this.isLoggedIn() }
      />
    }

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

            { currentView }

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

