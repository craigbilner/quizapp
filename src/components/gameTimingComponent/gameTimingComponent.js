'use strict';

import React
  from 'react';
import Radium
  from 'Radium';
import GameTimerSmartComponent
  from '../gameTimerComponent/gameTimerSmartComponent';
import GameTimerComponent
  from '../gameTimerComponent/gameTimerComponent';
import GameTimerMessageComponent
  from '../gameTimerMessageComponent/gameTimerMessageComponent';
import GameTimerControlSmartComponent
  from '../gameTimerControlComponent/gameTimerControlSmartComponent';
import GameTimerControlComponent
  from '../gameTimerControlComponent/gameTimerControlComponent';
import GameQuestionControlComponent
  from '../gameQuestionControlComponent/gameQuestionControlComponent';

@Radium
export default
class GameTimingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="webflex-column">
        <div className="game_timer-title">
          Time remaining
        </div>
        <div className="game_timer-time">
          <GameTimerSmartComponent>
            <GameTimerComponent
              gameTime={this.props.gameTime}
              isPaused={this.props.isPaused}
              isReset={this.props.resetGameTime}
              timeInterval={this.props.timeInterval}
              />
          </GameTimerSmartComponent>
        </div>
        <div className="game_timer-message">
          <GameTimerMessageComponent timerMessage={this.props.timerMessage}/>
        </div>
        <div style={[this.props.baseStyles.layout.rows]}>
          <GameTimerControlSmartComponent baseStyles={this.props.baseStyles}>
            <GameTimerControlComponent
              timerText={this.props.timerText}
              isPaused={this.props.isPaused}
              baseStyles={this.props.baseStyles}
              />
          </GameTimerControlSmartComponent>

          <div style={this.props.baseStyles.layout.flex(1)}>
            <GameQuestionControlComponent baseStyles={this.props.baseStyles}/>
          </div>
        </div>
      </div>
    );
  }
}

GameTimingComponent.propTypes = {
  gameTime: React.PropTypes.number.isRequired,
  isPaused: React.PropTypes.bool.isRequired,
  resetGameTime: React.PropTypes.bool.isRequired,
  timeInterval: React.PropTypes.number,
  timerText: React.PropTypes.object.isRequired,
  timerMessage: React.PropTypes.string.isRequired
};

GameTimingComponent.defaultProps = {};

