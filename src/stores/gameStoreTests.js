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

      assert.equal(altGameStore.getState().gameData.getIn(['homeTeam', 0, 'total']), 6);
    });
  });
});
