'use strict';

import React from 'react';
import AnswererComponent from '../answererComponent/answererComponent';
import QuestionComponent from '../questionComponent/questionComponent';
import RoundComponent from '../roundComponent/roundComponent';
import QuestionIndxComponent from '../questionIndxComponent/questionIndxComponent';
import AnswerComponent from '../answerComponent/answerComponent';
import GameTimerComponent from '../gameTimerComponent/gameTimerComponent';
import GameTimerMessageComponent from '../gameTimerMessage/gameTimerMessage';
import GameTimerControlComponent from '../gameTimerControlComponent/gameTimerControlComponent';
import TableTeamComponent from '../tableTeamComponent/tableTeamComponent';
import QMComponent from '../qmComponent/qmComponent';
import TeamNameComponent from '../teamNameComponent/teamNameComponent';
import SummaryTeamComponent from '../summaryTeamComponent/summaryTeamComponent';

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
          <div className="game_timer webflex-column">
            <div className="game_timer-title">
              Time remaining
            </div>
            <div className="game_timer-time">
              <GameTimerComponent />
            </div>
            <div className="game_timer-message">
              <GameTimerMessageComponent />
            </div>
            <div className="game_timer-button webflex-row">
              <GameTimerControlComponent />
            </div>
          </div>
        </div>
        <div className="game_bottom webflex-row">
          <div className="table_container">
            <div className="table_container-top webflex-row">
              <TableTeamComponent />

              <div className="table_container-table_main">

              </div>
              <TableTeamComponent />
            </div>
            <div className="table_container-bottom webflex-row">
              <div className="table-container-team">

              </div>
              <div className="table-container-table_head">

              </div>
              <div className="table-container-team">

              </div>
            </div>
            <div className="table_container-bottom webflex-row">
              <div className="table-container-team">

              </div>
              <div className="table-container-qm">
                <QMComponent />
              </div>
              <div className="table-container-team">

              </div>
            </div>
          </div>
          <div className="game_summary webflex-row">
            <div className="game_summary-home game_summary-team webflex-column">
              <div className="game_summary-home-title game_summary-title webflex-row">
                <TeamNameComponent />
              </div>
              <SummaryTeamComponent />
            </div>
            <div className="game_summary-away game_summary-team webflex-column">
              <div className="game_summary-away-title game_summary-title webflex-row">
                <TeamNameComponent />
              </div>
              <SummaryTeamComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameComponent.propTypes = {};

GameComponent.defaultProps = {};

