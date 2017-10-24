import React, {Component} from 'react';

import HomePage from './HomePage/HomePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {
        title: ''
      }
    }
  }

  componentWillMount () {
    let searchResults;

    const getSearchResults = searchData => {
      console.log(searchData)
      $.ajax({
        method: "GET",
        url: `/api/events/search/${searchData}`
      })
      .done(result => {
        $(".search-results").empty();
        $("<h3>")
          .text("Results:")
          .appendTo($(".search-results"));
        result.fields.forEach(field => {
          $("<a>")
            .text(field.name)
            .appendTo($(".search-results"));
        });
      })
      .fail(e => {
        console.error(e);
      });
    }
  }

  render() {
    return (
      <HomePage getSearchResults={this.getSearchResults} />
    );
  }
}

export default App;