'use strict';

import React
  from 'react';
import Radium
  from 'Radium';
import style
  from '../gameTimingComponent/gameTimingStyle';
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
import GameQuestionControlSmartComponent
  from '../gameQuestionControlComponent/gameQuestionControlSmartComponent';
import GameQuestionControlComponent
  from '../gameQuestionControlComponent/gameQuestionControlComponent';

class GameTimingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const titleStyle = [
      this.props.baseStyles.layout.flex(1),
      {
        color: this.props.baseStyles.colours.dark.primary
      }
    ];
    const timerStyle = [
      this.props.baseStyles.layout.flex(1),
      style.timer
    ];

    return (
      <div style={this.props.baseStyles.layout.columns}>
        <div style={titleStyle}>
          {this.props.timingText.get('timeRemaining')}
        </div>
        <div style={timerStyle}>
          <GameTimerSmartComponent>
            <GameTimerComponent
              gameTime={this.props.gameTime}
              isPaused={this.props.isPaused}
              isReset={this.props.resetGameTime}
              timeInterval={this.props.timeInterval}
              baseStyles={this.props.baseStyles}
              />
          </GameTimerSmartComponent>
        </div>
        <div style={this.props.baseStyles.layout.flex(1)}>
          <GameTimerMessageComponent
            gameStatus={this.props.gameStatus}
            msgText={this.props.msgText}
            baseStyles={this.props.baseStyles}
            />
        </div>
        <div style={[this.props.baseStyles.layout.rows]}>
          <GameTimerControlSmartComponent
            baseStyles={this.props.baseStyles}
            gameStatus={this.props.gameStatus}
            >
            <GameTimerControlComponent
              timingText={this.props.timingText}
              isPaused={this.props.isPaused}
              baseStyles={this.props.baseStyles}
              />
          </GameTimerControlSmartComponent>

          <div style={this.props.baseStyles.layout.flex(1)}>
            <GameQuestionControlSmartComponent>
              <GameQuestionControlComponent
                baseStyles={this.props.baseStyles}
                gameStatus={this.props.gameStatus}
                controlText={this.props.controlText}
                />
            </GameQuestionControlSmartComponent>
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
  timingText: React.PropTypes.object.isRequired,
  gameStatus: React.PropTypes.number.isRequired,
  msgText: React.PropTypes.object,
  controlText: React.PropTypes.object,
  baseStyles: React.PropTypes.object
};

GameTimingComponent.defaultProps = {};

export default Radium(GameTimingComponent);
