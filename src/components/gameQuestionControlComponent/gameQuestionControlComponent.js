'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../gameQuestionControlComponent/gameQuestionControlStyle';

class GameQuestionControlComponentComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getText(gameStatus) {
    let text = '';
    switch (gameStatus) {
      case 0:
      case 1:
      case 2:
        text = this.props.controlText.get('over');
        break;
      case 3:
        text = this.props.controlText.get('incorrect');
        break;
      case 4:
      case 5:
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
      style
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

