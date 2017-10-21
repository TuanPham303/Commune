import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import NavBar from './NavBar.jsx';
import HomePageEvents from './HomePage/HomePage_Events.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/events' component={HomePageEvents} />
        </Switch>
      </div>
    );
  }
}

export default App;