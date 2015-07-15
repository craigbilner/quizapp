'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class GameTimerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(()=> {
      gameActions.updateTime(this.props.gameTime - 1);
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = 0;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  componentWillReceiveProps() {
    if (this.props.gameTime === 1) {
      this.clearTimer();
    } else if (!this.timerInterval) {
      this.startTimer();
    }
  }

  render() {
    return (
      <span>{this.props.gameTime}</span>
    );
  }
}

GameTimerComponent.propTypes = {
  gameTime: React.PropTypes.number.isRequired
};

GameTimerComponent.defaultProps = {};

