const React = require('react');
const _ = require("lodash");

const Entry = React.createClass({
  render() {
    return (
      <div className="card">
        <div><strong>Name:</strong> { this.props.name }</div>
        <div><strong>Time:</strong> { this.props.time }</div>
        <div><strong>Place:</strong> { this.props.place }</div>
      </div>
    );
  }
});

module.exports = Entry;

