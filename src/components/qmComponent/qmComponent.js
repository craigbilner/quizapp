'use strict';

import React from 'react';

export default class QMComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="player_profile player_profile_qm">MC</div>
    );
  }
}

QMComponent.propTypes = {};

QMComponent.defaultProps = {};

