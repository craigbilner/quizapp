'use strict';

import React from 'react';

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
              Andrew Fanko
            </div>
            <div className="questin_answer-meta">Round 3</div>
            <div className="question_answer-question webflex-row">
              <div className="question_answer-question-indx question_answer-question-left questin_answer-meta">
                1B
              </div>
              <div className="question_answer-question-text question_answer-question-right">
                Juventus were the comfortable winners of this season’s Serie A, finishing
                17 points ahead of which team, currently featuring the players Daniele de
                Rossi and Gervinho?
              </div>
            </div>
            <div className="question_answer-answer webflex-row">
              <div className="question_answer-answer-desc question_answer-question-left questin_answer-meta">
                Answer
              </div>
              <div className="question_answer-answer-text question_answer-question-right">
                Roma
              </div>
            </div>
          </div>
          <div className="game_timer webflex-column">
            <div className="game_timer-title">
              Time remaining
            </div>
            <div className="game_timer-time">
              8
            </div>
            <div className="game_timer-message">
              TEAM
            </div>
            <div className="game_timer-button webflex-row">
              <div className="game_timer-control webflex-row">
                PAUSE
              </div>
            </div>
          </div>
        </div>
        <div className="game_bottom webflex-row">
          <div className="table_container">
            <div className="table_container-top webflex-row">
              <div className="table_container-home_team table-container-team webflex-column">
                <div className="table_container-home_team-p1 table_container-player">
                  <div className="player_profile">IH</div>
                </div>
                <div className="table_container-home_team-p2 table_container-player">
                  <div className="player_profile">KE</div>
                </div>
                <div className="table_container-home_team-p3 table_container-player">
                  <div className="player_profile">FT</div>
                </div>
                <div className="table_container-home_team-p4 table_container-player">
                  <div className="player_profile">AF</div>
                </div>
              </div>
              <div className="table_container-table_main">

              </div>
              <div className="table_container-away_team table-container-team webflex-column">
                <div className="table_container-away_team-p1 table_container-player">
                  <div className="player_profile">CJ</div>
                </div>
                <div className="table_container-away_team-p2 table_container-player">
                  <div className="player_profile">AM</div>
                </div>
                <div className="table_container-away_team-p3 table_container-player">
                  <div className="player_profile">OL</div>
                </div>
                <div className="table_container-away_team-p4 table_container-player">
                  <div className="player_profile">PA</div>
                </div>
              </div>
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
                <div className="player_profile player_profile_qm">MC</div>
              </div>
              <div className="table-container-team">

              </div>
            </div>
          </div>
          <div className="game_summary webflex-row">
            <div className="game_summary-home game_summary-team webflex-column">
              <div className="game_summary-home-title game_summary-title webflex-row">
                Fast and Loose
              </div>
              <div className="game_summary-home-players game_summary-players webflex-column">
                <div className="game_summary-home_p1_container game_summary-player_container webflex-row">
                  <div className="game_summary-home_p1 game_summary-player">
                    AF
                  </div>
                  <div className="game_summary-home_p1-score game_summary-score">
                    <span className="game_summary-home_p1-score-total">5</span>
                    <span className="game_summary-home_p1-score-own">(2)</span>
                  </div>
                </div>
                <div className="game_summary-home_p2_container game_summary-player_container webflex-row">
                  <div className="game_summary-home_p2 game_summary-player">
                    FT
                  </div>
                  <div className="game_summary-home_p2-score game_summary-score">
                    <span className="game_summary-home_p2-score-total">15</span>
                    <span className="game_summary-home_p2-score-own">(3)</span>
                  </div>
                </div>
                <div className="game_summary-home_p3_container game_summary-player_container webflex-row">
                  <div className="game_summary-home_p3 game_summary-player">
                    KE
                  </div>
                  <div className="game_summary-home_p3-score game_summary-score">
                    <span className="game_summary-home_p3-score-total">8</span>
                    <span className="game_summary-home_p3-score-own">(2)</span>
                  </div>
                </div>
                <div className="game_summary-home_p4_container game_summary-player_container webflex-row">
                  <div className="game_summary-home_p4 game_summary-player">
                    IH
                  </div>
                  <div className="game_summary-home_p4-score game_summary-score">
                    <span className="game_summary-home_p4-score-total">7</span>
                    <span className="game_summary-home_p4-score-own">(1)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="game_summary-away game_summary-team webflex-column">
              <div className="game_summary-away-title game_summary-title webflex-row">
                Blenheim Black
              </div>
              <div className="game_summary-away-players game_summary-players webflex-column">
                <div className="game_summary-away_p1_container game_summary-player_container webflex-row">
                  <div className="game_summary-away_p1 game_summary-player">
                    PA
                  </div>
                  <div className="game_summary-away_p1-score game_summary-score">
                    <span className="game_summary-away_p1-score-total">12</span>
                    <span className="game_summary-away_p1-score-own">(4)</span>
                  </div>
                </div>
                <div className="game_summary-away_p2_container game_summary-player_container webflex-row">
                  <div className="game_summary-away_p2 game_summary-player">
                    OL
                  </div>
                  <div className="game_summary-away_p2-score game_summary-score">
                    <span className="game_summary-away_p2-score-total">8</span>
                    <span className="game_summary-away_p2-score-own">(4)</span>
                  </div>
                </div>
                <div className="game_summary-away_p3_container game_summary-player_container webflex-row">
                  <div className="game_summary-away_p3 game_summary-player">
                    AM
                  </div>
                  <div className="game_summary-away_p3-score game_summary-score">
                    <span className="game_summary-away_p3-score-total">9</span>
                    <span className="game_summary-away_p3-score-own">(1)</span>
                  </div>
                </div>
                <div className="game_summary-away_p4_container game_summary-player_container webflex-row">
                  <div className="game_summary-away_p4 game_summary-player">
                    CJ
                  </div>
                  <div className="game_summary-away_p4-score game_summary-score">
                    <span className="game_summary-away_p4-score-total">16</span>
                    <span className="game_summary-away_p4-score-own">(5)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameComponent.propTypes = {};

GameComponent.defaultProps = {};

