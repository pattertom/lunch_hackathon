const React = require('react');
const DashboardContainer = require('./components/dashboard_container.jsx');

const MYCONSTANT = 9000;

const Dashboard = React.createClass({
  getInitialState() {
    return {
      my_prop: 'initial'
    };
  },

  new_func() {
    this.setState({
      my_prop: 'changed'
    });
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
      <DashboardContainer />
    );
  }
});

module.exports = Dashboard;

