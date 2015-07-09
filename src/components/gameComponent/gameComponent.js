'use strict';

import React from 'react';
import QuestionAnswerComponent from '../questionAnswerComponent/questionAnswerComponent';
import GameTimingComponent from '../gameTimingComponent/gameTimingComponent';
import GameTableComponent from '../gameTableComponent/gameTableComponent';
import GameSummaryComponent from '../gameSummaryComponent/gameSummaryComponent';

export default class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="game">
        <div className="game_top webflex-row">
          <div className="question_answer">
            <QuestionAnswerComponent />
          </div>
          <div className="game_timer">
            <GameTimingComponent />
          </div>
        </div>
        <div className="game_bottom webflex-row">
          <div className="table_container">
            <GameTableComponent />
          </div>
          <div className="game_summary_container">
            <GameSummaryComponent />
          </div>
        </div>
      </div>
    );
  }
}

GameComponent.propTypes = {};

GameComponent.defaultProps = {};

