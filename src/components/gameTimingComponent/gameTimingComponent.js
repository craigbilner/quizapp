'use strict';

import React from 'react';
import GameTimerComponent from '../gameTimerComponent/gameTimerComponent';
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
          <GameTimerComponent gameTime={this.props.gameTime} isReset={this.props.resetGameTime}/>
        </div>
        <div className="game_timer-message">
          <GameTimerMessageComponent />
        </div>
        <div className="game_timer-button webflex-row">
          <GameTimerControlComponent />
        </div>
      </div>
    );
  }
}

GameTimingComponent.propTypes = {
  gameTime: React.PropTypes.number.isRequired,
  resetGameTime: React.PropTypes.bool.isRequired
};

GameTimingComponent.defaultProps = {};

