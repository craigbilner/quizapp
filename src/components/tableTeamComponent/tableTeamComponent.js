'use strict';

import React from 'react';
import radium from 'radium';
import PlayerSmartComponent from '../playerComponent/playerSmartComponent';
import PlayerComponent from '../playerComponent/playerComponent';

class TableTeamComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const compStyle = [
      this.props.baseStyles.layout.columns,
      this.props.baseStyles.layout.flex(1)
    ];

    return (
      <div style={compStyle}>
        {
          this.props.players
            .sort((prev, next) => {
              return prev.get('seat') < next.get('seat');
            })
            .map(player => {
              return (
                <PlayerSmartComponent
                  key={player.get('playerId')}
                  baseStyles={this.props.baseStyles}
                  >
                  <PlayerComponent
                    player={player}
                    baseStyles={this.props.baseStyles}
                    questioneeId={this.props.questioneeId}
                    answereeTeamType={this.props.answereeTeamType}
                    gameStatus={this.props.gameStatus}
                    round={this.props.round}
                    teamOwnQs={this.props.teamOwnQs}
                    />
                </PlayerSmartComponent>
              );
            })
        }
      </div>
    );
  }
}

TableTeamComponent.propTypes = {
  players: React.PropTypes.object.isRequired,
  baseStyles: React.PropTypes.object,
  questioneeId: React.PropTypes.number,
  answereeTeamType: React.PropTypes.number,
  gameStatus: React.PropTypes.number.isRequired,
  round: React.PropTypes.number.isRequired,
  teamOwnQs: React.PropTypes.number.isRequired
};

TableTeamComponent.defaultProps = {};

export default radium(TableTeamComponent);
