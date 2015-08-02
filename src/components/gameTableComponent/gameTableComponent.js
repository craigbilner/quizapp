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
    const compStyle = [
      this.props.baseStyles.layout.flex(1),
      this.props.baseStyles.layout.columns,
      style.comp
    ];
    const tableTopStyle = [
      this.props.baseStyles.layout.rows,
      this.props.baseStyles.layout.flex(10)
    ];
    const tableTeamContainerStyle = [
      this.props.baseStyles.layout.flex(1),
      this.props.baseStyles.layout.columns
    ];
    const tableStyle = [
      this.props.baseStyles.layout.flex(1),
      style.table,
      {
        backgroundColor: this.props.baseStyles.colours.light.tertiary
      }
    ];
    const tableBottomStyle = [
      this.props.baseStyles.layout.rows,
      style.tableBottom,
      this.props.baseStyles.layout.flex(1)
    ];
    const tableHeadStyle = [
      this.props.baseStyles.layout.flex(1),
      {
        backgroundColor: this.props.baseStyles.colours.light.tertiary
      }
    ];

    return (
      <div style={compStyle}>
        <div style={tableTopStyle}>
          <div style={tableTeamContainerStyle}>
            <TableTeamComponent
              players={this.props.homeTeam}
              baseStyles={this.props.baseStyles}
              questioneeId={this.props.questioneeId}
              answereeTeamType={this.props.answereeTeamType}
              gameStatus={this.props.gameStatus}
              round={this.props.round}
              />
          </div>
          <div style={tableStyle}></div>
          <div style={tableTeamContainerStyle}>
            <TableTeamComponent
              players={this.props.awayTeam}
              baseStyles={this.props.baseStyles}
              questioneeId={this.props.questioneeId}
              answereeTeamType={this.props.answereeTeamType}
              gameStatus={this.props.gameStatus}
              round={this.props.round}
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
            <QMComponent
              player={this.props.questionMaster}
              baseStyles={this.props.baseStyles}
              />
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
  baseStyles: React.PropTypes.object,
  questioneeId: React.PropTypes.number,
  answereeTeamType: React.PropTypes.number,
  gameStatus: React.PropTypes.number.isRequired,
  round: React.PropTypes.number.isRequired
};

GameTableComponent.defaultProps = {};

export default Radium(GameTableComponent);
