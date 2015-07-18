'use strict';

import React from 'react';
import gameActions from '../../actions/gameActions';

export default class PlayerSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(opts) {
    gameActions.playerAnswered(opts);
  }

  render() {
    return (
      <div>
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
  children: React.PropTypes.object
};

PlayerSmartComponent.defaultProps = {};

