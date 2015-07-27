'use strict';

import React from 'react';
import Radium from 'Radium';

class GameTimerMessageComponent extends React.Component {
  constructor(props) {
    super(props);
    const msgText = this.props.msgText;
    this.timerMessage = {
      0: '',
      1: msgText.get('player'),
      2: msgText.get('team'),
      3: msgText.get('over'),
      4: msgText.get('timesUp'),
      5: msgText.get('nobodyKnows')
    };
  }

  getMessage(gameStatus) {
    return this.timerMessage[gameStatus];
  }

  render() {
    const compStyle = [
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];
    return (
      <span style={compStyle}>{this.getMessage(this.props.gameStatus)}</span>
    );
  }
}

GameTimerMessageComponent.propTypes = {
  msgText: React.PropTypes.object.isRequired,
  gameStatus: React.PropTypes.number.isRequired,
  baseStyles: React.PropTypes.object.isRequired
};

GameTimerMessageComponent.defaultProps = {};

export default Radium(GameTimerMessageComponent);
