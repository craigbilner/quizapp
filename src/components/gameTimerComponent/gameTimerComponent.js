'use strict';

import React from 'react';

export default class GameTimerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  timeFunc() {
    this.props.onTimeChange();
    if (this.props.gameTime !== 0) {
      this.startTimer();
    }
  }

  startTimer() {
    this.timer = setTimeout(this.timeFunc.bind(this), this.props.timeInterval);
  }

  clearTimer() {
    clearTimeout(this.timer);
    this.timer = 0;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    if (this.props.isReset) {
      this.clearTimer();
      this.startTimer();
    }

    return (
      <span>{this.props.gameTime}</span>
    );
  }
}

GameTimerComponent.propTypes = {
  gameTime: React.PropTypes.number.isRequired,
  isReset: React.PropTypes.bool.isRequired,
  onTimeChange: React.PropTypes.func.isRequired,
  timeInterval: React.PropTypes.number.isRequired
};

GameTimerComponent.defaultProps = {};

