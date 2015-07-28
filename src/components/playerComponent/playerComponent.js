'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../playerComponent/playerStyle';

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  canAnswer() {
    return this.props.player.get('playerId') === this.props.questioneeId
      || (
        !this.props.questioneeId
        && (this.props.player.get('teamType') === this.props.answereeTeamType)
      );
  }

  getPlayerStyle() {
    let playerStyle = [
      style.player,
      {
        backgroundColor: this.props.baseStyles.colours.dark.tertiary,
        color: this.props.baseStyles.colours.light.primary
      }
    ];

    if (this.canAnswer()) {
      playerStyle.push({
        animation: `${this.props.baseStyles.animations.flash} 0.5s infinite alternate ease-in-out`
      });
    }

    return playerStyle;
  }

  render() {
    return (
      <div
        style={style.container}
        onClick={this.props.handleClick.bind(this, {
          playerId: this.props.player.get('playerId'),
          teamType: this.props.player.get('teamType'),
          seat: this.props.player.get('seat')
        })}>
        <div style={this.getPlayerStyle()}>{this.props.player.get('initials')}</div>
      </div>
    );
  }
}

PlayerComponent.propTypes = {
  handleClick: React.PropTypes.func,
  player: React.PropTypes.object.isRequired,
  baseStyles: React.PropTypes.object.isRequired,
  questioneeId: React.PropTypes.number.isRequired,
  answereeTeamType: React.PropTypes.number.isRequired
};

PlayerComponent.defaultProps = {};

export default Radium(PlayerComponent);
