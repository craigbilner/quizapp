'use strict';

import React from 'react';

export default class QuestioneeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.questioneeName !== nextProps.questioneeName;
  }

  render() {
    return (
      <span>{this.props.questioneeName}</span>
    );
  }
}

QuestioneeComponent.propTypes = {
  questioneeName: React.PropTypes.string.isRequired
};

QuestioneeComponent.defaultProps = {};

