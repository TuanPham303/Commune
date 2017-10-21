import React, {Component} from 'react';

import HomePage from './HomePage/HomePage.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <HomePage />
      </div>
    );
  }
}

export default App;