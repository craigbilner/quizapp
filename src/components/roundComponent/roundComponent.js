'use strict';

import React from 'react';

export default class RoundComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.roundName !== nextProps.roundName;
  }

  render() {
    return (
      <span>{this.props.roundName}</span>
    );
  }
}

RoundComponent.propTypes = {};

RoundComponent.defaultProps = {};

