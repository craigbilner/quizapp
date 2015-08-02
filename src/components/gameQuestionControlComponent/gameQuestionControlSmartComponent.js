'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';
import {status} from '../../enums/gameEnums';

export default class GameQuestionControlSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(gameStatus) {
    if (gameStatus < status.WITH_OTEAM) {
      gameActions.forceOver();
    } else if (gameStatus === status.WITH_OTEAM) {
      gameActions.endQuestion();
    } else {
      gameActions.nextQuestion();
    }
  }

  render() {
    return (
      <div>
        {
          React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              handleClick: this.handleClick.bind(this)
            });
          })
        }
      </div>
    );
  }
}

GameQuestionControlSmartComponent.propTypes = {
  children: React.PropTypes.object
};

GameQuestionControlSmartComponent.defaultProps = {};

