import React, {Component} from 'react';

import HomePage from './HomePage/HomePage.jsx';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewEvents: [],
      navbarEvents: [],
      currentUser: {
        id: null,
        first_name: '',
        last_name: ''
      }
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
    this.getCurrentUser()
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
        previewEvents: result,
        navbarEvents: result
      })
    })
    .fail(e => {
      console.error(e);
    });
  }

  getCurrentUser = () => {
    $.ajax({
      method: "GET",
      url: "/api/users/current"
    })
    .done(result => {
      this.setState({
        currentUser: {
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name
        }
      });
    })
    .fail(err => {
      console.log('Failed to Logout', err);
    })
  }

  clearUser = event => {
    this.setState({
      currentUser: {
        id: null,
        first_name: '',
        last_name: ''
      }
    });
  }


  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} clearUser={this.clearUser}/>
        <HomePage getSearchResults={this.getSearchResults} previewEvents={this.state.previewEvents} />
        <Login getCurrentUser={this.getCurrentUser}/>
      </div>
    );
  }
}

export default App;