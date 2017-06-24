const React = require('react');
const axios = require('axios');
const DashboardContainer = require('./components/dashboard_container.jsx');
const EntryContainer = require('./components/entry_container.jsx');
const Header = require('./components/header.jsx');

const MYCONSTANT = 9000;
const BACKEND_URL = "http://127.0.0.1:5000/";

const getURL = (url) => {
  return BACKEND_URL + url
};

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
      userId: null
    };
  },

  new_func() {
    this.setState({
      my_prop: 'changed'
    });
  },

  setCurrentUser() {
    let userUrl = getURL("user/");
    let currentUser = null;

    axios.get(userUrl)
    .then((response) => {
      this.setState({ userId: response.data.id });
    })
    .catch((response) => { console.log(response) });

    return currentUser;
  },

  componentDidMount() {
    if (!this.state.userId) {
      this.setCurrentUser();
    }
  },

  login() {
    window.location.href = BACKEND_URL;
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
    let currentView;
    if (this.state.userId) {
      currentView = <EntryContainer entries={this.state.entries} />
    } else {
      currentView = <DashboardContainer
        userId={ this.state.userId }
        login={ this.login }
      />
    }

    return (
      <div className="site-wrapper">

        <div className="site-wrapper-inner">

          <div className="cover-container">

            <Header
              userId={ this.state.userId }
              logout={ this.logout }
            />

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
