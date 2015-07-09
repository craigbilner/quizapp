'use strict';

import React from 'react';

export default class GameTimerControlComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="game_timer-control webflex-row">
        PAUSE
      </div>
    );
  }
}

GameTimerControlComponent.propTypes = {};

GameTimerControlComponent.defaultProps = {};

