'use strict';

import React from 'react';
import radium from 'radium';
import gameActions from '../../actions/gameActions';
import {status} from '../../enums/gameEnums';

class GameTimerControlSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(isPaused) {
    if (this.props.gameStatus < status.TIME_UP) {
      gameActions.toggleTime({isPaused: !isPaused});
    }
  }

  render() {
    return (
      <div style={this.props.baseStyles.layout.flex(1)}>
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

GameTimerControlSmartComponent.propTypes = {
  children: React.PropTypes.object,
  baseStyles: React.PropTypes.object,
  gameStatus: React.PropTypes.number.isRequired
};

GameTimerControlSmartComponent.defaultProps = {};

export default radium(GameTimerControlSmartComponent);
