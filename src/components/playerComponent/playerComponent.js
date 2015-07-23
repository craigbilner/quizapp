'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../playerComponent/playerStyle';

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
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
        <div style={style.player}>{this.props.player.get('initials')}</div>
      </div>
    );
  }
}

PlayerComponent.propTypes = {
  handleClick: React.PropTypes.func,
  player: React.PropTypes.object.isRequired
};

PlayerComponent.defaultProps = {};

export default Radium(PlayerComponent);
