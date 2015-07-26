'use strict';

import React from 'react';
import Radium from'radium';

class GameTimerControlComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getButtonText(isPaused) {
    return isPaused
      ? this.props.timerText.get('startText')
      : this.props.timerText.get('pauseText');
  }

  render() {
    const compStyle = [
      this.props.baseStyles.button,
      this.props.isPaused
        ? this.props.baseStyles.colours.light.primary
        : this.props.baseStyles.colours.dark.primary
    ];

    return (
      <div
        style={compStyle}
        onClick={this.props.handleClick.bind(this, this.props.isPaused)}>
        {this.getButtonText(this.props.isPaused)}
      </div>
    );
  }
}

GameTimerControlComponent.propTypes = {
  isPaused: React.PropTypes.bool.isRequired,
  timerText: React.PropTypes.object.isRequired,
  handleClick: React.PropTypes.func,
  baseStyles: React.PropTypes.object
};

GameTimerControlComponent.defaultProps = {};

export default Radium(GameTimerControlComponent);
