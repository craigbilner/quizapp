'use strict';

import React from 'react';

export default class TableTeamComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="table_container-home_team table-container-team webflex-column">
        <div className="table_container-home_team-p1 table_container-player">
          <div className="player_profile">IH</div>
        </div>
        <div className="table_container-home_team-p2 table_container-player">
          <div className="player_profile">KE</div>
        </div>
        <div className="table_container-home_team-p3 table_container-player">
          <div className="player_profile">FT</div>
        </div>
        <div className="table_container-home_team-p4 table_container-player">
          <div className="player_profile">AF</div>
        </div>
      </div>
    );
  }
}

TableTeamComponent.propTypes = {};

TableTeamComponent.defaultProps = {};

