import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import HomePage_Banner from './HomePage_Banner.jsx';
import HomePage_Events from './HomePage_Events.jsx';

class HomePage extends Component {

  render() {
    return (
      <div className="wrapper">
        <NavBar />
        <HomePage_Banner getSearchResults = {this.props.getSearchResults} />
        <HomePage_Events />
      </div>  
    );
  }
}

export default HomePage;
