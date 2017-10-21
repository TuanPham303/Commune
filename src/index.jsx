require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'jquery';
import HomePage from './HomePage/HomePage.jsx';
import EventPage from './EventPage/EventPage.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/event" component={EventPage}/>
    </div>
  </Router>
), document.getElementById('react-root'));

  
