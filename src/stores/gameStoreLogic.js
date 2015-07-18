'use strict';

import Immutable from 'immutable';

class GameStoreLogic {
  constructor() {
    this.tempData = new Immutable.Map({});
  }

  applyRules(data) {
    this.tempData = data;
    return this;
  }

  applyQuestion() {
    const question = this.getQuestion(this.tempData.get('questionSet'));

    this.tempData = this.tempData.merge({
      roundName: this.getRoundName(question.get('indx')),
      currentIndx: question.get('indx'),
      currentQuestion: question.get('qText'),
      currentAnswer: question.get('aText')
    });

    return this;
  }

  applyQuestionee() {
    const questionee = this.tempData
      .getIn(['teams', 'players'])
      .find(player => player.get('isQuestionee'));

    this.tempData = this.tempData.merge({
      questioneeName: questionee.get('name'),
      questioneeId: questionee.get('playerId'),
      questioneeTeam: questionee.get('teamType')
    });

    return this;
  }

  applyTeams() {
    const players = this.tempData.getIn(['teams', 'players']);

    this.tempData = this.tempData.merge({
      homeTeam: this.getTeamOfType(players, 1),
      awayTeam: this.getTeamOfType(players, 2)
    });

    return this;
  }

  applyQM() {
    const qm = this.tempData.get('qm');
    const questionMaster = qm.set('initials', this.getPlayerInitials(qm.get('name')));

    this.tempData = this.tempData.set('questionMaster', questionMaster);

    return this;
  }

  applyTime({newTime = 10, reset = false}) {
    this.tempData = this.tempData.merge({
      gameTime: Math.max(newTime, 0),
      resetGameTime: reset
    });

    return this;
  }

  result() {
    return this.tempData;
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
    return players
      .filter(player => player.get('teamType') === teamType)
      .map(player => {
        const init = player.set('initials', this.getPlayerInitials(player.get('name')));
        const total = init.set('total', 0);
        return total.set('twos', 0);
      });
  }

  getQuestion(questionSet) {
    const lastQuestion = questionSet.find(question => !question.get('hasFinished'));

    return lastQuestion || Immutable.fromJS({
        qText: 'there are no more questions'
      });
  }

  getRoundName(indx) {
    let roundInt = 0;
    if (indx) {
      [roundInt] = indx.split('');
    }

    return `Round ${roundInt}`;
  }

}

export default new GameStoreLogic();

