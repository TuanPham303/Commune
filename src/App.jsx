import React, {Component} from 'react';

import HomePage from './HomePage/HomePage.jsx';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <HomePage />
        <Login />
      </div>
    );
  }
}

export default App;