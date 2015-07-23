'use strict';

import React from 'react';
import Radium from'Radium';
import style from '../questioneeComponent/questioneeStyle';

class QuestioneeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.questioneeName !== nextProps.questioneeName;
  }

  render() {
    return (
      <div style={style}>
        <span>{this.props.questioneeName}</span>
      </div>
    );
  }
}

QuestioneeComponent.propTypes = {
  questioneeName: React.PropTypes.string.isRequired
};

QuestioneeComponent.defaultProps = {};

export default Radium(QuestioneeComponent);
