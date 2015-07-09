'use strict';

import React from 'react';

export default class GameTimerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this.timerInterval = setInterval(()=> {
      const timeToSet = this.state.time === 0 ? 10 : this.state.time - 1;
      this.setState({time: timeToSet});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    return (
      <span>{this.state.time}</span>
    );
  }
}

GameTimerComponent.propTypes = {};

GameTimerComponent.defaultProps = {};

