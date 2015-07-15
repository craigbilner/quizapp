'use strict';

import React from 'react';

export default class TableTeamComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="table_container-home_team table-container-team webflex-column">
        {
          this.props.players.map(player => {
            return (
              <div key={player.get('playerId')} className="table_container-player">
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

