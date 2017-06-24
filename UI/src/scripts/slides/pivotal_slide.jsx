const React = require('react');
const _ = require('lodash');
const moment = require('moment');
const axios = require('axios');

// PivotalTracker constants
const PROJECT_ID = '1227506';
const ARCHIVE_PROJECT_ID = '1994517';
const POINTS_PER_WEEK = 7;
const FUDGE_FACTOR = 1.5;

// PivotalTracker URLs
const BASE_URL = 'https://www.pivotaltracker.com/services/v5';
const PROJECTS_URL = '/projects/' + PROJECT_ID;
const ARCHIVE_PROJECTS_URL = '/projects/' + ARCHIVE_PROJECT_ID;
const SEARCH = '/search?query=label:';

// PivotalTracker filters
const NUM_WEEKS = 3;
const STATE_ALL_STORIES = '';
const NORMALIZE_VELOCITY = ' accepted_after:-' + NUM_WEEKS + 'w';
const NEGATIONS = ' -label:i-ps -label:i-13* -label:i-14* -label:i-15*';

// Polyfill to give promises to the TV
const Promise = require('es6-promise').Promise;

const getURL = (url, milestone, state) => {
  return BASE_URL + url + SEARCH + milestone + state + NEGATIONS + ' includedone:true'
};

const PivotalSlide = React.createClass({
  getInitialState() {
    return {
      // milestone :
        // state :
          // total_hits
          // total_points
          // velocity
    };
  },

  fetchTotalPointsForMilestone(milestone, state) {
    const projectURL = getURL(PROJECTS_URL, milestone, state);
    const archiveURL = getURL(ARCHIVE_PROJECTS_URL, milestone, state);
    let totalPointsCompleted = 0;
    let totalPoints = 0;

    axios.get(projectURL)
    .then((response) => {
      totalPointsCompleted += response.data.stories.total_points_completed;
      totalPoints += response.data.stories.total_points;
      return axios.get(archiveURL)
    })
    .then((archiveResponse) => {
      totalPointsCompleted += archiveResponse.data.stories.total_points_completed;
      totalPoints += archiveResponse.data.stories.total_points;
      this.setState({
        [milestone]: {
          totalPoints,
          totalPointsCompleted
        }
      })
    })
  },

  fetchStoriesForMilestone(milestone, state) {
    const url = getURL(PROJECTS_URL, milestone, state);

    axios.get(url)
    .then((response) => {
      this.setState({
        [milestone]: {
          [state]: response.data.stories
        }
      });

      this.getVelocity(milestone, state);
    });
  },

  getVelocity(milestone, state) {
    const url = getURL(PROJECTS_URL, milestone, '');

    axios.get(url)
    .then((response) => {
      const calculatedVelocity = response.data.stories.total_points / NUM_WEEKS;

      let newState = _.merge({}, this.state, {
        [milestone]: {
          [state]: {
            velocity: calculatedVelocity
          }
        }
      });
      this.setState(newState);
    });
  },

  componentDidMount() {
    _.each(this.props.milestones, (milestone) => {
      this.fetchTotalPointsForMilestone(milestone, STATE_ALL_STORIES);
    });
  },

  render() {
    const orderedByMilestones = _(this.state).map((v, k) => [k, v]).sortBy(0).fromPairs().value();

    const milestones = !_.isEmpty(orderedByMilestones) &&
      _.map(orderedByMilestones, (milestoneData, milestone) => {
        const totalIncompletePoints = 0;
        // const totalIncompletePoints = milestoneData.totalPoints - milestoneData.totalPointsCompleted;
        const percentage = 1;
        // const percentage = (milestoneData.totalPointsCompleted / milestoneData.totalPoints);

        return (
          <div className="milestone" key={ milestone }>
            <div className="bb-r-container bb-r-container-inline">
              <div className="bb-r-container-content-block fixed-width-medium">
                <h7 className="milestone-caption title-weight">MILESTONE LABEL</h7>
                <h1 className="milestone-value">{ milestone }</h1>
              </div>
              <div className="bb-r-container-content-block">
                <h7 className="milestone-caption title-weight">PROJECT DEADLINE</h7>
                <h1 className="milestone-value">{ moment('20170410', 'YYYYMMDD').format('l') }</h1>
              </div>
              <div
                className="bb-r-container-content-block bb-r-container-content-block-align-right"
              >
                <h7 className="milestone-caption title-weight">POINTS REMAINING</h7>
                <h1 className="milestone-value">{ totalIncompletePoints }</h1>
              </div>
            </div>
            <div className="bar-graph">
              <div
                className="bar"
                style={ { width: percentage * 100 + "%" } }
                key={ percentage }
              >
              </div>
            </div>
            <div className="bb-r-container">
              <div className="bb-r-container-content-block">
                <h3 className="title-weight">Points completed as of { moment().format('MMMM DD, YYYY') }</h3>
              </div>
            </div>
          </div>
        );
      });

    return (
      <div className="bb-r-section-container login-view slide pivotal-slide">
        <div className="bb-r-container bb-r-container-inline">
          <div className="bb-r-container-content-block bb-r-container-content-block-align-center milestones-container">
            <div className="milestones-header">
              <div className="bb-r-container bb-r-container-inline">
                <div className="bb-r-container-content-block bb-r-container-content-block-align-left">
                  <div className="static-header bb-row-table">
                    <div className="header-container">
                      <div className="bb-theme-transparent">
                        <div className="bb-c-icon-label bb-c-icon-label-static">
                          <div className="bb-c-icon-label-content-block bb-icon">
                            <img src="images/nc-logo-white-full.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="milestones milestone-title">Milestone Progress</h1>
                  </div>
                </div>
                <div className="bb-r-container-content-block bb-r-container-content-block-align-right">
                  <h7 className="milestone-caption milestone-subheader title-weight">FEATURED MILESTONE</h7>
                  <h5 className="title-weight">Transamerica MVP Retail Launch</h5>
                </div>
              </div>
            </div>
            <div className="bb-r-container">
              { milestones }
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PivotalSlide;
