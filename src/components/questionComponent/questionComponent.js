'use strict';

import React from 'react';
import radium from 'radium';
import style from '../questionComponent/questionStyle';

class QuestionComponent extends React.Component {
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
        <span>{this.props.questionText}</span>
      </div>
    );
  }
}

QuestionComponent.propTypes = {
  questionText: React.PropTypes.string.isRequired,
  baseStyles: React.PropTypes.object
};

QuestionComponent.defaultProps = {};

export default radium(QuestionComponent);
