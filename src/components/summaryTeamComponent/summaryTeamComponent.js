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
    const playerStyle = [
      this.props.baseStyles.layout.flex(1),
      style.player,
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];
    const scoreStyle = [
      this.props.baseStyles.layout.flex(1),
      style.score,
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];
    const totalStyle = [
      style.total,
      {
        borderTop: `1px solid ${this.props.baseStyles.colours.dark.tertiary}`,
        color: this.props.baseStyles.colours.dark.primary
      }
    ];

    return (
      <div style={compStyle}>
        {
          this.props.players.map(player => {
            return (
              <div key={player.get('playerId')}
                   style={playerContainerStyle}>
                <div style={playerStyle}>
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
        <div style={totalStyle}>
          <div style={style.totalNumber}>{this.props.teamTotal}</div>
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


