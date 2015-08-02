'use strict';

import React from 'react';
import radium from 'radium';
import {status} from '../../enums/gameEnums';

class GameTimerMessageComponent extends React.Component {
  constructor(props) {
    super(props);
    const msgText = this.props.msgText;
    this.timerMessage = {
      [status.DEFAULT]: '',
      [status.WITH_PLAYER]: msgText.get('player'),
      [status.WITH_QEETEAM]: msgText.get('team'),
      [status.WITH_OTEAM]: msgText.get('over'),
      [status.TIME_UP]: msgText.get('timesUp'),
      [status.FORCE_END]: msgText.get('nobodyKnows')
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

export default radium(GameTimerMessageComponent);
