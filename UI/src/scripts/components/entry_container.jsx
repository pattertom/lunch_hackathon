const React = require('react');
const _ = require('lodash');

const AddEntry = require('./add_entry.jsx');
const Entry = require('./entry.jsx');

const EntryContainer = React.createClass({
  udpateEntries(e) {
    e.preventDefault()
    // implement this
  },
  render() {
    return (
      <div className="album text-muted">
        <div className="container">

          <div className="row">
            <AddEntry/>
          </div>

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

