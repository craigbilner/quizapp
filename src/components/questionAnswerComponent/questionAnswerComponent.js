'use strict';

import React from 'react';
import Radium from 'Radium';
import QuestioneeComponent from '../questioneeComponent/questioneeComponent';
import QuestionComponent from '../questionComponent/questionComponent';
import RoundComponent from '../roundComponent/roundComponent';
import QuestionIndxComponent from '../questionIndxComponent/questionIndxComponent';
import AnswerComponent from '../answerComponent/answerComponent';
import style from '../questionAnswerComponent/questionAnswerStyle';

class QuestionAnswerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const answerStyle = [
      this.props.baseStyles.layout.rows,
      style.answer
    ];
    const answerDescStyle = [
      this.props.baseStyles.layout.flex(1),
      style.answerDesc,
      {
        color: this.props.baseStyles.colours.dark.tertiary
      }
    ];
    let returnValue = '<div></div>';

    if (this.props.questionIndx !== '00') {
      returnValue = (
        <div>
          <QuestioneeComponent
            questioneeName={this.props.questioneeName}
            baseStyles={this.props.baseStyles}
            />
          <RoundComponent
            roundName={this.props.roundName}
            baseStyles={this.props.baseStyles}
            />

          <div style={this.props.baseStyles.layout.rows}>
            <QuestionIndxComponent
              questionIndx={this.props.questionIndx}
              baseStyles={this.props.baseStyles}
              />
            <QuestionComponent
              questionText={this.props.questionText}
              baseStyles={this.props.baseStyles}
              />
          </div>
          <div style={answerStyle}>
            <div style={answerDescStyle}>
              {this.props.answerDesc}
            </div>
            <AnswerComponent
              answerText={this.props.answerText}
              baseStyles={this.props.baseStyles}
              />
          </div>
        </div>
      );
    } else {
      returnValue = (
        <div>Game Over!</div>
      );
    }

    return returnValue;
  }
}

QuestionAnswerComponent.propTypes = {
  questioneeName: React.PropTypes.string.isRequired,
  roundName: React.PropTypes.string.isRequired,
  questionIndx: React.PropTypes.string.isRequired,
  questionText: React.PropTypes.string.isRequired,
  answerText: React.PropTypes.string.isRequired,
  answerDesc: React.PropTypes.string.isRequired
};

QuestionAnswerComponent.defaultProps = {};

export default Radium(QuestionAnswerComponent);
