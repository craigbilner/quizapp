'use strict';

import React from 'react';
import radium from 'radium';

class RoundComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.roundName !== nextProps.roundName;
  }

  render() {
    const compStyle = [
      {
        color: this.props.baseStyles.colours.dark.tertiary
      }
    ];

    return (
      <div style={compStyle}>
        <span>{this.props.roundName}</span>
      </div>
    );
  }
}

RoundComponent.propTypes = {
  roundName: React.PropTypes.string.isRequired,
  baseStyles: React.PropTypes.object.isRequired
};

RoundComponent.defaultProps = {};

export default radium(RoundComponent);
