'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class TableTeamComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(playerId) {
    gameActions.playerAnswered(playerId);
  }

  render() {
    return (
      <div className="table_container-home_team table-container-team webflex-column">
        {
          this.props.players
            .sort((prev, next) => {
              return prev.get('seat') < next.get('seat');
            })
            .map(player => {
              return (
                <div
                  key={player.get('playerId')}
                  className="table_container-player"
                  onClick={this.handleClick.bind(this, player.get('playerId'))}>
                  <div className="player_profile">{player.get('initials')}</div>
                </div>
              );
            })
        }
      </div>
    );
  }
}

TableTeamComponent.propTypes = {
  players: React.PropTypes.object.isRequired
};

TableTeamComponent.defaultProps = {};

