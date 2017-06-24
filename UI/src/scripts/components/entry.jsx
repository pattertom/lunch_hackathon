const React = require('react');
const _ = require("lodash");

const Entry = React.createClass({
  render() {
    return (
      <div className="card">
        <div>Name: { this.props.name }</div>
        <div>Time: { this.props.time }</div>
        <div>Place: { this.props.place }</div>
      </div>
    );
  }
});

module.exports = Entry;

