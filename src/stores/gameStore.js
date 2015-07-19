'use strict';

import alt from '../../altWrapper';
import Immutable from 'immutable';
import gameActions from '../actions/gameActions';
import gameStoreLogic from '../stores/gameStoreLogic';

class GameStore {
  constructor() {
    this.bindActions(gameActions);
    this.state = {
      gameData: Immutable.Map({})
    };
  }

  onPlayerAnswered(opts) {
    this.setState({
      gameData: gameStoreLogic
        .applyRules(this.state.gameData)
        .applyScore(opts)
        .applyNextQuestion()
        .applyQuestion()
        .applyQuestionee()
        .applyTime({
          reset: true,
          isPaused: true
        })
        .result()
    });
  }

  onToggleTime({isPaused = true}) {
    this.setState({
      gameData: gameStoreLogic
        .applyRules(this.state.gameData)
        .applyTime({
          isPaused: isPaused,
          reset: true,
          newTime: this.state.gameData.get('gameTime')
        })
        .result()
    });
  }

  onUpdateTime(newTime) {
    this.setState({
      gameData: gameStoreLogic
        .applyRules(this.state.gameData)
        .applyNextQuestionee({
          newTime: newTime
        })
        .applyTime({
          reset: false,
          newTime: newTime
        })
        .result()
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
