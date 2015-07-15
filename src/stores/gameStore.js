'use strict';

import alt from '../../altWrapper';
import Immutable from 'immutable';
import gameActions from '../actions/gameActions';

class GameStore {
  constructor() {
    this.bindActions(gameActions);
    this.state = {
      gameData: Immutable.Map({})
    };
    this.on('bootstrap', () => {
      this.setQuestionee();
      this.setRound();
    });
  }

  getRound(questionSet) {
    const lastQuestion = questionSet.find(question => !question.get('hasFinished'));

    if (lastQuestion) {
      const [round] = lastQuestion.get('indx');
      return parseInt(round, 10);
    }
    else {
      return 1;
    }
  }

  setRound() {
    const roundName = `Round ${this.getRound(this.state.gameData.get('questionSet'))}`;
    this.setState({
      gameData: this.state.gameData.set('roundName', roundName)
    });
  }

  getQuestionee(players) {
    return players.find((player) => player.get('isQuestionee'));
  }

  setQuestionee() {
    const questionee = this.getQuestionee(this.state.gameData.getIn(['teams', 'players']));

    this.setState({
      gameData: this.state.gameData.set('questionee', questionee.get('name'))
    });
  }

  onUpdateQuestionee() {
    this.setState({
      gameData: this.state.gameData.set('questionee', 'Craig Bilner')
    });
  }
}

GameStore.config = {
  onSerialize(state) {
    return {
      gameData: state.gameData.toJS()
    };
  },
  onDeserialize(data) {
    return {
      gameData: Immutable.fromJS(data.gameData)
    };
  }
};

export default alt.createStore(GameStore, 'GameStore');
