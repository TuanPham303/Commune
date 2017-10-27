import React, {Component} from 'react';

import HomePage from './HomePage/HomePage.jsx';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import BecomeHost from './BecomeHost.jsx';
import NewEventForm from './NewEventForm.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        id: null,
        first_name: '',
        last_name: '',
        is_host: false,
        is_chef: false
      }
    }
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
          last_name: result.last_name,
          is_host: result.is_host,
          is_chef: result.is_chef
        }
      });
    })
    .fail(err => {
      console.log('Failed to Logout', err);
    })
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  clearUser = event => {
    this.setState({
      currentUser: {
        id: null,
        first_name: '',
        last_name: '',
        is_host: false,
        is_chef: false
      }
    });
  }



  render() {
    return (
      <div>
        <NavBar
          currentUser={this.state.currentUser}
          clearUser={this.clearUser}
          getCurrentUser={this.getCurrentUser}
        />
        <HomePage />
        <Login getCurrentUser={this.getCurrentUser} />
        <Register getCurrentUser={this.getCurrentUser} />
        <NewEventForm currentUser={this.state.currentUser}/>
        <BecomeHost getCurrentUser={this.getCurrentUser}/>
      </div>
    );
  }
}

export default App;