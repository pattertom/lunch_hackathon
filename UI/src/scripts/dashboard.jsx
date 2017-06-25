const React = require('react');
const axios = require('axios');
const DashboardContainer = require('./components/dashboard_container.jsx');
const EntryContainer = require('./components/entry_container.jsx');
const Header = require('./components/header.jsx');

const BACKEND_URL = 'http://127.0.0.1:5000/';

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
    }, {
      name: 'Brightwok',
      time: '12:30 PM',
      place: 'Office'
    }, {
      name: 'Brightwok',
      time: '12:30 PM',
      place: 'Office'
    }];

    return {
      entries: entries,
      userId: null
    };
  },

  setCurrentUser() {
    let userUrl = getURL('user');

    axios.get(userUrl)
    .then((response) => {
      this.setState({ userId: response.data.id });
    })
    .catch((response) => {
      console.log('Error');
      console.log(response);
    });
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

        <div className="cover-container">

            <Header
              userId={ this.state.userId }
              logout={ this.logout }
            />

          { currentView }

        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
