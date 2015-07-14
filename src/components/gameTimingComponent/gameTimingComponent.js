'use strict';

import React from 'react';
import GameTimerComponent from '../gameTimerComponent/gameTimerComponent';
import GameTimerMessageComponent from '../gameTimerMessage/gameTimerMessage';
import GameTimerControlComponent from '../gameTimerControlComponent/gameTimerControlComponent';

export default class GameTimingComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="webflex-column">
        <div className="game_timer-title">
          Time remaining
        </div>
        <div className="game_timer-time">
          <GameTimerComponent />
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

GameTimingComponent.propTypes = {};

GameTimingComponent.defaultProps = {};
