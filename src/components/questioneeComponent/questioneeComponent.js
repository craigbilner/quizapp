'use strict';

import React from 'react';
import radium from'radium';
import style from '../questioneeComponent/questioneeStyle';

class QuestioneeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.questioneeName !== nextProps.questioneeName;
  }

  render() {
    const compStyle = [
      style,
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];

    return (
      <div style={compStyle}>
        <span>{this.props.questioneeName}</span>
      </div>
    );
  }
}

QuestioneeComponent.propTypes = {
  questioneeName: React.PropTypes.string.isRequired,
  baseStyles: React.PropTypes.object.isRequired
};

QuestioneeComponent.defaultProps = {};

export default radium(QuestioneeComponent);
