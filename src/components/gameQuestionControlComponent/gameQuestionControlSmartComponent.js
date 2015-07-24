'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class GameQuestionControlSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(gameStatus) {
    if (gameStatus < 3) {
      gameActions.forceOver();
    }
    else if (gameStatus === 3) {
      gameActions.endQuestion();
    }
    else if (gameStatus === 4) {
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

