'use strict';

import alt from '../../altWrapper';

class GameActions {
  constructor() {
    this.generateActions('updateQuestionee', 'playerAnswered', 'updateTime');
  }
}

export default alt.createActions(GameActions);
