const React = require('react');
const _ = require("lodash");

const Entry = React.createClass({
  render() {
    return (
      <div className="bb-r-container-content-block bio-column">
        {
          _.map(this.props.bio, (par, i) => (
              <div
                className="bio-paragraph"
                key={ "par-" + i }
              >
                { par }
              </div>
          ))
        }
      </div>
    );
  }
});

module.exports = Entry;

