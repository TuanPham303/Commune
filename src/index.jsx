require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'jquery';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import HomePage from './HomePage/HomePage.jsx';
import EventPage from './EventPage/EventPage.jsx';
import UserProfile from './UserProfile/UserProfile.jsx';


ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/events/:id" component={EventPage}/>
      <Route path="/user" component={UserProfile}/>
      
    </div>
  </Router>
), document.getElementById('react-root'));
