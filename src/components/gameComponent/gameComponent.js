'use strict';

import React from 'react';
import Radium from 'Radium';
import QuestionAnswerComponent from '../questionAnswerComponent/questionAnswerComponent';
import GameTimingComponent from '../gameTimingComponent/gameTimingComponent';
import GameTableComponent from '../gameTableComponent/gameTableComponent';
import GameSummaryComponent from '../gameSummaryComponent/gameSummaryComponent';
import style from '../gameComponent/gameComponentStyle';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.gameData !== this.props.gameData;
  }

  render() {
    const gd = this.props.gameData;
    const topStyle = [
      this.props.baseStyles.layout.rows,
      style.top
    ];
    const questionAnswerStyle = [
      this.props.baseStyles.layout.flex(2),
      style.questionAnswer
    ];
    const timingStyle = [
      this.props.baseStyles.layout.flex(1),
      style.timing
    ];
    const bottomStyle = [
      this.props.baseStyles.layout.rows,
      style.bottom
    ];
    const bottomRegionStyle = [
      this.props.baseStyles.layout.flex(1),
      style.bottomRegion
    ];

    return (
      <div>
        <div style={topStyle}>
          <div style={questionAnswerStyle}>
            <QuestionAnswerComponent
              questioneeName={gd.get('questioneeName')}
              roundName={gd.get('roundName')}
              questionIndx={gd.get('currentIndx')}
              questionText={gd.get('currentQuestion')}
              answerDesc={gd.getIn(['i18n', 'answerDesc'])}
              answerText={gd.get('currentAnswer')}
              baseStyles={this.props.baseStyles}
              />
          </div>
          <div style={timingStyle}>
            <GameTimingComponent
              gameTime={gd.get('gameTime')}
              isPaused={gd.get('isPaused')}
              resetGameTime={gd.get('resetGameTime')}
              timeInterval={gd.get('timeInterval')}
              timingText={gd.get('timingText')}
              gameStatus={gd.get('gameStatus')}
              msgText={gd.get('msgText')}
              controlText={gd.get('controlText')}
              baseStyles={this.props.baseStyles}
              />
          </div>
        </div>
        <div style={bottomStyle}>
          <div style={bottomRegionStyle}>
            <GameTableComponent
              homeTeam={gd.get('homeTeam')}
              awayTeam={gd.get('awayTeam')}
              questionMaster={gd.get('questionMaster')}
              baseStyles={this.props.baseStyles}
              />
          </div>
          <div style={bottomRegionStyle}>
            <GameSummaryComponent
              homeName={gd.getIn(['teams', 'homeName'])}
              homeTeam={gd.get('homeTeam')}
              homeHandicap={gd.getIn(['teams', 'homeHandicap'])}
              homeTeamTotal={gd.get('homeTeamTotal')}
              awayName={gd.getIn(['teams', 'awayName'])}
              awayTeam={gd.get('awayTeam')}
              awayHandicap={gd.getIn(['teams', 'awayHandicap'])}
              awayTeamTotal={gd.get('awayTeamTotal')}
              baseStyles={this.props.baseStyles}
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

export default Radium(GameComponent);

