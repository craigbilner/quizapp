'use strict';

import React from 'react';

export default class SummaryTeamComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
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
    );
  }
}

SummaryTeamComponent.propTypes = {};

SummaryTeamComponent.defaultProps = {};

