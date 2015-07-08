'use strict';

import iso from 'iso';
// import Alt from 'alt';
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/appComponent/appComponent';

// const alt = new Alt();

iso.bootstrap(function (state, meta, container) {
  // alt.bootstrap(JSON.parse(state));
  ReactDOM.render(React.createElement(AppComponent, state), container);
});
