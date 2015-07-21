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
            <TeamNameComponent teamName={this.props.homeName}/>
            ({this.props.homeHandicap})
          </div>
          <SummaryTeamComponent players={this.props.homeTeam} teamTotal={this.props.homeTeamTotal}/>
        </div>
        <div className="game_summary-away game_summary-team webflex-column">
          <div className="game_summary-away-title game_summary-title webflex-row">
            <TeamNameComponent teamName={this.props.awayName}/>
            ({this.props.awayHandicap})
          </div>
          <SummaryTeamComponent players={this.props.awayTeam} teamTotal={this.props.awayTeamTotal}/>
        </div>
      </div>
    );
  }
}

GameSummaryComponent.propTypes = {
  homeName: React.PropTypes.string.isRequired,
  homeTeam: React.PropTypes.object.isRequired,
  homeHandicap: React.PropTypes.number,
  homeTeamTotal: React.PropTypes.number.isRequired,
  awayName: React.PropTypes.string.isRequired,
  awayTeam: React.PropTypes.object.isRequired,
  awayHandicap: React.PropTypes.number,
  awayTeamTotal: React.PropTypes.number.isRequired
};

GameSummaryComponent.defaultProps = {};

