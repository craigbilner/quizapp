'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class GameTimerSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTimeChanged(newTime) {
    gameActions.updateTime(newTime);
  }

  render() {
    return (
      <div>
        {
          React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              onTimeChange: this.handleTimeChanged.bind(this)
            });
          })
        }
      </div>
    );
  }
}

GameTimerSmartComponent.propTypes = {
  children: React.PropTypes.object
};

GameTimerSmartComponent.defaultProps = {
  timeInterval: 1000
};

