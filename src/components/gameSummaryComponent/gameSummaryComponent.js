'use strict';

import React from 'react';
import TeamNameComponent from '../teamNameComponent/teamNameComponent';
import SummaryTeamComponent from '../summaryTeamComponent/summaryTeamComponent';

export default class GameSummaryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
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
    );
  }
}

GameSummaryComponent.propTypes = {};

GameSummaryComponent.defaultProps = {};

