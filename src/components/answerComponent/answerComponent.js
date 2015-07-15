'use strict';

import React from 'react';

export default class AnswerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <span>{this.props.answerText}</span>
    );
  }
}

AnswerComponent.propTypes = {
  answerText: React.PropTypes.string.isRequired
};

AnswerComponent.defaultProps = {};

