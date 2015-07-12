import alt from '../../altWrapper';

class GameStore {
  constructor() {
    this.state = {
      test: 'default value'
    };
  }

}

export default alt.createStore(GameStore, 'GameStore');
