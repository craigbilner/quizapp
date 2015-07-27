'use strict';

import React from 'react';
import Radium from 'Radium';

class GameTimerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  timeFunc() {
    this.props.onTimeChange(this.props.gameTime - (this.props.timeInterval / 1000));
    if (this.props.gameTime !== 0) {
      this.startTimer();
    }
  }

  startTimer() {
    if (!this.props.isPaused) {
      this.timer = setTimeout(this.timeFunc.bind(this), this.props.timeInterval);
    }
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

    const compStyle = [
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];

    return (
      <span style={compStyle}>{this.props.gameTime}</span>
    );
  }
}

GameTimerComponent.propTypes = {
  gameTime: React.PropTypes.number.isRequired,
  isPaused: React.PropTypes.bool.isRequired,
  isReset: React.PropTypes.bool.isRequired,
  onTimeChange: React.PropTypes.func,
  timeInterval: React.PropTypes.number.isRequired,
  baseStyles: React.PropTypes.object.isRequired
};

GameTimerComponent.defaultProps = {};

export default Radium(GameTimerComponent);
