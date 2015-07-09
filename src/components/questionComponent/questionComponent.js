'use strict';

import React from 'react';

export default class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        Juventus were the comfortable winners of this season’s Serie A, finishing
                17 points ahead of which team, currently featuring the players Daniele de
                Rossi and Gervinho?
        </span>
    );
  }
}

QuestionComponent.propTypes = {};

QuestionComponent.defaultProps = {};
