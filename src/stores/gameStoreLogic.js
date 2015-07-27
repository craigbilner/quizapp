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
        'timesUp',
        'nobodyKnows'
      ])),
      controlText: this.tempData.get('i18n').filter(this.keyIn([
        'over',
        'incorrect',
        'nextQuestion'
      ])),
      timingText: this.tempData.get('i18n').filter(this.keyIn([
        'start',
        'pause',
        'timeRemaining'
      ]))
    });

    return this;
  }

  applyQuestion() {
    const question = this.getQuestion(this.tempData.get('questionSet'),
      this.tempData.get('i18n'));

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

    if (questioneeIndx < 0) {
      throw new Error('There is no questionee');
    }

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
    let questionee = this.tempData
      .getIn(['teams', 'players'])
      .find(player => player.get('isQuestionee'));

    if (!questionee) {
      this.tempData = this.tempData.setIn(['teams', 'players', 0, 'isQuestionee'], true);
      questionee = this.tempData.getIn(['teams', 'players', 0]);
    }

    this.tempData = this.tempData.merge({
      questioneeName: questionee.get('name'),
      questioneeId: questionee.get('playerId'),
      questioneeTeamType: questionee.get('teamType'),
      answereeTeamType: questionee.get('teamType'),
      gameStatus: 1
    });

    return this;
  }

  applyNextQuestionee({newTime = 0, reset = this.tempData.get('resetGameTime')}) {
    if (newTime === 0) {
      this.tempData = this.calculateNextQuestionee
        .call(this.calculateNextQuestionee, this.tempData)
        .setNextQuestionee()
        .setGameStatus()
        .setGameTime({reset: reset})
        .result();

      return new BaseLogic(this.tempData);
    }

    return this;
  }

  applyTeamOrder(firstTeamType = this.tempData.getIn(['teams', 'firstTeamType'])) {
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

  applyScore({playerId, teamType, seat}) {
    if (teamType !== this.tempData.get('answereeTeamType')) {
      return new BaseLogic(this.tempData);
    }

    const {score, isOwnQuestion} = this
      .calculateScore
      .call(this.calculateScore, this.tempData, playerId, teamType)
      .isOwnQuestion(this.tempData.get('ownQuestionPoints'))
      .isOwnTeam(this.tempData.get('bonusQuestionPoints'))
      .score();

    const playerPath = [
      teamType === 1 ? 'homeTeam' : 'awayTeam',
      seat - 1
    ];

    this.tempData = this.tempData
      .updateIn([...playerPath, 'total'], total => total + score)
      .updateIn([...playerPath, 'ownqs'], ownqs => ownqs + (isOwnQuestion >> 0));
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
      .setGameStatus({gameStatus: 5})
      .setGameTime()
      .result();

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

    this.setGameStatus = ({gameStatus = 0} = {}) => {
      let gameStatusToSet = gameStatus;
      if (!gameStatusToSet) {
        if (this.data.get('questioneeId')) {
          gameStatusToSet = 1;
        } else if (this.data.get('questioneeTeamType') === this.data.get('answereeTeamType')) {
          gameStatusToSet = 2;
        } else if (this.data.get('answereeTeamType')) {
          gameStatusToSet = 3;
        } else {
          gameStatusToSet = 4;
        }
      }
      this.data = this.data.set('gameStatus', gameStatusToSet);

      return this;
    };

    this.setGameTime = ({reset = false} = {}) => {
      const timeToSet = !this.data.get('questioneeId') && !this.data.get('answereeTeamType')
        ? this.data.get('playerTimeInterval')
        : this.data.get('teamTimeInterval');
      const endStatus = this.data.get('gameStatus') > 3;

      this.data = this.data.merge({
        gameTime: timeToSet,
        isPaused: this.data.get('isPaused') || endStatus,
        resetGameTime: reset || this.data.get('isPaused') || endStatus
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
          ownqs: 0
        });
      });
  }

  getQuestion(questionSet, i18n) {
    const lastQuestion = questionSet.find(question => !question.get('hasFinished'));

    return lastQuestion || Immutable.fromJS({
        indx: '00',
        qText: i18n.get('noMoreQuestions'),
        aText: i18n.get('noMoreAnswers')
      });
  }

  getRoundName(roundDesc, round) {
    return `${roundDesc} ${round}`;
  }

}

export default new GameStoreLogic();

