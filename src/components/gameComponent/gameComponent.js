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
              answerDesc={gd.getIn(['i18n', 'answerDesc'])}
              answerText={gd.get('currentAnswer')}
              />
          </div>
          <div className="game_timer">
            <GameTimingComponent
              gameTime={gd.get('gameTime')}
              isPaused={gd.get('isPaused')}
              resetGameTime={gd.get('resetGameTime')}
              timeInterval={gd.get('timeInterval')}
              timerText={gd.get('timerText')}
              timerMessage={gd.get('timerMessage')}
              baseStyles={this.props.baseStyles}
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
              homeHandicap={gd.getIn(['teams', 'homeHandicap'])}
              homeTeamTotal={gd.get('homeTeamTotal')}
              awayName={gd.getIn(['teams', 'awayName'])}
              awayTeam={gd.get('awayTeam')}
              awayHandicap={gd.getIn(['teams', 'awayHandicap'])}
              awayTeamTotal={gd.get('awayTeamTotal')}
              />
          </div>
        </div>
      </div>
    );
  }
}

GameComponent.propTypes = {
  gameData: React.PropTypes.object.isRequired,
  baseStyles: React.PropTypes.object
};

GameComponent.defaultProps = {};

