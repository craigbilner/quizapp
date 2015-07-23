'use strict';

import React from 'react';
import Radium from 'Radium';
import gameActions from '../../actions/gameActions';

class GameTimerControlSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(isPaused) {
    gameActions.toggleTime({isPaused: !isPaused});
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
  baseStyles: React.PropTypes.object
};

GameTimerControlSmartComponent.defaultProps = {};

export default Radium(GameTimerControlSmartComponent);
