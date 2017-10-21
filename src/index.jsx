require('../styles/main.scss');

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap';
import 'jquery';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App.jsx';
import reducer from './redux/reducers/index.js';

const store = createStore(reducer);

render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('react-root'));
  