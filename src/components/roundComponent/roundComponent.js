'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../roundComponent/roundStyle';

class RoundComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.roundName !== nextProps.roundName;
  }

  render() {
    return (
      <div style={style}>
        <span>{this.props.roundName}</span>
      </div>
    );
  }
}

RoundComponent.propTypes = {
  roundName: React.PropTypes.string.isRequired
};

RoundComponent.defaultProps = {};

export default Radium(RoundComponent);
