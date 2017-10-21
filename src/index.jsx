require('../styles/main.scss');

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap';
import 'jquery';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App.jsx';
import reducer from './redux/reducers/index.js';
import Root from './root.jsx'

const store = createStore(reducer);

render(
  <Root store={store} />,
  document.getElementById('react-root'));
  