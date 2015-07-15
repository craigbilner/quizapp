'use strict';

import React from 'react';

export default class QuestionIndxComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.currentIndx !== nextProps.currentIndx;
  }

  render() {
    return (
      <span>{this.props.currentIndx}</span>
    );
  }
}

QuestionIndxComponent.propTypes = {
  currentIndx: React.PropTypes.string.isRequired
};

QuestionIndxComponent.defaultProps = {};

