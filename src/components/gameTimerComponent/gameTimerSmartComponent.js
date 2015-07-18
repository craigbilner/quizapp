'use strict';

import React from 'react';
import GameTimerComponent from '../gameTimerComponent/gameTimerComponent';
import gameActions from '../../actions/gameActions';

export default class GameTimerSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTimeChanged() {
    gameActions.updateTime(this.props.gameTime - (this.props.timeInterval / 1000));
  }

  render() {
    return (
      <GameTimerComponent
        gameTime={this.props.gameTime}
        isPaused={this.props.isPaused}
        isReset={this.props.isReset}
        timeInterval={this.props.timeInterval}
        onTimeChange={this.handleTimeChanged.bind(this)}
        />
    );
  }
}

GameTimerSmartComponent.propTypes = {
  gameTime: React.PropTypes.number.isRequired,
  isPaused: React.PropTypes.bool.isRequired,
  isReset: React.PropTypes.bool.isRequired,
  timeInterval: React.PropTypes.number
};

GameTimerSmartComponent.defaultProps = {
  timeInterval: 1000
};

