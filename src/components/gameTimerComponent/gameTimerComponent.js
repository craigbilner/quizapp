'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class GameTimerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.timeInterval = 1000;
  }

  timeFunc() {
    gameActions.updateTime(this.props.gameTime - 1);
    if (this.props.gameTime !== 0) {
      this.timer = setTimeout(this.timeFunc.bind(this), this.timeInterval);
    }
  }

  startTimer() {
    this.timer = setTimeout(this.timeFunc.bind(this), this.timeInterval);
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
  isReset: React.PropTypes.bool.isRequired
};

GameTimerComponent.defaultProps = {};

