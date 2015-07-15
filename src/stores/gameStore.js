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
      this.setQuestion();
      this.setTeams();
      this.setTime();
    });
  }

  setTime(newTime = 10) {
    this.setState({
      gameData: this.state.gameData.set('gameTime', Math.max(newTime, 0))
    });
  }

  setHomeTeam(homeTeam) {
    this.setState({
      gameData: this.state.gameData.set('homeTeam', homeTeam)
    });
  }

  setAwayTeam(awayTeam) {
    this.setState({
      gameData: this.state.gameData.set('awayTeam', awayTeam)
    });
  }

  getPlayerInitials(name) {
    return name
      .split(' ')
      .reduce(function (prev, next) {
        prev.push(next[0]);
        return prev;
      }, [])
      .join('')
      .toUpperCase();
  }

  getTeamOfType(players, teamType) {
    return players.filter(player => player.get('teamType') === teamType)
      .map(player => {
        const init = player.set('initials', this.getPlayerInitials(player.get('name')));
        const total = init.set('total', 0);
        return total.set('twos', 0);
      });
  }

  setQM(qm) {
    const questionMaster = qm.set('initials', this.getPlayerInitials(qm.get('name')));

    this.setState({
      gameData: this.state.gameData.set('questionMaster', questionMaster)
    });
  }

  setTeams() {
    const players = this.state.gameData.getIn(['teams', 'players']);

    this.setQuestionee(players);
    this.setHomeTeam(this.getTeamOfType(players, 1));
    this.setAwayTeam(this.getTeamOfType(players, 2));
    this.setQM(this.state.gameData.get('qm'));
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

  setQuestionText(text) {
    this.setState({
      gameData: this.state.gameData.set('currentQuestion', text)
    });
  }

  setAnswerText(text) {
    this.setState({
      gameData: this.state.gameData.set('currentAnswer', text)
    });
  }

  setQuestion() {
    const question = this.getQuestion(this.state.gameData.get('questionSet'));
    this.setRound(question.get('indx'));
    this.setIndx(question.get('indx'));
    this.setQuestionText(question.get('qText'));
    this.setAnswerText(question.get('aText'));
  }

  getQuestionee(players) {
    return players.find(player => player.get('isQuestionee'));
  }

  setQuestionee(players) {
    const questionee = this.getQuestionee(players);

    this.setState({
      gameData: this.state.gameData.set('questionee', questionee.get('name'))
    });
  }

  onPlayerAnswered() {
    this.setTime();
  }

  onUpdateTime(newTime) {
    this.setTime(newTime);
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
