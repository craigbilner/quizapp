'use strict';

import React from 'react';
import radium from 'radium';
import style from '../questionIndxComponent/questionIndxStyle';

class QuestionIndxComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.questionIndx !== nextProps.questionIndx;
  }

  render() {
    const compStyle = [
      this.props.baseStyles.layout.flex(1),
      style,
      {
        color: this.props.baseStyles.colours.dark.tertiary
      }
    ];

    return (
      <div style={compStyle}>
        <span>{this.props.questionIndx}</span>
      </div>
    );
  }
}

QuestionIndxComponent.propTypes = {
  questionIndx: React.PropTypes.string.isRequired,
  baseStyles: React.PropTypes.object
};

QuestionIndxComponent.defaultProps = {};

export default radium(QuestionIndxComponent);
