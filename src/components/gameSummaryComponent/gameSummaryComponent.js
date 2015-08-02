'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../gameSummaryComponent/gameSummaryStyle';
import TeamNameComponent from '../teamNameComponent/teamNameComponent';
import SummaryTeamComponent from '../summaryTeamComponent/summaryTeamComponent';

class GameSummaryComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const summaryStyle = [
      this.props.baseStyles.layout.rows,
      style.summary
    ];
    const teamColumnStyle = [
      this.props.baseStyles.layout.columns,
      this.props.baseStyles.layout.flex(1)
    ];
    const titleStyle = [
      this.props.baseStyles.layout.rows,
      this.props.baseStyles.layout.flex(1),
      style.title,
      {
        backgroundColor: this.props.baseStyles.colours.dark.tertiary,
        color: this.props.baseStyles.colours.light.primary
      }
    ];
    const teamNameContainerStyle = [
      this.props.baseStyles.layout.flex(1),
      style.teamNameContainer
    ];
    const handicapStyle = [
      this.props.baseStyles.layout.flex(1),
      style.handicap
    ];

    return (
      <div style={summaryStyle}>
        <div style={teamColumnStyle}>
          <div style={titleStyle}>
            <div style={teamNameContainerStyle}>
              <TeamNameComponent
                teamName={this.props.homeName}
                hasFullHouse={this.props.hHasFullHouse}
                />
            </div>
            <div style={handicapStyle}>
              ({this.props.homeHandicap})
            </div>
          </div>
          <SummaryTeamComponent
            players={this.props.homeTeam}
            teamTotal={this.props.homeTeamTotal}
            baseStyles={this.props.baseStyles}
            />
        </div>
        <div style={teamColumnStyle}>
          <div style={titleStyle}>
            <div style={teamNameContainerStyle}>
              <TeamNameComponent
                teamName={this.props.awayName}
                hasFullHouse={this.props.aHasFullHouse}
                />
            </div>
            <div style={handicapStyle}>
              ({this.props.awayHandicap})
            </div>
          </div>
          <SummaryTeamComponent
            players={this.props.awayTeam}
            teamTotal={this.props.awayTeamTotal}
            baseStyles={this.props.baseStyles}
            />
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
  hHasFullHouse: React.PropTypes.bool.isRequired,
  awayName: React.PropTypes.string.isRequired,
  awayTeam: React.PropTypes.object.isRequired,
  awayHandicap: React.PropTypes.number,
  awayTeamTotal: React.PropTypes.number.isRequired,
  aHasFullHouse: React.PropTypes.bool.isRequired,
  baseStyles: React.PropTypes.object
};

GameSummaryComponent.defaultProps = {};

export default Radium(GameSummaryComponent);
