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
          <QuestionAnswerComponent />
          <GameTimingComponent />
        </div>
        <div className="game_bottom webflex-row">
          <GameTableComponent />
          <GameSummaryComponent />
        </div>
      </div>
    );
  }
}

GameComponent.propTypes = {};

GameComponent.defaultProps = {};

