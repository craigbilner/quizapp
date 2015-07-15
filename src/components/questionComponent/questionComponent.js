'use strict';

import React from 'react';

export default class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>{this.props.questionText}</span>
    );
  }
}

QuestionComponent.propTypes = {
  questionText: React.PropTypes.string.isRequired
};

QuestionComponent.defaultProps = {};
