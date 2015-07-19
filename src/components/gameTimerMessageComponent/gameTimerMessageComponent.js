'use strict';

import React from 'react';

export default class GameTimerMessageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>{this.props.timerMessage}</span>
    );
  }
}

GameTimerMessageComponent.propTypes = {
  timerMessage: React.PropTypes.string.isRequired
};

GameTimerMessageComponent.defaultProps = {};

