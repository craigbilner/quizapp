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

  describe('if a player answers their own question outside the player interval but inside their team interval', () => {
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
});
