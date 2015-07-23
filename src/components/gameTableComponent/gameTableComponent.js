'use strict';

import React from 'react';
import Radium from 'Radium';
import style from '../gameTableComponent/gameTableStyle';
import TableTeamComponent from '../tableTeamComponent/tableTeamComponent';
import QMComponent from '../qmComponent/qmComponent';

class GameTableComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tableStyle = [
      this.props.baseStyles.layout.flex(1),
      style.table
    ];
    const tableBottomStyle = [
      this.props.baseStyles.layout.rows,
      style.tableBottom
    ];
    const tableHeadStyle = [
      this.props.baseStyles.layout.flex(1),
      style.tableHead
    ];

    return (
      <div>
        <div style={this.props.baseStyles.layout.rows}>
          <div style={this.props.baseStyles.layout.flex(1)}>
            <TableTeamComponent
              players={this.props.homeTeam}
              baseStyles={this.props.baseStyles}
              />
          </div>
          <div style={tableStyle}></div>
          <div style={this.props.baseStyles.layout.flex(1)}>
            <TableTeamComponent
              players={this.props.awayTeam}
              baseStyles={this.props.baseStyles}
              />
          </div>
        </div>
        <div style={tableBottomStyle}>
          <div style={this.props.baseStyles.layout.flex(1)}></div>
          <div style={tableHeadStyle}></div>
          <div style={this.props.baseStyles.layout.flex(1)}></div>
        </div>
        <div style={tableBottomStyle}>
          <div style={this.props.baseStyles.layout.flex(1)}></div>
          <div>
            <QMComponent player={this.props.questionMaster}/>
          </div>
          <div style={this.props.baseStyles.layout.flex(1)}></div>
        </div>
      </div>
    );
  }
}

GameTableComponent.propTypes = {
  homeTeam: React.PropTypes.object.isRequired,
  awayTeam: React.PropTypes.object.isRequired,
  questionMaster: React.PropTypes.object.isRequired,
  baseStyles: React.PropTypes.object
};

GameTableComponent.defaultProps = {};

export default Radium(GameTableComponent);
