'use strict';

import React from 'react';

export default class GameTimerMessageComponent extends React.Component {
  constructor(props) {
    super(props);
    const msgText = this.props.msgText;
    this.timerMessage = {
      0: '',
      1: msgText.get('player'),
      2: msgText.get('team'),
      3: msgText.get('over'),
      4: msgText.get('timesUp')
    };
  }

  getMessage(gameStatus) {
    return this.timerMessage[gameStatus];
  }

  render() {
    return (
      <span>{this.getMessage(this.props.gameStatus)}</span>
    );
  }
}

GameTimerMessageComponent.propTypes = {
  msgText: React.PropTypes.object.isRequired,
  gameStatus: React.PropTypes.number.isRequired
};

GameTimerMessageComponent.defaultProps = {};

