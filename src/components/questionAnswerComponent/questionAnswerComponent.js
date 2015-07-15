'use strict';

import React from 'react';
import QuestioneeComponent from '../questioneeComponent/questioneeComponent';
import QuestionComponent from '../questionComponent/questionComponent';
import RoundComponent from '../roundComponent/roundComponent';
import QuestionIndxComponent from '../questionIndxComponent/questionIndxComponent';
import AnswerComponent from '../answerComponent/answerComponent';

export default class QuestionAnswerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tc1 = 'question_answer-question-indx question_answer-question-left question_answer-meta';
    const tc2 = 'question_answer-answer-desc question_answer-question-left question_answer-meta';

    return (
      <div>
        <div className="question_answer-player">
          <QuestioneeComponent questionee={this.props.questionee}/>
        </div>
        <div className="question_answer-meta">
          <RoundComponent roundName={this.props.roundName} />
        </div>
        <div className="question_answer-question webflex-row">
          <div className={tc1}>
            <QuestionIndxComponent currentIndx={this.props.currentIndx} />
          </div>
          <div className="question_answer-question-text question_answer-question-right">
            <QuestionComponent />
          </div>
        </div>
        <div className="question_answer-answer webflex-row">
          <div className={tc2}>
            Answer
          </div>
          <div className="question_answer-answer-text question_answer-question-right">
            <AnswerComponent />
          </div>
        </div>
      </div>
    );
  }
}

QuestionAnswerComponent.propTypes = {
  questionee: React.PropTypes.string.isRequired,
  roundName: React.PropTypes.string.isRequired,
  currentIndx: React.PropTypes.string.isRequired
};

QuestionAnswerComponent.defaultProps = {};

