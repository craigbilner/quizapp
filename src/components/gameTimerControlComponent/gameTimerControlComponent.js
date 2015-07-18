'use strict';

import React from 'react';

export default class GameTimerControlComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getButtonText(isPaused) {
    return isPaused
      ? this.props.timerText.get('startText')
      : this.props.timerText.get('pauseText');
  }

  render() {
    return (
      <div
        className="game_timer-control webflex-row"
        onClick={this.props.handleClick.bind(this, this.props.isPaused)}>
        {this.getButtonText(this.props.isPaused)}
      </div>
    );
  }
}

GameTimerControlComponent.propTypes = {
  isPaused: React.PropTypes.bool.isRequired,
  timerText: React.PropTypes.object.isRequired,
  handleClick: React.PropTypes.func
};

GameTimerControlComponent.defaultProps = {};

