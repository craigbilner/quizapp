'use strict';

import React from 'react';
import radium from 'radium';
import gameActions from '../../actions/gameActions';

class PlayerSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(opts) {
    gameActions.playerAnswered(opts);
  }

  render() {
    const compStyle = [
      this.props.baseStyles.layout.flex(1),
      this.props.baseStyles.layout.rows,
      {
        justifyContent: 'center',
        padding: '5%'
      }
    ];
    return (
      <div style={compStyle}>
        {
          React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              handleClick: this.handleClick.bind(this)
            });
          })
        }
      </div>
    );
  }
}

PlayerSmartComponent.propTypes = {
  children: React.PropTypes.object,
  baseStyles: React.PropTypes.object.isRequired
};

PlayerSmartComponent.defaultProps = {};

export default radium(PlayerSmartComponent);
