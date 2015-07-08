'use strict';

import koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import hbs from 'koa-hbs';
import Iso from 'iso';
import alt from './altWrapper';
import common from 'koa-common';
import AppComponent from '../components/appComponent/appComponent';

const app = koa();

app.use(hbs.middleware({
  viewPath: './src/views'
}));

app.use(common.static('./dist'));

app.use(function *() {

  const savedProps = {text: 'from server'};

  const node = React.createElement(AppComponent, savedProps);

  //alt.bootstrap(JSON.stringify(savedProps));

  yield this.render('app', {
    mainPlaceholder: Iso.render(ReactDOMServer.renderToString(node), savedProps)
  });
});

app.listen(3000);
