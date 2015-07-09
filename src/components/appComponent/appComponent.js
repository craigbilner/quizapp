'use strict';

import React from 'react';
import GameComponent from '../gameComponent/gameComponent.js';

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GameComponent />
      </div>
    );
  }
}
