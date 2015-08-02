'use strict';

import React from 'react';

export default class TeamNameComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getFullHouse() {
    return this.props.hasFullHouse ? '*' : null;
  }

  render() {
    return (
      <span>
        {this.props.teamName}
        {this.getFullHouse()}
      </span>
    );
  }
}

TeamNameComponent.propTypes = {
  teamName: React.PropTypes.string.isRequired,
  hasFullHouse: React.PropTypes.bool.isRequired
};

TeamNameComponent.defaultProps = {};

