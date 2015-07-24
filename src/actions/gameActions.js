'use strict';

import alt from '../../altWrapper';

class GameActions {
  constructor() {
    const actions = [
      'playerAnswered',
      'updateTime',
      'toggleTime',
      'forceOver',
      'endQuestion',
      'nextQuestion'
    ];

    this.generateActions(...actions);
  }
}

export default alt.createActions(GameActions);
