'use strict';

import React from 'react';

export default class SummaryTeamComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="game_summary-home-players game_summary-players webflex-column">
        {
          this.props.players.map(player => {
            return (
              <div key={player.get('playerId')}
                   className="game_summary-player_container webflex-row">
                <div className="game_summary-player">
                  {player.get('name')}
                </div>
                <div className="game_summary-score">
                  <span>{player.get('total')}</span>
                  <span> ({player.get('twos')})</span>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

SummaryTeamComponent.propTypes = {
  players: React.PropTypes.object.isRequired
};

SummaryTeamComponent.defaultProps = {};

