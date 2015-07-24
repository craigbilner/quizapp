'use strict';

import koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import hbs from 'koa-hbs';
import Iso from 'iso';
import alt from '../../altWrapper';
import common from 'koa-common';
import path from 'path';
import getFiles from '../helpers/getFiles';
import AppComponent from '../components/appComponent/appComponent';
import Immutable from'immutable';
import gameStoreLogic from '../stores/gameStoreLogic';
import rethinkDb from 'rethinkdbdash';
import {dbConfig, appConfig} from './config';

const r = rethinkDb({
  servers: [
    {
      host: dbConfig.host,
      port: dbConfig.port
    }
  ]
});
const app = koa();

app.use(hbs.middleware({
  viewPath: './src/views'
}));

app.use(common.favicon(path.join(__dirname, '/dist/favicon.ico')));
app.use(common.static('./dist'));

app.use(function *(next) {
  yield next;

  const gameData = yield getFiles.json(path.join(__dirname, '../staticData/gameData.json'));
  const allQuestions = yield r.db('quizappdb').table('questions').orderBy('round', 'indx').map({
    aText: r.row('answer'),
    id: r.row('id'),
    indx: r.row('indx'),
    qText: r.row('question'),
    round: r.row('round'),
    hasFinished: false
  });
  gameData.questionSet = allQuestions.filter(question => question.round);
  gameData.spareSet = allQuestions.filter(question => !question.round);

  const data = {
    GameStore: {
      gameData: gameStoreLogic
        .applyRules(Immutable.fromJS(gameData))
        .applyI18n()
        .applyQuestion()
        .applyQuestionee()
        .applyTeamOrder()
        .applyTeamSummary()
        .applyQM()
        .applyTime({isPaused: true})
        .applyTimerText()
        .result()
    }
  };

  alt.bootstrap(JSON.stringify(data));

  const html = ReactDOMServer.renderToString(React.createElement(AppComponent));

  yield this.render('app', {
    mainPlaceholder: Iso.render(html, alt.flush())
  });
});

app.listen(appConfig.port);
