'use strict';

import iso from 'iso';
import React from 'react';
import ReactDOM from 'react-dom';
import alt from '../altWrapper';
import AppComponent from './components/appComponent/appComponent';

iso.bootstrap(function (state, meta, container) {
  alt.bootstrap(state);
  ReactDOM.render(React.createElement(AppComponent), container);
});
