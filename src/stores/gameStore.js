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
      this.setQuestion();
    });
  }

  setRound(indx) {
    const roundName = `Round ${this.getRound(indx)}`;
    this.setState({
      gameData: this.state.gameData.set('roundName', roundName)
    });
  }

  getRound(indx) {
    let roundInt = 0;
    if (indx) {
      [roundInt] = indx.split('');
    }

    return roundInt;
  }

  getQuestion(questionSet) {
    const lastQuestion = questionSet.find(question => !question.get('hasFinished'));

    return lastQuestion || Immutable.fromJS({
        qText: 'there are no more questions'
      });
  }

  setIndx(indx) {
    this.setState({
      gameData: this.state.gameData.set('currentIndx', indx)
    });
  }

  setQuestion() {
    const question = this.getQuestion(this.state.gameData.get('questionSet'));
    this.setRound(question.get('indx'));
    this.setIndx(question.get('indx'));
  }

  getQuestionee(players) {
    return players.find(player => player.get('isQuestionee'));
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
