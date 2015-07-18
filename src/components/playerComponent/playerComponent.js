'use strict';

import React from 'react';

export default class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="table_container-player"
        onClick={this.props.handleClick.bind(this, {
          playerId: this.props.player.get('playerId'),
          teamType: this.props.player.get('teamType'),
          seat: this.props.player.get('seat')
        })}>
        <div className="player_profile">{this.props.player.get('initials')}</div>
      </div>
    );
  }
}

PlayerComponent.propTypes = {
  handleClick: React.PropTypes.func,
  player: React.PropTypes.object.isRequired
};

PlayerComponent.defaultProps = {};

