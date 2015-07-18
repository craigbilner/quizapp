'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class GameTimerControlSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(isPaused) {
    gameActions.toggleTime({isPaused: !isPaused});
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

GameTimerControlSmartComponent.propTypes = {
  children: React.PropTypes.object
};

GameTimerControlSmartComponent.defaultProps = {};
