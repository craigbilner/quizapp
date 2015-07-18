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
    return (
      <div className="game">
        <div className="game_top webflex-row">
          <div className="question_answer">
            <QuestionAnswerComponent
              questioneeName={gd.get('questioneeName')}
              roundName={gd.get('roundName')}
              questionIndx={gd.get('currentIndx')}
              questionText={gd.get('currentQuestion')}
              answerText={gd.get('currentAnswer')}
              />
          </div>
          <div className="game_timer">
            <GameTimingComponent
              gameTime={gd.get('gameTime')}
              resetGameTime={gd.get('resetGameTime')}
              timeInterval={gd.get('timeInterval')}
              />
          </div>
        </div>
        <div className="game_bottom webflex-row">
          <div className="table_container">
            <GameTableComponent
              homeTeam={gd.get('homeTeam')}
              awayTeam={gd.get('awayTeam')}
              questionMaster={gd.get('questionMaster')}
              />
          </div>
          <div className="game_summary_container">
            <GameSummaryComponent
              homeName={gd.getIn(['teams', 'homeName'])}
              homeTeam={gd.get('homeTeam')}
              awayName={gd.getIn(['teams', 'awayName'])}
              awayTeam={gd.get('awayTeam')}
              />
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

