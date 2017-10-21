require('../styles/main.scss');

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap';
import 'jquery';
import HomePage from './HomePage/HomePage.jsx';

render(<HomePage />, document.getElementById('react-root'));
