'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../gameQuestionControlComponent/gameQuestionControlStyle';

class GameQuestionControlComponentComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const compStyle = [
      this.props.baseStyles.button,
      style
    ];

    return (
      <div style={compStyle}>Over </div>
    );
  }
}

GameQuestionControlComponentComponent.propTypes = {
  baseStyles: React.PropTypes.object
};

GameQuestionControlComponentComponent.defaultProps = {};

export default Radium(GameQuestionControlComponentComponent);

