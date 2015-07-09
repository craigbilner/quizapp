'use strict';

import React from 'react';
import TableTeamComponent from '../tableTeamComponent/tableTeamComponent';
import QMComponent from '../qmComponent/qmComponent';

export default class GameTableComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="table_container-top webflex-row">
          <TableTeamComponent />

          <div className="table_container-table_main"></div>
          <TableTeamComponent />
        </div>
        <div className="table_container-bottom webflex-row">
          <div className="table-container-team"></div>
          <div className="table-container-table_head"></div>
          <div className="table-container-team"></div>
        </div>
        <div className="table_container-bottom webflex-row">
          <div className="table-container-team"></div>
          <div className="table-container-qm">
            <QMComponent />
          </div>
          <div className="table-container-team"></div>
        </div>
      </div>
    );
  }
}

GameTableComponent.propTypes = {};

GameTableComponent.defaultProps = {};

