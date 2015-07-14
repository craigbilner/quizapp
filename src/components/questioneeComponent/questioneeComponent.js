'use strict';

import React from 'react';

export default class QuestioneeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.questionee !== nextProps.questionee;
  }

  render() {
    return (
      <span>{this.props.questionee}</span>
    );
  }
}

QuestioneeComponent.propTypes = {
  questionee: React.PropTypes.string.isRequired
};

QuestioneeComponent.defaultProps = {};

