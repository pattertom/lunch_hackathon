const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const slides = require('./slides.js');

const BioSlide = require('./slides/bio_slide.jsx');
const PivotalSlide = require('./slides/pivotal_slide.jsx');

const DISPLAY_TIME = 90000;
const DISPLAY_RANGE = slides.length;
const PIVOTAL_SLIDE_INDEX = slides.length - 1;
const PIVOTAL_SLIDE_INTERVAL = 2;

const SlideShow = React.createClass({
  getInitialState() {
    return {
      slideIndex: PIVOTAL_SLIDE_INDEX,
      minSlide: 0,
      slidesSincePivotalSlide: PIVOTAL_SLIDE_INTERVAL,
      interval: window.setInterval(this.advance, DISPLAY_TIME)
    };
  },

  advance() {
    let nextIndex = Math.round(Math.random() * DISPLAY_RANGE + this.state.minSlide);
    let slidesToNextPivotal = this.state.slidesSincePivotalSlide - 1;

    // Conditional that disables bio-long from ever showing up, remove to show longer bios
    if (this.state.slidesSincePivotalSlide === 0 || slides[nextIndex].slideType === 'bio-long') {
      nextIndex = PIVOTAL_SLIDE_INDEX;
      slidesToNextPivotal = PIVOTAL_SLIDE_INTERVAL;
    }

    this.setState({
      slideIndex: nextIndex,
      slidesSincePivotalSlide: slidesToNextPivotal
    });
  },

  // Comment in to bring back bio rotation
  componentWillUnmount() {
    window.clearInterval(this.state.interval);
  },

  renderCurrentSlide() {
    const currentSlide = slides[this.state.slideIndex];

    if (currentSlide.slideType === 'bio') {
      return (
        <BioSlide
          args={ currentSlide.args }
          key={ this.state.slideIndex }
        />
      );
    }
    else if (currentSlide.slideType === 'pivotal') {
      return (
        <PivotalSlide
          milestones={ currentSlide.args.milestones }
          key= { this.state.slideIndex }
        />
      )
    }

    return null;
  },
  render() {
    const currentSlide = this.renderCurrentSlide();

    return (
      <div className="slide-show">
        <ReactCSSTransitionGroup
          transitionName="slide-transition"
          transitionEnterTimeout={ 2000 }
          transitionLeave={ false }
        >
          { currentSlide }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = SlideShow;
