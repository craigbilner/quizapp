'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../answerComponent/answerStyle';

class AnswerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const compStyle = [
      this.props.baseStyles.layout.flex(5),
      style,
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];
    return (
      <div style={compStyle}>
        <span>{this.props.answerText}</span>
      </div>
    );
  }
}

AnswerComponent.propTypes = {
  answerText: React.PropTypes.string.isRequired,
  baseStyles: React.PropTypes.object
};

AnswerComponent.defaultProps = {};

export default Radium(AnswerComponent);

