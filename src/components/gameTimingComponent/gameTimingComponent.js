'use strict';

import React from 'react';
import GameTimerSmartComponent from '../gameTimerComponent/gameTimerSmartComponent';
import GameTimerMessageComponent from '../gameTimerMessage/gameTimerMessage';
import GameTimerControlComponent from '../gameTimerControlComponent/gameTimerControlComponent';

export default class GameTimingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="webflex-column">
        <div className="game_timer-title">
          Time remaining
        </div>
        <div className="game_timer-time">
          <GameTimerSmartComponent
            gameTime={this.props.gameTime}
            isPaused={this.props.isPaused}
            isReset={this.props.resetGameTime}
            timeInterval={this.props.timeInterval}
            />
        </div>
        <div className="game_timer-message">
          <GameTimerMessageComponent />
        </div>
        <div className="game_timer-button webflex-row">
          <GameTimerControlComponent
            timerText={this.props.timerText}
            isPaused={this.props.isPaused}
            />
        </div>
      </div>
    );
  }
}

GameTimingComponent.propTypes = {
  gameTime: React.PropTypes.number.isRequired,
  isPaused: React.PropTypes.bool.isRequired,
  resetGameTime: React.PropTypes.bool.isRequired,
  timeInterval: React.PropTypes.number,
  timerText: React.PropTypes.object.isRequired
};

GameTimingComponent.defaultProps = {};

