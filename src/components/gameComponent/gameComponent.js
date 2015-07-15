'use strict';

import React from 'react';
import QuestionAnswerComponent from '../questionAnswerComponent/questionAnswerComponent';
import GameTimingComponent from '../gameTimingComponent/gameTimingComponent';
import GameTableComponent from '../gameTableComponent/gameTableComponent';
import GameSummaryComponent from '../gameSummaryComponent/gameSummaryComponent';

export default class GameComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.gameData !== this.props.gameData;
  }

  render() {
    const gd = this.props.gameData;
    console.log(gd.toJS());

    return (
      <div className="game">
        <div className="game_top webflex-row">
          <div className="question_answer">
            <QuestionAnswerComponent
              questionee={gd.get('questionee')}
              roundName={gd.get('roundName')}
              questionIndx={gd.get('currentIndx')}
              questionText={gd.get('currentQuestion')}
              answerText={gd.get('currentAnswer')}
              />
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

GameComponent.propTypes = {
  gameData: React.PropTypes.object.isRequired
};

GameComponent.defaultProps = {};

