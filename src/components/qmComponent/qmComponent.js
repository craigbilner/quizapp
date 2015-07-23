'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../qmComponent/qmStyle';

class QMComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={style}>
        {this.props.player.get('initials')}
      </div>
    );
  }
}

QMComponent.propTypes = {
  player: React.PropTypes.object.isRequired
};

QMComponent.defaultProps = {};

export default Radium(QMComponent);
