'use strict';

import React from 'react';

export default class TeamNameComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>{this.props.teamName}</span>
    );
  }
}

TeamNameComponent.propTypes = {
  teamName: React.PropTypes.string.isRequired
};

TeamNameComponent.defaultProps = {};

