require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'jquery';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import HomePage from './HomePage/HomePage.jsx';
import NewEventPage from './NewEventPage/NewEventPage.jsx';
import EventPage from './EventPage/EventPage.jsx';
import App from './App.jsx';
import UserProfile from './UserProfile/UserProfile.jsx';

ReactDOM.render((
  <div>
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/events/new" component={NewEventPage}/>
      <Route path="/events/:id" component={EventPage}/>
      <Route path="/users" component={UserProfile}/>
    </Switch>
  </Router>
  </div>
), document.getElementById('react-root'));
