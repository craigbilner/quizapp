'use strict';

import alt from '../../altWrapper';

class GameActions {
  constructor() {
    this.generateActions('updateQuestionee');
  }
}

export default alt.createActions(GameActions);
