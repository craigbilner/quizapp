'use strict';

import React from 'react';

export default class QuestionIndxComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.questionIndx !== nextProps.questionIndx;
  }

  render() {
    return (
      <span>{this.props.questionIndx}</span>
    );
  }
}

QuestionIndxComponent.propTypes = {
  questionIndx: React.PropTypes.string.isRequired
};

QuestionIndxComponent.defaultProps = {};

