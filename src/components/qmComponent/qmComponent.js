'use strict';

import React from 'react';

export default class QMComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player_profile player_profile_qm">{this.props.player.get('initials')}</div>
    );
  }
}

QMComponent.propTypes = {
  player: React.PropTypes.object.isRequired
};

QMComponent.defaultProps = {};

