const React = require('react');
const _ = require("lodash");
const axios = require('axios');

const AddEntry = React.createClass({
  getInitialState() {
    return {
      clicked: false,
      newEntry: ''
    };
  },
  handleChange(event) {
    this.setState({ newEntry: event.target.value });
  },
  addEntry() {
    this.setState({ clicked: false });
    axios.get('http://127.0.0.1:5000/rest/create?name=' + this.state.newEntry)
  },
  markClicked() {
    this.setState({ clicked: true });
  },
  render() {
    let element;
    let classes;

    if (this.state.clicked) {
      element = (
        <div>
          <input value={this.state.newEntry} onChange={this.handleChange} /><a href="#" className="add-entry-button btn btn-secondary " role="button" onClick={() => { this.addEntry() }}>Add</a>
        </div>
      )
      classes = 'add-entry-input';
    } else {
      classes = 'add-card card';
      element = <span onClick={() => { this.markClicked() } }>+ Add New Restaurant</span>
    }

    return (
      <div className={classes}>{ element }</div>
    );
  }
});

module.exports = AddEntry;


