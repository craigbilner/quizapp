'use strict';

import React from 'react';
import AnswererComponent from '../answererComponent/answererComponent';
import QuestionComponent from '../questionComponent/questionComponent';
import RoundComponent from '../roundComponent/roundComponent';
import QuestionIndxComponent from '../questionIndxComponent/questionIndxComponent';
import AnswerComponent from '../answerComponent/answerComponent';

export default class QuestionAnswerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="question_answer-player">
          <AnswererComponent />
        </div>
        <div className="question_answer-meta">
          <RoundComponent />
        </div>
        <div className="question_answer-question webflex-row">
          <div className="question_answer-question-indx question_answer-question-left question_answer-meta">
            <QuestionIndxComponent />
          </div>
          <div className="question_answer-question-text question_answer-question-right">
            <QuestionComponent />
          </div>
        </div>
        <div className="question_answer-answer webflex-row">
          <div className="question_answer-answer-desc question_answer-question-left question_answer-meta">
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

QuestionAnswerComponent.propTypes = {};

QuestionAnswerComponent.defaultProps = {};

