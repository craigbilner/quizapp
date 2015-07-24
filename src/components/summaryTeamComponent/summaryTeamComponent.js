'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../summaryTeamComponent/summaryTeamStyle';

class SummaryTeamComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const compStyle = [
      this.props.baseStyles.layout.columns,
      this.props.baseStyles.layout.flex(10)
    ];
    const playerContainerStyle = [
      this.props.baseStyles.layout.rows,
      this.props.baseStyles.layout.flex(1),
      style.playerContainer
    ];
    const scoreStyle = [
      this.props.baseStyles.layout.flex(1),
      style.score
    ];

    return (
      <div style={compStyle}>
        {
          this.props.players.map(player => {
            return (
              <div key={player.get('playerId')}
                   style={playerContainerStyle}>
                <div style={this.props.baseStyles.layout.flex(1)}>
                  {player.get('name')}
                </div>
                <div style={scoreStyle}>
                  <span>{player.get('total')}</span>
                  <span> ({player.get('ownqs')})</span>
                </div>
              </div>
            );
          })
        }
        <div style={style.totals}>
          <div style={style.totalsNumber}>{this.props.teamTotal}</div>
        </div>
      </div>
    );
  }
}

SummaryTeamComponent.propTypes = {
  players: React.PropTypes.object.isRequired,
  teamTotal: React.PropTypes.number.isRequired,
  baseStyles: React.PropTypes.object
};

SummaryTeamComponent.defaultProps = {};

export default Radium(SummaryTeamComponent);


