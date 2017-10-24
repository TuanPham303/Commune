import React, {Component} from 'react';

import HomePage from './HomePage/HomePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    }
  }

  getSearchResults = searchData => {
    console.log(searchData)
    $.ajax({
      method: "GET",
      url: `/api/events/search?search=${searchData}`
    })
    .done(result => {
      console.log(result);
      this.setState({
        searchResults: result
      })
    })
    .fail(e => {
      console.error(e);
    });
  }

  render() {
    return (
      <HomePage getSearchResults={this.getSearchResults} />
    );
  }
}

export default App;