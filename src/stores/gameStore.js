import alt from '../../altWrapper';
import Immutable from 'immutable';

class GameStore {
  constructor() {
    this.state = {
      gameData: Immutable.Map({})
    };
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
