'use strict';

import Immutable from 'immutable';

class BaseLogic {
  constructor(data = Immutable.fromJS({})) {
    this.tempData = data;
  }

  applyRules(data) {
    this.tempData = data;
    return this;
  }

  applyQuestion() {
    return this;
  }

  applyNextQuestion() {
    return this;
  }

  applyQuestionee() {
    return this;
  }

  applyTeams() {
    return this;
  }

  applyQM() {
    return this;
  }

  applyTime() {
    return this;
  }

  applyTimerText() {
    return this;
  }

  applyScore() {
    return this;
  }

  result() {
    return this.tempData;
  }
}

class GameStoreLogic extends BaseLogic {
  applyQuestion() {
    const question = this.getQuestion(this.tempData.get('questionSet'));

    this.tempData = this.tempData.merge({
      roundName: this.getRoundName(
        this.tempData.getIn(['i18n', 'roundDesc']),
        question.get('indx')
      ),
      currentIndx: question.get('indx'),
      currentQuestion: question.get('qText'),
      currentAnswer: question.get('aText')
    });

    return this;
  }

  applyNextQuestion() {
    const questioneeIndx = this.tempData
      .getIn(['teams', 'players'])
      .findIndex(player => player.get('isQuestionee'));
    const questionIndx = this.tempData
      .get('questionSet')
      .findIndex(question => !question.get('hasFinished'));
    const nextIndx = questioneeIndx === 7 ? 0 : questioneeIndx + 1;

    this.tempData = this.tempData
      .setIn(['teams', 'players', questioneeIndx, 'isQuestionee'], false)
      .setIn(['teams', 'players', nextIndx, 'isQuestionee'], true)
      .setIn(['questionSet', questionIndx, 'hasFinished'], true);

    return this;
  }

  applyQuestionee() {
    const questionee = this.tempData
      .getIn(['teams', 'players'])
      .find(player => player.get('isQuestionee'));

    this.tempData = this.tempData.merge({
      questioneeName: questionee.get('name'),
      questioneeId: questionee.get('playerId'),
      questioneeTeamType: questionee.get('teamType')
    });

    return this;
  }

  applyTeams() {
    const teamSort = this.teamSort(this.tempData.get('firstTeamType'));

    this.tempData = this.tempData.setIn(['teams', 'players'], this.tempData
      .getIn(['teams', 'players'])
      .sort(teamSort)
      .sort((prev, next) => {
        return prev.get('seat') > next.get('seat');
      }));

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

  applyTime({newTime = 10, reset = false, isPaused = false}) {
    this.tempData = this.tempData.merge({
      gameTime: Math.max(newTime, 0),
      resetGameTime: reset,
      isPaused: isPaused
    });

    return this;
  }

  applyTimerText() {
    this.tempData = this.tempData.merge({
      timerText: this.tempData.get('i18n').filter(this.keyIn([
        'startText',
        'pauseText'
      ]))
    });

    return this;
  }

  applyScore({playerId, teamType, seat}) {
    if (teamType !== this.tempData.get('questioneeTeamType')) {
      return new BaseLogic(this.tempData);
    }

    const {score, isOwnQuestion} = this
      .calculateScore
      .call(this.calculateScore, this.tempData, playerId, teamType)
      .isOwnQuestion(2)
      .isOwnTeam(1)
      .score();

    const playerPath = [
      teamType === 1 ? 'homeTeam' : 'awayTeam',
      seat - 1
    ];

    this.tempData = this.tempData
      .updateIn([...playerPath, 'total'], total => total + score)
      .updateIn([...playerPath, 'twos'], twos => twos + (isOwnQuestion >> 0));

    return this;
  }

  result() {
    return this.tempData;
  }

  teamSort(firstTeamType = 1) {
    return (prev, next) => {
      const diff = prev.get('teamType') - next.get('teamType');
      return diff * (firstTeamType === 1 ? 1 : -1);
    };
  }

  calculateScore(data, playerId, teamType) {
    const isOwnTeam = teamType === data.get('questioneeTeamType');
    const isOwnQuestion = isOwnTeam && playerId === data.get('questioneeId');
    let playerScore = 0;

    this.isOwnQuestion = score => {
      if (playerScore === 0 && isOwnQuestion) {
        playerScore = score;
      }
      return this;
    };

    this.isOwnTeam = score => {
      if (playerScore === 0 && isOwnTeam) {
        playerScore = score;
      }
      return this;
    };

    this.score = () => {
      return {
        score: playerScore,
        isOwnQuestion: isOwnQuestion
      };
    };

    return this;
  }

  keyIn(keys) {
    const keySet = Immutable.Set(keys);
    return function (v, k) {
      return keySet.has(k);
    };
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
        return player.merge({
          initials: this.getPlayerInitials(player.get('name')),
          total: 0,
          twos: 0
        });
      });
  }

  getQuestion(questionSet) {
    const lastQuestion = questionSet.find(question => !question.get('hasFinished'));

    return lastQuestion || Immutable.fromJS({
        indx: '00',
        qText: 'there are no more questions',
        aText: 'there are no more answers'
      });
  }

  getRoundName(roundDesc, indx) {
    let roundInt = 0;
    if (indx) {
      [roundInt] = indx.split('');
    }

    return `${roundDesc} ${roundInt}`;
  }

}

export default new GameStoreLogic();

