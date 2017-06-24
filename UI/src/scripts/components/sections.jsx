const React = require('react');
const _ = require('lodash');

const Sections = React.createClass({
  render() {
    const content = [];
    for (let i = 0; i < this.props.sections.length; i += 2) {
      const section1 = this.props.sections[i];
      let section2;
      if (i < this.props.sections.length - 1) {
        section2 = this.props.sections[i + 1]
        content.push(
          <div
            className="bb-r-container bb-r-container-inline profile-row"
            key={ section1.name + section2.name }
          >
            <div
              className="bb-r-container-content-block bb-r-container-content-block-align-top section"
              key={ section1.name }
            >
              <div className="bb-r-uppercase-label section-title">{ section1.name }</div>
              <div className="bb-r-uppercase-label-border section-decor" />
              <div className="section-items">
                {
                  _.map(section1.items, (item) => (
                      <div
                        className="bb-p1 section-item"
                        key={ item }
                      >
                        { item }
                      </div>
                  ))
                }
              </div>
            </div>
            <div
              className="bb-r-container-content-block bb-r-container-content-block-align-top section"
              key={ section2.name }
            >
              <div className="bb-r-uppercase-label section-title">{ section2.name }</div>
              <div className="bb-r-uppercase-label-border section-decor" />
              <div className="section-items">
                {
                  _.map(section2.items, (item) => (
                      <div
                        className="bb-p1 section-item"
                        key={ item }
                      >
                        { item }
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
        );
      } else {
        content.push(
          <div
            className="bb-r-container bb-r-container-inline profile-row"
            key={ section1.name }
          >
            <div
              className="bb-r-container-content-block bb-r-container-content-block-align-top section"
              key={ section1.name }
            >
              <div className="bb-r-uppercase-label section-title">{ section1.name }</div>
              <div className="bb-r-uppercase-label-border section-decor" />
              <div className="section-items">
                {
                  _.map(section1.items, (item) => (
                      <div
                        className="bb-p1 section-item"
                        key={ item }
                      >
                        { item }
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="bb-r-container-content-block bio-column section-columns">
        { content }
      </div>
    );
  }
});

module.exports = Sections;
