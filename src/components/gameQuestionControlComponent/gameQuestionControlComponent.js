'use strict';

import React from 'react';
import Radium from 'Radium';
import {status} from '../../enums/gameEnums';

class GameQuestionControlComponentComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getText(gameStatus) {
    let text = '';
    switch (gameStatus) {
      case status.DEFAULT:
      case status.WITH_PLAYER:
      case status.WITH_QEETEAM:
        text = this.props.controlText.get('over');
        break;
      case status.WITH_OTEAM:
        text = this.props.controlText.get('incorrect');
        break;
      case status.TIME_UP:
      case status.FORCE_END:
        text = this.props.controlText.get('nextQuestion');
        break;
      default:
        break;
    }

    return text;
  }

  render() {
    const compStyle = [
      this.props.baseStyles.button,
      {backgroundColor: this.props.baseStyles.colours.light.primary}
    ];

    return (
      <div style={compStyle} onClick={this.props.handleClick.bind(this, this.props.gameStatus)}>
        {this.getText(this.props.gameStatus)}
      </div>
    );
  }
}

GameQuestionControlComponentComponent.propTypes = {
  baseStyles: React.PropTypes.object,
  handleClick: React.PropTypes.func,
  gameStatus: React.PropTypes.number,
  controlText: React.PropTypes.object
};

GameQuestionControlComponentComponent.defaultProps = {};

export default Radium(GameQuestionControlComponentComponent);

