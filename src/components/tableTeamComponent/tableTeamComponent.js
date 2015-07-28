'use strict';

import React from 'react';
import PlayerSmartComponent from '../playerComponent/playerSmartComponent';
import PlayerComponent from '../playerComponent/playerComponent';

export default class TableTeamComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.baseStyles.layout.flex.columns}>
        {
          this.props.players
            .sort((prev, next) => {
              return prev.get('seat') < next.get('seat');
            })
            .map(player => {
              return (
                <PlayerSmartComponent key={player.get('playerId')}>
                  <PlayerComponent
                    player={player}
                    baseStyles={this.props.baseStyles}
                    questioneeId={this.props.questioneeId}
                    answereeTeamType={this.props.answereeTeamType}
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
  questioneeId: React.PropTypes.number.isRequired,
  answereeTeamType: React.PropTypes.number.isRequired
};

TableTeamComponent.defaultProps = {};

