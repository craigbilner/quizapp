'use strict';

import alt from '../../altWrapper';

class GameActions {
  constructor() {
    this.generateActions('playerAnswered', 'updateTime');
  }
}

export default alt.createActions(GameActions);
