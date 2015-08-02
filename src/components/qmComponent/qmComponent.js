'use strict';

import React from 'react';
import radium from 'radium';
import style from '../qmComponent/qmStyle';

class QMComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const compStyle = [
      style,
      {
        backgroundColor: this.props.baseStyles.colours.dark.secondary,
        color: this.props.baseStyles.colours.light.secondary
      }
    ];

    return (
      <div style={compStyle}>
        {this.props.player.get('initials')}
      </div>
    );
  }
}

QMComponent.propTypes = {
  player: React.PropTypes.object.isRequired,
  baseStyles: React.PropTypes.object.isRequired
};

QMComponent.defaultProps = {};

export default radium(QMComponent);
