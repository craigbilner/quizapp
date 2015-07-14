'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class GameTimerControlComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    gameActions.updateQuestionee();
  }

  render() {
    return (
      <div className="game_timer-control webflex-row" onClick={this.handleClick.bind(this)}>
        PAUSE
      </div>
    );
  }
}

GameTimerControlComponent.propTypes = {};

GameTimerControlComponent.defaultProps = {};

