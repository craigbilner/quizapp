'use strict';

import React from 'react';
import AltContainer from 'alt/AltContainer';
import GameComponent from '../gameComponent/gameComponent';
import GameStore from '../../stores/gameStore';
import baseStyles from '../../styles/baseStyles';

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AltContainer store={GameStore}>
        <GameComponent gameData={{}} baseStyles={baseStyles} />
      </AltContainer>
    );
  }
}
