'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../gameQuestionControlComponent/gameQuestionControlStyle';

@Radium
export default class GameQuestionControlComponentComponent extends React.Component {
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

GameQuestionControlComponentComponent.propTypes = {};

GameQuestionControlComponentComponent.defaultProps = {};

