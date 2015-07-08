'use strict';

import React from 'react';

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  handleClick() {
    this.setState({
      text: 'click attached on the client'
    });
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>{this.state.text}</div>
    );
  }
}

AppComponent.propTypes = {
  text: React.PropTypes.string
};

AppComponent.defaultProps = {
  text: 'default text'
};
