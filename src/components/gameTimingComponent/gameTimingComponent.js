'use strict';

import React
  from 'react';
import GameTimerSmartComponent
  from '../gameTimerComponent/gameTimerSmartComponent';
import GameTimerComponent
  from '../gameTimerComponent/gameTimerComponent';
import GameTimerMessageComponent
  from '../gameTimerMessage/gameTimerMessage';
import GameTimerControlSmartComponent
  from '../gameTimerControlComponent/gameTimerControlSmartComponent';
import GameTimerControlComponent
  from '../gameTimerControlComponent/gameTimerControlComponent';

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
          <GameTimerSmartComponent>
            <GameTimerComponent
              gameTime={this.props.gameTime}
              isPaused={this.props.isPaused}
              isReset={this.props.resetGameTime}
              timeInterval={this.props.timeInterval}
              />
          </GameTimerSmartComponent>
        </div>
        <div className="game_timer-message">
          <GameTimerMessageComponent />
        </div>
        <div className="game_timer-button webflex-row">
          <GameTimerControlSmartComponent>
            <GameTimerControlComponent
              timerText={this.props.timerText}
              isPaused={this.props.isPaused}
              />
          </GameTimerControlSmartComponent>
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

