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

const app = koa();

app.use(hbs.middleware({
  viewPath: './src/views'
}));

app.use(common.static('./dist'));

app.use(function *(next) {
  yield next;

  const gameData = yield getFiles.json(path.join(__dirname, '../staticData/gameData.json'));

  const data = {
    GameStore: {
      gameData
    }
  };

  alt.bootstrap(JSON.stringify(data));

  const html = ReactDOMServer.renderToString(React.createElement(AppComponent));

  yield this.render('app', {
    mainPlaceholder: Iso.render(html, alt.flush())
  });
});

app.listen(3000);
