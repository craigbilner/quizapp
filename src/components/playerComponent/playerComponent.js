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

  getPlayerHaloStyle() {
    let playerHaloStyle = [
      style.halo,
      {
        backgroundColor: this.props.baseStyles.colours.dark.primary
      },
      this.props.baseStyles.layout.columns
    ];

    if (this.canAnswer()) {
      playerHaloStyle.push({
        animation: `${this.props.baseStyles.animations.flash} 0.5s infinite alternate ease-in-out`
      });
    }

    return playerHaloStyle;
  }

  render() {
    const compStyle = [
      {
        position: 'relative'
      }
    ];
    const playerInnerStyle = [
      style.inner,
      {
        backgroundColor: this.props.baseStyles.colours.light.primary
      },
      this.props.baseStyles.layout.flex(1),
      this.props.baseStyles.layout.columns
    ];
    const playerTextStyle = [
      style.text,
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];

    return (
      <div style={compStyle}>
        <div style={this.getPlayerHaloStyle()}
             onClick={this.props.handleClick.bind(this, {
          playerId: this.props.player.get('playerId'),
          teamType: this.props.player.get('teamType'),
          seat: this.props.player.get('seat')
        })}>
        </div>
        <div style={playerInnerStyle}>
          <div style={playerTextStyle}>
            {this.props.player.get('initials')}
          </div>
        </div>
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
