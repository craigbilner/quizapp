'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../playerComponent/playerStyle';
import {status} from '../../enums/gameEnums';

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

  getOwnQCount(gameHalf) {
    let count = 0;
    const ownqs = this.props.player.get('ownqs');

    if (ownqs && ownqs === this.props.player.get('questioneeCount')) {
      if (this.props.round > 0 && this.props.round < 5) {
        count = gameHalf === 1 ? ownqs : 0;
      } else {
        count = gameHalf === 1 ? 4 : ownqs - 4;
      }
    }

    return count;
  }

  getOwnQs(gameHalf) {
    const count = this.getOwnQCount(gameHalf);

    return '*'.repeat(count);
  }

  getTeamOwnQ() {
    return this.props.teamOwnQs && this.props.teamOwnQs >= this.props.player.get('seat')
      ? '*'
      : null;
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

  getPlayerInnerStyle() {
    const bgColour = this.props.gameStatus > status.WITH_OTEAM
    && this.props.gameStatus < status.GAME_OVER
      ? style.endColour
      : this.props.baseStyles.colours.light.primary;

    const playerInnerStyle = [
      style.inner,
      {
        backgroundColor: bgColour
      },
      this.props.baseStyles.layout.flex(1),
      this.props.baseStyles.layout.columns
    ];

    return playerInnerStyle;
  }

  getOwnQBulletStyle(gameHalf) {
    const ownqBulletStyle = {
      position: 'absolute',
      left: '50%',
      marginLeft: -16,
      fontSize: 15,
      top: gameHalf === 1 ? 10 : -10,
      color: this.props.baseStyles.colours.dark.primary
    };

    if (this.props.player.get('ownqs') === 8) {
      ownqBulletStyle.color = style.fhColour;
      ownqBulletStyle.animation = `
      ${this.props.baseStyles.animations.flash}
      0.5s infinite alternate ease-in-out
      `;
    }

    return ownqBulletStyle;
  }

  getTeamOwnQStyle() {
    return [
      style.teamOwnQ,
      {
        color: this.props.teamOwnQs === 4
          ? style.fhColour
          : this.props.baseStyles.colours.dark.primary
      }
    ];
  }

  render() {
    const compStyle = [
      {
        position: 'relative'
      }
    ];
    const playerTextStyle = [
      this.props.baseStyles.layout.flex(1),
      style.text,
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];
    const ownQStyle = [
      this.props.baseStyles.layout.flex(1),
      {
        position: 'relative',
        height: 18
      }
    ];

    return (
      <div style={compStyle}
           onClick={this.props.handleClick.bind(this, {
          playerId: this.props.player.get('playerId'),
          teamType: this.props.player.get('teamType'),
          seat: this.props.player.get('seat')
        })}>
        <div style={this.getPlayerHaloStyle()}>
        </div>
        <div style={this.getPlayerInnerStyle()}>
          <div style={ownQStyle}>
            <span style={this.getOwnQBulletStyle(1)}>{this.getOwnQs(1)}</span>
          </div>
          <div style={playerTextStyle}>
            {this.props.player.get('initials')}
          </div>
          <div style={ownQStyle}>
            <span style={this.getOwnQBulletStyle(2)}>{this.getOwnQs(2)}</span>
          </div>
        </div>
        <div style={this.getTeamOwnQStyle()}>{this.getTeamOwnQ()}</div>
      </div>
    );
  }
}

PlayerComponent.propTypes = {
  handleClick: React.PropTypes.func,
  player: React.PropTypes.object.isRequired,
  baseStyles: React.PropTypes.object.isRequired,
  questioneeId: React.PropTypes.number,
  answereeTeamType: React.PropTypes.number,
  gameStatus: React.PropTypes.number.isRequired,
  round: React.PropTypes.number.isRequired,
  teamOwnQs: React.PropTypes.number.isRequired
};

PlayerComponent.defaultProps = {};

export default Radium(PlayerComponent);
