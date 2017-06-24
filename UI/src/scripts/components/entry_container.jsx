const React = require('react');
const _ = require('lodash');

const Entry = require('./entry.jsx');

const EntryContainer = React.createClass({
  render() {
    return (
      <div className="album text-muted">
        <div className="container">

          <div className="row">
            {
              _.map(this.props.entries, (entry, i) => (
                <Entry
                  key={'entry' + i}
                  name={ entry.name }
                  time={ entry.time }
                  place={ entry.place }
                />
              ))
            }
          </div>

        </div>
      </div>
    );
  }
});

module.exports = EntryContainer;

