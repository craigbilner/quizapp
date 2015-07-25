'use strict';

import assert from 'assert';
import alt from '../../altWrapper';
import Immutable from 'immutable';
import altGameStore from '../stores/altGameStore';
import gameStoreLogic from '../stores/gameStoreLogic';
import gameActions from '../actions/gameActions';
import testData from '../stores/gameStoreFixtureData';

describe('for the game store logic', () => {
  const testBase = gameStoreLogic
    .applyRules(Immutable.fromJS(testData))
    .applyI18n()
    .applyQuestion()
    .applyQuestionee()
    .applyTeamOrder()
    .applyTeamSummary()
    .applyQM()
    .applyTime({isPaused: true})
    .applyTimerText()
    .result();

  describe('if a player answers their own question within the player time interval', () => {
    it('their score should increase by the own question points value', () => {
      const setup = testBase
        .updateIn(['homeTeam', 0, 'total'], total => total + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 0, 'total']), 8);
    });

    it('their own question correct value should increase by one', () => {
      const setup = testBase
        .updateIn(['homeTeam', 0, 'ownqs'], ownqs => ownqs + 3);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 0, 'ownqs']), 4);
    });

    it('the game time should reset to the player interval', () => {
      const setup = testBase.set('gameTime', 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.get('gameTime'), 20);
    });

    it('the game should be paused', () => {
      const setup = testBase.set('isPaused', false);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.get('isPaused'), true);
    });
  });

  describe('if a player answers their own question outside the ' +
    'player interval but inside their team interval', () => {
    it('their score should increase by the bonus question points value', () => {
      const setup = testBase
        .set('questioneeId', null)
        .updateIn(['homeTeam', 0, 'total'], total => total + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 0, 'total']), 7);
    });

    it('their own question correct value should not increase', () => {
      const setup = testBase
        .set('questioneeId', null)
        .updateIn(['homeTeam', 0, 'ownqs'], ownqs => ownqs + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 0, 'ownqs']), 4);
    });

    it('the game time should reset to the player interval', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('gameTime', 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.get('gameTime'), 20);
    });

    it('the game should be paused', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('isPaused', false);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.get('isPaused'), true);
    });
  });

  describe('if a player answers their own question when it has gone over to the other team', () => {
    it('their score should not increase', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .updateIn(['homeTeam', 0, 'total'], total => total + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 0, 'total']), 4);
    });

    it('their own question correct value should not increase', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .updateIn(['homeTeam', 0, 'ownqs'], ownqs => ownqs + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 0, 'ownqs']), 4);
    });

    it('the game time should not reset', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .set('gameTime', 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.get('gameTime'), 4);
    });

    it('the game should continue', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .set('isPaused', false);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      assert.equal(altGameStore.getState().gameData.get('isPaused'), false);
    });
  });

  describe('if a player answers their team question within the player interval', () => {
    it('their score should increase by the bonus question points value', () => {
      const setup = testBase
        .updateIn(['homeTeam', 1, 'total'], total => total + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 1, 'total']), 7);
    });

    it('their own question correct value should not increase', () => {
      const setup = testBase
        .updateIn(['homeTeam', 1, 'ownqs'], ownqs => ownqs + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 1, 'ownqs']), 4);
    });

    it('the game time should reset to the player interval', () => {
      const setup = testBase
        .set('gameTime', 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.get('gameTime'), 20);
    });

    it('the game should be paused', () => {
      const setup = testBase
        .set('isPaused', false);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.get('isPaused'), true);
    });
  });

  describe('if a player answers their team question within their team interval', () => {
    it('their score should increase by the bonus question points value', () => {
      const setup = testBase
        .set('questioneeId', null)
        .updateIn(['homeTeam', 1, 'total'], total => total + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 1, 'total']), 7);
    });

    it('their own question correct value should not increase', () => {
      const setup = testBase
        .set('questioneeId', null)
        .updateIn(['homeTeam', 1, 'ownqs'], ownqs => ownqs + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 1, 'ownqs']), 4);
    });

    it('the game time should reset to the player interval', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('gameTime', 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.get('gameTime'), 20);
    });

    it('the game should be paused', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('isPaused', false);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 2,
        teamType: 1,
        seat: 2
      });

      assert.equal(altGameStore.getState().gameData.get('isPaused'), true);
    });
  });

  describe('if a player answers a question that has gone over to their team', () => {
    it('their score should increase by the bonus question points value', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .updateIn(['awayTeam', 2, 'total'], total => total + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 7,
        teamType: 2,
        seat: 3
      });

      assert.equal(altGameStore.getState().gameData.getIn(['awayTeam', 2, 'total']), 7);
    });

    it('their own question correct value should not increase', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .updateIn(['awayTeam', 2, 'ownqs'], ownqs => ownqs + 4);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 7,
        teamType: 2,
        seat: 3
      });

      assert.equal(altGameStore.getState().gameData.getIn(['awayTeam', 2, 'ownqs']), 4);
    });

    it('the game time should reset to the player interval', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .set('gameTime', 2);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 7,
        teamType: 2,
        seat: 3
      });

      assert.equal(altGameStore.getState().gameData.get('gameTime'), 20);
    });

    it('the game should be paused', () => {
      const setup = testBase
        .set('questioneeId', null)
        .set('answereeTeamType', 2)
        .set('isPaused', false);

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 7,
        teamType: 2,
        seat: 3
      });

      assert.equal(altGameStore.getState().gameData.get('isPaused'), true);
    });
  });

  describe('if a player answers a question', () => {
    it('the question should move to the next one if it\'s the first one', () => {
      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: testBase
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      const gameData = altGameStore.getState().gameData;

      assert.equal(gameData.get('currentIndx'), '1b');
      assert.equal(gameData.get('currentQuestion'), 'the second question');
      assert.equal(gameData.get('currentAnswer'), 'the second answer');
    });

    it('the question should move to the default question if there are no more left', () => {
      const setup = testBase.set('questionSet',
        testBase.get('questionSet')
          .map(question => {
            return question.set('hasFinished', true);
          }));

      alt.bootstrap(JSON.stringify({
        GameStore: {
          gameData: setup
        }
      }));

      gameActions.playerAnswered({
        playerId: 1,
        teamType: 1,
        seat: 1
      });

      const gameData = altGameStore.getState().gameData;

      assert.equal(gameData.get('currentIndx'), '00');
      assert.equal(gameData.get('currentQuestion'), 'test there are no more questions');
      assert.equal(gameData.get('currentAnswer'), 'test there are no more answers');
    });

    describe('if the home team are going first ', () => {
      it('the next questionee after home seat one should be away seat one', () => {
        alt.bootstrap(JSON.stringify({
          GameStore: {
            gameData: testBase
          }
        }));

        gameActions.playerAnswered({
          playerId: 1,
          teamType: 1,
          seat: 1
        });

        const gameData = altGameStore.getState().gameData;

        assert.equal(gameData.get('questioneeName'), 'Player A1');
        assert.equal(gameData.get('questioneeId'), 5);
        assert.equal(gameData.get('questioneeTeamType'), 2);
        assert.equal(gameData.get('answereeTeamType'), 2);
      });

      it('the next questionee after away seat one should be home seat two', () => {
        alt.bootstrap(JSON.stringify({
          GameStore: {
            gameData: testBase
          }
        }));

        gameActions.playerAnswered({
          playerId: 1,
          teamType: 1,
          seat: 1
        });

        gameActions.playerAnswered({
          playerId: 5,
          teamType: 2,
          seat: 1
        });

        const gameData = altGameStore.getState().gameData;

        assert.equal(gameData.get('questioneeName'), 'Player H2');
        assert.equal(gameData.get('questioneeId'), 2);
        assert.equal(gameData.get('questioneeTeamType'), 1);
        assert.equal(gameData.get('answereeTeamType'), 1);
      });

      it('the next questionee after away seat four should be home seat one if' +
        ' not halfway', () => {
        const setup = testBase
          .setIn(['teams', 'players', 0, 'isQuestionee'], false)
          .setIn(['teams', 'players', 7, 'isQuestionee'], true);

        alt.bootstrap(JSON.stringify({
          GameStore: {
            gameData: setup
          }
        }));

        gameActions.playerAnswered({
          playerId: 8,
          teamType: 2,
          seat: 4
        });

        const gameData = altGameStore.getState().gameData;

        assert.equal(gameData.get('questioneeName'), 'Player H1');
        assert.equal(gameData.get('questioneeId'), 1);
        assert.equal(gameData.get('questioneeTeamType'), 1);
        assert.equal(gameData.get('answereeTeamType'), 1);
      });

      it('the next questionee after away seat four should be away seat one if' +
        ' it is the 32nd question', () => {
        const setup = testBase
          .set('questionSet', testBase
            .get('questionSet')
            .map((question, indx) => {
              return question.set('hasFinished', indx < 31);
            }))
          .set('questioneeName', 'Player A4')
          .set('questioneeId', 8)
          .set('questioneeTeamType', 2)
          .set('answereeTeamType', 2)
          .setIn(['teams', 'players', 0, 'isQuestionee'], false)
          .setIn(['teams', 'players', 7, 'isQuestionee'], true);

        alt.bootstrap(JSON.stringify({
          GameStore: {
            gameData: setup
          }
        }));

        gameActions.playerAnswered({
          playerId: 8,
          teamType: 2,
          seat: 4
        });

        const gameData = altGameStore.getState().gameData;

        assert.equal(gameData.get('questioneeName'), 'Player A1');
        assert.equal(gameData.get('questioneeId'), 5);
        assert.equal(gameData.get('questioneeTeamType'), 2);
        assert.equal(gameData.get('answereeTeamType'), 2);
      });
    });
  });
});
