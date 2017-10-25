import React, {Component} from 'react';

import HomePage from './HomePage/HomePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewEvents: []
    }
  }

  componentDidMount(){
    const previewEvents = () => {
      $.ajax({
        method: "GET",
        url: "/api/events",
        success: data => {
          console.log(data);
          this.setState({
            previewEvents: this.state.previewEvents.concat(data)
          })
        }
      })
    }
    previewEvents();
  }


  getSearchResults = searchData => {
    console.log(searchData)
    const searchValue = searchData.replace(/&/g," ").replace(/  +/g, ' ')
    $.ajax({
      method: "GET",
      url: `/api/events/search?search=${searchValue}`
    })
    .done(result => {
      console.log(result);
      this.setState({
        previewEvents: result
      })
    })
    .fail(e => {
      console.error(e);
    });
  }

  render() {
    return (
      <HomePage getSearchResults={this.getSearchResults} previewEvents={this.state.previewEvents} />
    );
  }
}

export default App;