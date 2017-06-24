const React = require('react');
const Sections = require('../components/sections.jsx');
const Bio = require('../components/bio.jsx')

const BioSlide = React.createClass({
  render() {
    let subSlide;
    if (this.props.args.sections) {
      subSlide = <Sections sections={ this.props.args.sections } />;
    } else if (this.props.args.bio) {
      subSlide = <Bio bio={ this.props.args.bio } />;
    }

    return (
      <div className="bb-r-section-container bio-slide slide">
        <div className="area-barnacle bb-theme-transparent barnacle">
          <div className="bb-c-icon-label bb-c-icon-label-static">
            <div className="bb-c-icon-label-content-block bb-icon bb-c-icon-label-icon bb-icon-smaller">
              <img
                src="images/nc-logo-white.svg"
                className="barnacle-logo"
              />
            </div>
            <div className="bb-c-icon-label-content-block bb-c-icon-label-label bb-uppercase-label">
              <div className="barnacle-text">{ this.props.args.person.area }</div>
            </div>
          </div>
        </div>
        <div className="bb-r-container bb-r-container-inline main-content">
          <div className="bb-r-container-content-block bb-r-container-content-block-align-center employee-name-photo photo-column">
            <div className="bb-r-container">
              <div className="bb-r-container-content-block">
                <img
                  className="image-container"
                  src={ this.props.args.person.image }
                />
              </div>
              <div className="bb-r-h2">
                <div className="bio-name">{ this.props.args.person.name }</div>
              </div>
              <div className="bb-h5 dash-subtitle">
                <div className="bio-role">{ this.props.args.person.role }</div>
              </div>
            </div>
          </div>
          { subSlide }
        </div>
      </div>
    );
  }
});

module.exports = BioSlide;
