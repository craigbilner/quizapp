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

  applyI18n() {
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

  applyNextQuestionee() {
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

  applyForceOver() {
    return this;
  }

  applyEndQuestion() {
    return this;
  }

  result() {
    return this.tempData;
  }
}

class GameStoreLogic extends BaseLogic {
  applyI18n() {
    this.tempData = this.tempData.merge({
      msgText: this.tempData.get('i18n').filter(this.keyIn([
        'player',
        'team',
        'over',
        'timesUp'
      ])),
      controlText: this.tempData.get('i18n').filter(this.keyIn([
        'over',
        'incorrect',
        'nextQuestion'
      ]))
    });

    return this;
  }

  applyQuestion() {
    const question = this.getQuestion(this.tempData.get('questionSet'));

    this.tempData = this.tempData.merge({
      roundName: this.getRoundName(
        this.tempData.getIn(['i18n', 'roundDesc']),
        question.get('round')
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

    if (questionIndx === 31) {
      this.applyTeamOrder(this.tempData.getIn(['teams', 'firstTeamType']) === 1 ? 2 : 1);
    }

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
      questioneeTeamType: questionee.get('teamType'),
      answereeTeamType: questionee.get('teamType'),
      gameStatus: 1
    });

    return this;
  }

  applyNextQuestionee({newTime = 0}) {
    if (newTime === 0) {
      this.tempData = this.calculateNextQuestionee
        .call(this.calculateNextQuestionee, this.tempData)
        .setNextQuestionee()
        .setTimerMessage()
        .setGameTime()
        .result();

      return new BaseLogic(this.tempData);
    }

    return this;
  }

  applyTeamOrder(firstTeamType = 1) {
    const teamSort = this.teamSort(firstTeamType);

    this.tempData = this.tempData.setIn(['teams', 'players'], this.tempData
      .getIn(['teams', 'players'])
      .sort(teamSort)
      .sort((prev, next) => {
        return prev.get('seat') > next.get('seat');
      }));

    return this;
  }

  applyTeamSummary() {
    const players = this.tempData.getIn(['teams', 'players']);

    this.tempData = this.tempData.merge({
      homeTeamTotal: this.tempData.getIn(['teams', 'homeHandicap']),
      homeTeam: this.getTeamOfType(players, 1),
      awayTeamTotal: this.tempData.getIn(['teams', 'awayHandicap']),
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

  applyTime({newTime = this.tempData.get('playerTimeInterval'), reset = false, isPaused = false}) {
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
    if (teamType !== this.tempData.get('answereeTeamType')) {
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
    this.tempData = this.tempData
      .set('homeTeamTotal',
      this.calculateTotal(this.tempData.get('homeTeam'))
      + this.tempData.getIn(['teams', 'homeHandicap']))
      .set('awayTeamTotal',
      this.calculateTotal(this.tempData.get('awayTeam'))
      + this.tempData.getIn(['teams', 'awayHandicap']));

    return this;
  }

  applyForceOver() {
    this.tempData = this.tempData.set('questioneeId', null);

    return this;
  }

  applyEndQuestion() {
    this.tempData = this.tempData.merge({
      questioneeId: null,
      answereeTeamType: null
    });

    this.tempData = this.calculateNextQuestionee
      .call(this.calculateNextQuestionee, this.tempData)
      .setTimerMessage()
      .setGameTime()
      .result();

    console.log(this.tempData.toJS());

    return this;
  }

  result() {
    return this.tempData;
  }

  calculateNextQuestionee(data) {
    this.data = data;

    this.setNextQuestionee = () => {
      const currentTeam = data.get('answereeTeamType');
      if (data.get('questioneeId')) {
        this.data = this.data.set('questioneeId', null);
      } else if (currentTeam === data.get('questioneeTeamType')) {
        this.data = this.data.set('answereeTeamType', currentTeam === 1 ? 2 : 1);
      } else {
        this.data = this.data.set('answereeTeamType', null);
      }

      return this;
    };

    this.setTimerMessage = () => {
      let gameStatus = 0;
      if (this.data.get('questioneeId')) {
        gameStatus = 1;
      } else if (this.data.get('questioneeTeamType') === this.data.get('answereeTeamType')) {
        gameStatus = 2;
      } else if (this.data.get('answereeTeamType')) {
        gameStatus = 3;
      } else {
        gameStatus = 4;
      }

      this.data = this.data.set('gameStatus', gameStatus);

      return this;
    };

    this.setGameTime = () => {
      const timeToSet = !this.data.get('questioneeId') && !this.data.get('answereeTeamType')
        ? this.data.get('playerTimeInterval')
        : this.data.get('teamTimeInterval');
      const isPaused = timeToSet === this.data.get('playerTimeInterval');

      this.data = this.data.merge({
        gameTime: timeToSet,
        isPaused: isPaused,
        resetGameTime: isPaused
      });

      return this;
    };

    this.result = () => this.data;

    return this;
  }

  teamSort(firstTeamType = 1) {
    return (prev, next) => {
      const diff = prev.get('teamType') - next.get('teamType');
      return diff * (firstTeamType === 1 ? 1 : -1);
    };
  }

  calculateTotal(team) {
    return team.reduce((prev, next) => {
      return prev + next.get('total');
    }, 0);
  }

  calculateScore(data, playerId, teamType) {
    const isOwnTeam = teamType === data.get('answereeTeamType');
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

  getRoundName(roundDesc, round) {
    return `${roundDesc} ${round}`;
  }

}

export default new GameStoreLogic();

